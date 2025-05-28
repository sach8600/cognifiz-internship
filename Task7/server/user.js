const express = require('express');
const router = express.Router();
const User = require('./models/User');  // Assuming you have a User model

// Example route for user registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Simple validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Here you would add logic to save the user to the database
    try {
        const newUser = new User({ username, email, password });  // You should hash the password before saving
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Example route for user login (you can implement JWT or session authentication here)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) { // You should hash the password to compare
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // In a real-world scenario, you would issue a token or session here
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
