require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/mailer');

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const stripeRoutes = require('./routes/paymentsStripe');
const nowRoutes = require('./routes/paymentsNow');
const adminRoutes = require('./routes/admin');
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

// 5) NOWPayments IPN webhook
app.post('/webhooks/now/ipn', async (req, res) => {
  console.log('NOWPayments IPN HIT');
  console.log('NOWPayments body:', JSON.stringify(req.body, null, 2));

  const body = req.body;
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

    // IPN endpoint ne sme da vraća 5xx, uvek šaljemo ok
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

// 7) Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// 8) Start servera
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
