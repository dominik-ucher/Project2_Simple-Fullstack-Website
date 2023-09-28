import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
  auth: {
    user: 'overordnet@trondfotball.no',
    pass: 'Passord', //HUSK Å SKRIVE PASSORD HER NÅR FERDIG
  },
});

// Controller to send email
const sendEmail = (req, res) => {
  const { name, email, subject, selectedOption, message } = req.body;

  const mailOptions = {
    from: email,
    to: selectedOption, // The recipient's email address based on the selected option
    subject: `Contact Form Submission from ${name} - ${subject}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
};

export { sendEmail };
