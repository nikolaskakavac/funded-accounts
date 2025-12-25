require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/mailer');
const crypto = require('crypto');

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const stripeRoutes = require('./routes/paymentsStripe');
const nowRoutes = require('./routes/paymentsNow');
const adminRoutes = require('./routes/admin');
const cashoutRoutes = require('./routes/cashout');
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

// 4) Global middleware (posle webhooka)
app.use(cors());
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

// 5) NOWPayments IPN webhook (raw body needed for signature)
app.post('/webhooks/now/ipn', express.raw({ type: '*/*' }), async (req, res) => {
  const sig = req.headers['x-nowpayments-sig'];
  const secret = process.env.NOWPAYMENTS_IPN_SECRET || '';
  const rawBody = req.body?.toString('utf-8') || '';

  // Validate signature if provided
  if (sig && secret) {
    const expected = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
    if (expected !== sig) {
      console.warn('NOWPayments IPN: invalid signature');
      return res.json({ received: true });
    }
  }

  let body;
  try {
    body = JSON.parse(rawBody || '{}');
  } catch (e) {
    console.error('NOWPayments IPN: JSON parse failed');
    return res.json({ received: true });
  }

  console.log('NOWPayments IPN payload:', body);

  const paymentId = body.payment_id;
  const status = body.payment_status; // 'waiting', 'confirming', 'finished', 'failed', ...

  try {
    const tx = await Transaction.findOne({
      provider: 'nowpayments',
      providerPaymentId: String(paymentId),
    });

    if (tx) {
      if (status === 'finished') {
        tx.status = 'paid';
        await tx.save();

        const user = await User.findById(tx.user);
        if (user) {
          user.currentPlan = tx.plan;
          await user.save();
        }

        console.log('NOWPayments: plan activated for user');
      } else if (status === 'failed' || status === 'expired') {
        tx.status = 'failed';
        await tx.save();
        console.log('NOWPayments: payment failed/expired');
      } else {
        console.log('NOWPayments: status update', status);
      }
    } else {
      console.log('NOWPayments IPN: transaction not found for payment_id', paymentId);
    }

    // IPN endpoint must always acknowledge
    res.json({ received: true });
  } catch (err) {
    console.error('NOWPayments IPN error:', err);
    res.json({ received: true });
  }
});

// 6) API rute
app.use('/auth', authRoutes);
app.use('/payments/stripe', stripeRoutes);
app.use('/payments/now', nowRoutes);
app.use('/api/admin', adminRoutes);
app.use('/cashout', cashoutRoutes);

// 7) Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// 8) Start servera
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
