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

async function sendContactEmail({ name, email, subject, message }) {
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME || 'Funded Accounts'}" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

module.exports = { sendWelcomeEmail, sendContactEmail };
