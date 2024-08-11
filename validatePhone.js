const express = require('express');
const app = express();
const path = require('path');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, phone } = req.body;

    // Regular expression to match the phone number format
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (phoneRegex.test(phone)) {
        res.send(`Thank you, ${name}! Your phone number ${phone} is valid.`);
    } else {
        res.send(`Sorry, ${name}. The phone number ${phone} is not valid. Please use the format ddd-ddd-dddd.`);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
