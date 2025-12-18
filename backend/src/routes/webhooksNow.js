const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Plan = require('../models/Plan');
const { sendWelcomeEmail } = require('../utils/mailer');

const router = express.Router();

// NOWPayments IPN
router.post('/ipn', async (req, res) => {
  try {
    const ipn = req.body;
    console.log('NOW IPN received:', ipn);

    const { payment_id, order_id, payment_status } = ipn;

    const tx = await Transaction.findOne({
      provider: 'nowpayments',
      providerPaymentId: String(payment_id),
    });

    if (!tx) {
      console.warn('NOW IPN: transaction not found for payment_id', payment_id);
      return res.status(200).send('OK');
    }

    if (payment_status === 'finished') {
      tx.status = 'paid';
      await tx.save();

      const user = await User.findById(tx.user);
      const plan = await Plan.findById(tx.plan);

      if (user && plan) {
        user.currentPlan = plan._id;
        await user.save();

        try {
          console.log('Sending payment email (NOW) to', user.email);
          await sendWelcomeEmail(user.email);
        } catch (e) {
          console.error('Payment email failed (NOW):', e.message);
        }
      }
    } else if (payment_status === 'failed' || payment_status === 'expired') {
      tx.status = 'failed';
      await tx.save();
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error('NOW IPN error:', err.message);
    res.status(200).send('OK');
  }
});

module.exports = router;
