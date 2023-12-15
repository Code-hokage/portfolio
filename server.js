const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
require('dotenv').config();


const PORT = process.env.PORT || 5500;

//Middleware 
app.use(express.static(__dirname + '/'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Mailing
app.post('/', (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: 'bjid zyeg wshz trls'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'adnanmish30@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    // Error handling
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: + info.response');
            res.send('success')
        }
    })
})

// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`)
// });