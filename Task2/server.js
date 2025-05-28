const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Temporary storage for submitted data
let submissions = [];

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve the form
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, age, message } = req.body;

    // Server-side validation
    if (!name || !email || !age || !message) {
        return res.status(400).send('All fields are required.');
    }

    if (isNaN(age) || age <= 0) {
        return res.status(400).send('Age must be a positive number.');
    }

    // Save validated data to temporary storage
    submissions.push({ name, email, age, message });

    // Render success page with submitted data
    res.render('success', { name, email, age, message });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
