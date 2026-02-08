require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const crypto = require('crypto');

const { sendWelcomeEmail } = require('./utils/mailer');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const stripeRoutes = require('./routes/paymentsStripe');
const nowRoutes = require('./routes/paymentsNow');
const adminRoutes = require('./routes/admin');
const cashoutRoutes = require('./routes/cashout');
const contactRoutes = require('./routes/contact');
const whatsappRoutes = require('./routes/whatsapp');
const webhooksStripe = require('./routes/webhooksStripe');

const User = require('./models/User');
const Plan = require('./models/Plan');
const Transaction = require('./models/Transaction');

const app = express();
const PORT = process.env.PORT || 4000;

// 1) Konekcija na bazu
connectDB();

// 2) Stripe instanca (ako ti negde treba direktno)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 3) Webhook ZAHTEVA raw body, zato ide PRE express.json()
app.use('/webhooks', webhooksStripe); // ovde je /webhooks/stripe iz routera
app.use('/webhooks/now', require('./routes/webhooksNow')); // NOWPayments IPN rute

// 4) Global middleware (posle webhooka)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://arbexfund.com',
    'https://www.arbexfund.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Language cookie based on Accept-Language on every request (keeps in sync when location/browser changes)
app.use((req, res, next) => {
  const al = (req.headers['accept-language'] || '').toLowerCase();
  const lang = al.includes('sr') ? 'sr' : 'en';
  res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
  next();
});

// Slow IP logger: note requests that take longer than 2s for visibility
app.use((req, res, next) => {
  const started = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - started;
    if (ms > 2000) {
      const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || req.ip;
      console.warn('Slow IP request', { ip, path: req.originalUrl, ms });
    }
  });
  next();
});


// 6) API rute
app.use('/auth', authRoutes);
app.use('/payments/stripe', stripeRoutes);
app.use('/payments/now', nowRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/cashout', cashoutRoutes);

// 7) Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// 8) Start servera
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
