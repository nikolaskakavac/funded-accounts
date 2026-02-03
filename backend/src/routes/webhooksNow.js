const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Plan = require('../models/Plan');
const { sendPurchaseConfirmation, sendCredentialsNotification } = require('../utils/mailer');

const router = express.Router();

// NOWPayments IPN

const crypto = require('crypto');

router.post('/ipn', express.raw({ type: '*/*' }), async (req, res) => {
  try {
    const sig = req.headers['x-nowpayments-sig'];
    const secret = process.env.NOWPAYMENTS_IPN_SECRET || '';
    const rawBody = req.body?.toString('utf-8') || '';

    // ✅ HMAC validacija
    if (sig && secret) {
      const expected = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
      console.log('🔐 IPN sig OK:', sig === expected);
      if (sig !== expected) {
        console.warn('❌ IPN signature mismatch');
        return res.status(200).json({ received: true });
      }
    }

    const body = JSON.parse(rawBody);
    console.log('💰 NOW IPN:', body.payment_id, body.payment_status);

    const { payment_id, order_id, payment_status } = body;

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
          console.log('Sending payment emails (NOW) to', user.email);
          await sendPurchaseConfirmation(user.email, {
            planName: plan.name,
            amount: tx.amount,
            currency: tx.currency || 'USD',
            paymentMethod: 'Cryptocurrency'
          });
          console.log('✅ Purchase confirmation email sent (NOW)');
          
          await sendCredentialsNotification(user.email);
          console.log('✅ Credentials notification email sent (NOW)');
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
    console.error('IPN error:', err);
    res.status(200).send('OK');
  }
});

module.exports = router;
