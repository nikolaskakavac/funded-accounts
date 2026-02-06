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
    rejectUnauthorized: false,
  },
});

// Email Template Header/Footer
const emailHeader = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 30px; }
    .content h2 { color: #10b981; margin-top: 0; }
    .content p { margin: 15px 0; }
    .highlight-box { background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .button { display: inline-block; background: #10b981; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
    .button:hover { background: #059669; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    .divider { height: 1px; background: #e5e7eb; margin: 25px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ARBEX Fund</h1>
    </div>
    <div class="content">
`;

const emailFooter = `
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Arbex Fund. All rights reserved.</p>
      <p>Norvestor Equiti Ltd. | Registration: EQS-BAL-2025-047</p>
      <p><a href="https://arbexfund.com" style="color: #10b981; text-decoration: none;">arbexfund.com</a></p>
    </div>
  </div>
</body>
</html>
`;

// 1. Purchase Confirmation Email
async function sendPurchaseConfirmation(toEmail, { planName, amount, currency, paymentMethod, orderId }) {
  const mailOptions = {
    from: `"Arbex Fund" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Arbex Fund Purchase Confirmation',
    html: `${emailHeader}
      <p>Thank you for your purchase.</p>
      
      <p>We're pleased to confirm that we've received your payment for your Arbex Fund instant-funded trading account. Our team is now reviewing your order and preparing your account setup.</p>
      
      <div class="highlight-box">
        <strong>Order ID:</strong> ${escapeHtml(orderId || 'Pending')}<br>
        <strong>Plan:</strong> ${escapeHtml(planName)}<br>
        <strong>Payment method:</strong> ${escapeHtml(paymentMethod)}<br>
        <strong>Amount:</strong> ${amount} ${currency.toUpperCase()}
      </div>

      <p>You'll receive another email soon to let you know that your trading account is being created.</p>

      <p>If you have any questions about your purchase or need assistance, please contact <a href="mailto:support@arbexfund.com" style="color: #10b981;">support@arbexfund.com</a>.</p>
      
      <p>We're glad to have you on board and look forward to getting you started.</p>
      
      <p>Thank you for choosing Arbex Fund.</p>
    ${emailFooter}`
  };

  await transporter.sendMail(mailOptions);
}

// 2. Login Credentials Notification Email  
async function sendCredentialsNotification(toEmail) {
  const mailOptions = {
    from: `"Arbex Fund" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Your Arbex Fund Trading Account Is Being Prepared',
    html: `${emailHeader}
      <p>Hello,</p>
      
      <p>Your Arbex Fund trading account is now being created by our setup team. You will receive your MetaTrader 5 login credentials (username and password) within the next 48 hours.</p>

      <p>While we complete the setup, please take a moment to install the MetaTrader 5 application from the App Store (iOS) or Google Play Store (Android) so that you'll be ready to log in as soon as your credentials arrive.</p>

      <div class="highlight-box">
        <strong>📱 Download MetaTrader 5:</strong><br><br>
        <strong>iOS:</strong> <a href="https://apps.apple.com/app/metatrader-5/id413251709" style="color: #10b981;">App Store</a><br>
        <strong>Android:</strong> <a href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5" style="color: #10b981;">Google Play Store</a>
      </div>

      <p>Once your account details are issued, you'll receive another email from Arbex Fund Support with your secure login information.</p>

      <p>If you do not see that message after 48 hours, check your spam or junk folder, or contact <a href="mailto:support@arbexfund.com" style="color: #10b981;">support@arbexfund.com</a> so we can help.</p>

      <p>Thank you for your patience and for choosing Arbex Fund. We're excited to have you trading with us soon.</p>
    ${emailFooter}`
  };

  await transporter.sendMail(mailOptions);
}

// 3. Contact Form Notification Email (to admin)
async function sendContactEmail({ name, email, subject, message }) {
  const mailOptions = {
    from: `"Arbex Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    html: `${emailHeader}
      <h2>📨 New Contact Form Submission</h2>
      
      <div class="highlight-box">
        <p><strong>From:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #10b981;">${escapeHtml(email)}</a></p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      </div>

      <div class="divider"></div>

      <h3>Message:</h3>
      <p style="white-space: pre-wrap; background: #f9fafb; padding: 15px; border-radius: 4px; border-left: 3px solid #10b981;">${escapeHtml(message)}</p>

      <div class="divider"></div>
      
      <p style="font-size: 12px; color: #6b7280;">This message was sent via the Arbex Fund contact form on ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC</p>
    ${emailFooter}`
  };

  await transporter.sendMail(mailOptions);
}

// 4. Contact Form Auto-Reply (to customer)
async function sendContactAutoReply(toEmail, name) {
  const mailOptions = {
    from: `"Arbex Fund Support" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'We Received Your Message - Arbex Fund',
    html: `${emailHeader}
      <h2>✅ Message Received</h2>
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for contacting Arbex Fund! We have received your message and our team will review it shortly.</p>
      
      <div class="highlight-box">
        <p><strong>Response Time:</strong> We typically respond within 24 hours during business days.</p>
      </div>

      <h3>📞 Need Immediate Assistance?</h3>
      <p>If your matter is urgent, you can also reach us through:</p>
      <ul>
        <li>📧 Email: <a href="mailto:support@arbexfund.com" style="color: #10b981;">support@arbexfund.com</a></li>
        <li>🌐 Website: <a href="https://arbexfund.com/contact" style="color: #10b981;">arbexfund.com/contact</a></li>
      </ul>

      <p>We appreciate your patience and look forward to assisting you!</p>
      
      <p style="margin-top: 30px;">Best regards,<br><strong>Arbex Fund Support Team</strong></p>
    ${emailFooter}`
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
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

module.exports = { 
  sendPurchaseConfirmation,
  sendCredentialsNotification,
  sendContactEmail,
  sendContactAutoReply
};
