const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to handle contact form POST
app.post('/api/contact', async (req, res) => {
  const { name, contact, message } = req.body;

  // Basic input validation
  if (!name || (!contact) || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Or your SMTP provider
    auth: {
      user: 'your.email@gmail.com', // sender email
      pass: 'your_app_password'     // app password or real password if using less secure
    }
  });

  let mailOptions = {
    from: 'your.email@gmail.com',
    to: 'info@adityaaauto.com',
    subject: 'New Enquiry Received',
    text: `
      Name: ${name}
      Phone/Email: ${contact}
      Message: ${message}
    `,
  };

  // Send mail
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Thank you! Your enquiry has been sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
