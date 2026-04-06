'use strict';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendNotification = async (inquiry) => {
  const mailOptions = {
    from: `"Tedashi Trained Website" <${process.env.EMAIL_USER}>`,
    to: 'tedashi@foreverbodyfitness.com', 
    subject: `New Inquiry from ${inquiry.name}`,
    html: `
      <h2>You have a new website inquiry!</h2>
      <p><b>Name:</b> ${inquiry.name}</p>
      <p><b>Email:</b> ${inquiry.emailAddress}</p>
      <p><b>Preferred Contact:</b> ${inquiry.preferredContact}</p>
      <p><b>Goal:</b> ${inquiry.goals}</p>
      <p><b>Message:</b> ${inquiry.message}</p>
      <hr />
      <p><i>Sent via Tedashi Trained API</i></p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Nodemailer Error:', error);
    throw error; 
  }
};

module.exports = { sendNotification };
