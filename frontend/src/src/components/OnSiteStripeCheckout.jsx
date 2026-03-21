import { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { createStripeCheckout } from '../api';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';
import visaLogo from '/img/visa.png';
import mastercardLogo from '/img/mastercard-logo.svg';
import dinersLogo from '/img/dinersclub.svg';
import unionPayLogo from '/img/unionpay.svg';
import maestroLogo from '/img/maestro.png';

const PLAN_AMOUNT_EUR = {
  '693db3e0e9cf589519c144fe': 150,
  '693db3ede9cf589519c14500': 300,
  '693db3ede9cf589519c14501': 1000,
  '1': 150,
  '2': 300,
  '3': 1000,
};

const getPlanAmountLabel = (planId) => {
  const key = planId != null ? String(planId) : '';
  const amount = PLAN_AMOUNT_EUR[key];
  return typeof amount === 'number' ? `${amount}€` : '—';
};

const cardStyle = {
  style: {
    base: {
      color: '#0f172a',
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#94a3b8',
      },
    },
    invalid: {
      color: '#e11d48',
      iconColor: '#e11d48',
    },
  },
  placeholder: '0000 0000 0000 0000',
};

const cvcStyle = {
  style: {
    base: {
      color: '#0f172a',
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#94a3b8',
      },
    },
    invalid: {
      color: '#e11d48',
      iconColor: '#e11d48',
    },
  },
  placeholder: '0000',
};

const expiryStyle = {
  style: {
    base: {
      color: '#0f172a',
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#94a3b8',
      },
    },
    invalid: {
      color: '#e11d48',
      iconColor: '#e11d48',
    },
  },
  placeholder: 'MM/YY',
};

const OnSiteStripeCheckout = ({ token, planId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [phone, setPhone] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const lang = getLang();

  console.log('STRIPE DEBUG → stripe =', stripe, 'elements =', elements);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setErr(t('onsite.error.unavailable', lang));
      return;
    }

    setErr('');
    setLoading(true);

    try {
      const res = await createStripeCheckout(token, planId, {
        mode: 'intent',
        phone,
        cardholderName,
      });
      const { clientSecret } = res;

      if (!clientSecret) {
        setErr(t('onsite.error.create', lang));
        setLoading(false);
        return;
      }

      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) {
        setErr(t('onsite.error.cardField', lang));
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: cardholderName || undefined,
            phone: phone || undefined,
          },
        },
      });

      if (result.error) {
        console.error('Stripe confirmCardPayment error:', result.error);
        // Ako je PaymentIntent expired ili ne postoji, pokušaj da kreiraš novi
        if (result.error.code === 'resource_missing' || result.error.message?.includes('No such payment_intent')) {
          setErr('PaymentIntent je istekao. Osvježite stranicu i pokušajte ponovo.');
        } else {
          setErr(result.error.message || 'Greška pri plaćanju.');
        }
      } else if (result.paymentIntent?.status === 'succeeded') {
        if (onSuccess) {
          onSuccess(result.paymentIntent);
        } else {
          const piId = result.paymentIntent.id;
          const url = `/success?payment_intent=${encodeURIComponent(piId)}&method=karticom`;
          window.location.href = url;
        }
      }
    } catch (e) {
      console.error(e);
      setErr(t('onsite.error.stripe', lang));
    } finally {
      setLoading(false);
    }
  };

  const focusCardNumber = () => {
    const card = elements?.getElement(CardNumberElement);
    if (card && card.focus) card.focus();
  };

  const focusCardExpiry = () => {
    const el = elements?.getElement(CardExpiryElement);
    if (el && el.focus) el.focus();
  };

  const focusCardCvc = () => {
    const el = elements?.getElement(CardCvcElement);
    if (el && el.focus) el.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {/* Split card fields: number (full width) / expiry + cvc (second row) */}
      <div className="space-y-4 mt-4">
        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          {t('onsite.amountToPay', lang)}
          <div className="mt-1 w-full rounded-none border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
            {getPlanAmountLabel(planId)}
          </div>
        </label>

        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          {t('onsite.cardNumber', lang)}
          <div
            className="mt-1 relative z-50 rounded-none border border-slate-300 bg-white px-4 py-3 cursor-text"
            onClick={focusCardNumber}
          >
            <div className="flex items-center gap-3">
              <svg className="h-6 w-8 flex-shrink-0 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.5" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
              </svg>
              <div className="flex-1">
                <CardNumberElement options={cardStyle} />
              </div>
            </div>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
            {t('onsite.expiry', lang)}
            <div
              className="mt-1 relative z-50 rounded-none border border-slate-300 bg-white px-4 py-3 cursor-text"
              onClick={focusCardExpiry}
            >
              <CardExpiryElement options={expiryStyle} />
            </div>
          </label>

          <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              {t('onsite.cvc', lang)}
              <span className="relative group inline-flex items-center">
                <svg className="h-3.5 w-3.5 text-slate-300" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <text x="10" y="13" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">?</text>
                </svg>
                <span className="pointer-events-none absolute bottom-full right-0 z-50 mb-2 hidden w-48 sm:w-64 rounded-none border border-white/20 bg-black px-3 py-2 text-[11px] normal-case tracking-normal text-slate-200 shadow-lg group-hover:block">
                  3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front.
                </span>
              </span>
            </span>
            <div
              className="mt-1 relative z-50 rounded-none border border-slate-300 bg-white px-4 py-3 cursor-text"
              onClick={focusCardCvc}
            >
              <CardCvcElement options={cvcStyle} />
            </div>
          </label>
        </div>

        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          {t('onsite.cardholderName', lang)}
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="mt-1 w-full rounded-none border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500/60"
            placeholder="Name on card"
          />
        </label>

        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          {t('onsite.phone', lang)}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-none border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500/60"
            placeholder={t('onsite.phonePlaceholder', lang)}
          />
        </label>
      </div>

      {err && <p className="text-xs text-red-400">{err}</p>}

      <div className="mt-6 pt-4 border-t border-slate-700">
        <p className="text-xs font-sans text-slate-400 text-center mb-3">We accept payments with the following cards</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <img src={visaLogo} alt="Visa" className="h-6 w-10 object-contain" />
          <img src={mastercardLogo} alt="Mastercard" className="h-6 w-10 object-contain" />
          <img src={dinersLogo} alt="Diners Club" className="h-6 w-12 object-contain" />
          <img src={unionPayLogo} alt="UnionPay" className="h-6 w-12 object-contain" />
          <img src={maestroLogo} alt="Maestro" className="h-6 w-12 object-contain" />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-6 w-full rounded-2xl bg-sky-500 py-3 text-sm font-sans font-semibold uppercase tracking-[0.18em] text-black transition-all duration-200 disabled:opacity-60 hover:-translate-y-[1px] hover:bg-sky-400"
      >
        {loading ? t('onsite.submit.processing', lang) : t('onsite.submit.pay', lang)}
      </button>
    </form>
  );
};

export default OnSiteStripeCheckout;


