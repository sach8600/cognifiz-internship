const Bull = require('bull');
const redisConfig = require('./config/redisConfig');

const queue = new Bull('taskQueue', redisConfig.url);

// Define a worker to process background jobs
queue.process(async (job) => {
  console.log(`Processing job ${job.id}...`);
  
  // Simulate background task 
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log(`Job ${job.id} completed.`);
});

// Example of adding a job to the queue
queue.add({ task: 'sendEmail', to: 'test@example.com' });
