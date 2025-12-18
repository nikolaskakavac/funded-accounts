require('dotenv').config();
const { sendWelcomeEmail } = require('./utils/mailer');

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const stripeRoutes = require('./routes/paymentsStripe');
const nowRoutes = require('./routes/paymentsNow');
const adminRoutes = require('./routes/admin'); // DODATO GORE

const User = require('./models/User');
const Plan = require('./models/Plan');
const Transaction = require('./models/Transaction');

const app = express();
const PORT = process.env.PORT || 4000;

// 1) Konekcija na bazu
connectDB();

// 2) Stripe instanca
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 3) Stripe webhook BEZ verifikacije potpisa (za lokalni razvoj)
app.post('/webhooks/stripe', express.json(), async (req, res) => {
  console.log('Stripe webhook hit (no verify)');

  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};
    const userId = metadata.userId;
    const planId = metadata.planId;

    console.log('checkout.session.completed metadata:', metadata);

    try {
      if (userId && planId) {
        const plan = await Plan.findById(planId);
        const user = await User.findById(userId);

        if (plan && user) {
          await Transaction.create({
            user: user._id,
            plan: plan._id,
            provider: 'stripe',
            providerPaymentId: session.id,
            amount: plan.price,
            currency: plan.currency,
            status: 'paid',
          });

          user.currentPlan = plan._id;
          await user.save();

          try {
            console.log('Sending payment email (Stripe) to', user.email);
            await sendWelcomeEmail(user.email);
          } catch (e) {
            console.error('Payment email failed (Stripe):', e.message);
          }

          console.log('Transaction created and user updated (Stripe)');
        } else {
          console.log('Plan or user not found for Stripe webhook');
        }
      } else {
        console.log('Missing userId or planId in Stripe metadata');
      }
    } catch (err) {
      console.error('Error handling Stripe session:', err);
    }
  } else {
    console.log(`Unhandled Stripe event type: ${event.type}`);
  }

  res.json({ received: true });
});

// 4) Global middleware (POSLE Stripe webhooka)
app.use(cors());
app.use(express.json());

// 5) NOWPayments IPN webhook
app.post('/webhooks/now/ipn', async (req, res) => {
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
      }
    } else {
      console.log('NOWPayments IPN: transaction not found for payment_id', paymentId);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('NOWPayments IPN error:', err);
    // IPN endpoint ne sme da 5xx prema NOW-u, ali log je bitan
    res.json({ received: true });
  }
});

// 6) API rute
app.use('/auth', authRoutes);
app.use('/payments/stripe', stripeRoutes);
app.use('/payments/now', nowRoutes);
app.use('/api/admin', adminRoutes); // ADMIN ROUTES MOUNT

// 7) Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// 8) Start servera
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
