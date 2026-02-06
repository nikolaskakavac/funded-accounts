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
    subject: '🔑 Your Trading Account Credentials - Ready to Trade!',
    html: `${emailHeader}
      <h2>🚀 Your Trading Account is Ready!</h2>
      <p>Dear trader,</p>
      <p>Great news! Your Arbex Fund trading account has been successfully set up and is ready for action. Your login credentials are now active and you can begin trading immediately.</p>
      
      <div class="highlight-box">
        <strong style="font-size: 16px; color: #10b981;">🔓 Account Access Activated</strong><br><br>
        <p><strong>Status:</strong> <span style="color: #10b981; font-weight: 700;">✅ Active & Ready</span></p>
        <p>Your funded trading account is fully operational and waiting for your first trade.</p>
      </div>

      <h3>📱 How to Access Your Account</h3>
      <p>Your login credentials have been sent to you in a separate secure email. To access your trading platform:</p>
      <ul style="line-height: 1.8;">
        <li>Go to your <strong>email inbox</strong> and look for the message titled <strong>"Trading Platform Access"</strong></li>
        <li>You'll find your <strong>username</strong> and <strong>temporary password</strong></li>
        <li>Visit the <strong>trading platform link</strong> provided in that email</li>
        <li>Log in and change your password to something secure</li>
      </ul>

      <h3>⚡ Getting Started</h3>
      <p>Once logged in, you'll have access to:</p>
      <ul style="line-height: 1.8;">
        <li>✅ Live trading platform with real-time market data</li>
        <li>✅ Advanced charting tools and technical analysis</li>
        <li>✅ Comprehensive trading education & video tutorials</li>
        <li>✅ Risk management dashboard (10% loss limit protection)</li>
        <li>✅ 24/7 support team for assistance</li>
      </ul>

      <h3>⏰ Important: 48-Hour Timeline</h3>
      <div class="highlight-box">
        <strong>Your account setup will be fully completed within the next 48 hours.</strong><br><br>
        <p>This includes:</p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Final platform verification and testing</li>
          <li>Account funding confirmation</li>
          <li>Support team introduction call (optional)</li>
        </ul>
      </div>

      <h3>🎓 Before You Start Trading</h3>
      <p>Please review the following important information:</p>
      <ul style="line-height: 1.8;">
        <li><strong>Risk Management Rules:</strong> Maximum 10% loss per trade is enforced</li>
        <li><strong>Trading Hours:</strong> Trade during market hours for best liquidity</li>
        <li><strong>Position Sizing:</strong> Always use proper position management</li>
      </ul>

      <div class="highlight-box">
        <strong>💡 Pro Tip:</strong> Start small, learn the platform, and gradually increase your trading activity as you gain confidence.
      </div>

      <h3>📞 Need Help?</h3>
      <p>Our dedicated support team is standing by 24/7 to assist you with:</p>
      <ul style="line-height: 1.8;">
        <li>Platform navigation questions</li>
        <li>Trading strategy advice</li>
        <li>Technical support issues</li>
      </ul>
      <p>Contact us at <a href="mailto:support@arbexfund.com" style="color: #10b981;">support@arbexfund.com</a> or use the live chat on your dashboard.</p>

      <p style="margin-top: 30px;">We're thrilled to have you on board. Happy trading!</p>
      <p>Best regards,<br><strong>Arbex Fund Trading Team</strong></p>
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
