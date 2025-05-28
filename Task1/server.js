const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve the form on the root route
app.get('/', (req, res) => {
    res.render('index'); // This renders the `index.ejs` file
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Render the thank you page with user data
    res.render('thankyou', { name, email, message });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
