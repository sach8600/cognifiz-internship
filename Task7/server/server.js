const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./user');  // Import user.js routes

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());  // To parse JSON request bodies

// Use user routes
app.use('/api/users', userRoutes);

// Example route
app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

// Connect to MongoDB (make sure MongoDB is set up and running)
mongoose.connect('mongodb://localhost:27017/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
