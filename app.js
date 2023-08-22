const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (e.g., index.html)
app.use(express.static('public'));

// Validation middleware
const validate = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('message').notEmpty().withMessage('Message is required')
];

// Handle form submission
app.post('/send', validate, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are validation errors, render the form again with error messages
        return res.status(422).render('index', {
            errors: errors.array(),
            formData: req.body
        });
    }

    const { name, email, message } = req.body;

    // Create a transporter object using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Email data
    const mailOptions = {
        from: 'adnanmish30@gmail.com',
        to: 'adnanmish30@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: message
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            // Handle the error gracefully, e.g., by rendering an error page
            res.status(500).render('error', { error: 'An error occurred while sending the email.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/success'); // Redirect to a success page
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: 'Something went wrong on the server.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
