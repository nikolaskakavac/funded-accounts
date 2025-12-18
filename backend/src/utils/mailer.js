const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // dozvoli self-signed cert u dev okruženju
  },
});


async function sendWelcomeEmail(toEmail) {
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME || 'Funded Accounts'}" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Your funded account payment is received',
    text:
      'Thank you for your purchase. Your funded account credentials will be sent to this email address within the next 24 hours.',
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendWelcomeEmail };
