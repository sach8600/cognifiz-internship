const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const Bull = require('bull');
const redis = require('redis');
const redisConfig = require('./config/redisConfig');

const app = express();
const PORT = process.env.PORT || 5000;

// Create a Bull queue for background tasks
const myQueue = new Bull('taskQueue', redisConfig.url);

// Middleware setup
app.use(morgan('dev')); // Logging middleware
app.use(cors());        // Enable CORS
app.use(bodyParser.json()); // Body parser middleware

// Sample route for adding a task to the queue
app.post('/add-task', async (req, res) => {
  const job = await myQueue.add({ task: 'sendEmail', to: 'test@example.com' });
  res.send(`Job ${job.id} added to the queue.`);
});

// Route to get weather data with caching (using Redis)
app.get('/weather', (req, res) => {
  const city = req.query.city;

  // Check cache in Redis
  redisClient.get(city, (err, data) => {
    if (data) {
      // If data exists in the cache, return it
      return res.json(JSON.parse(data));
    }

    // Simulate fetching weather data (replace with actual API call)
    const weatherData = { temperature: '22°C', description: 'Clear Sky' };
    
    // Cache data in Redis for 1 hour
    redisClient.setex(city, 3600, JSON.stringify(weatherData));
    
    // Return the weather data
    res.json(weatherData);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
