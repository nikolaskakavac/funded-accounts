import { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { createStripeCheckout } from '../api';

const cardStyle = {
  style: {
    base: {
      color: '#e5e7eb',
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#6b7280',
      },
    },
    invalid: {
      color: '#f97373',
      iconColor: '#f97373',
    },
  },
};

const OnSiteStripeCheckout = ({ token, planId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  console.log('STRIPE DEBUG → stripe =', stripe, 'elements =', elements);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setErr('Plaćanje trenutno nije dostupno. Pokušaj ponovo kasnije.');
      return;
    }

    setErr('');
    setLoading(true);

    try {
      const res = await createStripeCheckout(token, planId, {
        mode: 'intent',
        firstName,
        lastName,
        address,
        phone,
      });
      const { clientSecret } = res;

      if (!clientSecret) {
        setErr('Nije moguće kreirati Stripe uplatu.');
        setLoading(false);
        return;
      }

      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) {
        setErr('Polje za broj kartice nije učitano. Osveži stranicu.');
        setLoading(false);
        return;
      }

      const billingName = [firstName, lastName].filter(Boolean).join(' ');
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: billingName || undefined,
            phone: phone || undefined,
            address: address ? { line1: address } : undefined,
          },
        },
      });

      if (result.error) {
        setErr(result.error.message || 'Greška pri plaćanju.');
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
      setErr('Stripe greška. Pokušaj ponovo.');
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          Ime
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-emerald-700/60 bg-black/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
            placeholder="Ime"
            required
          />
        </label>

        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          Prezime
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-emerald-700/60 bg-black/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
            placeholder="Prezime"
            required
          />
        </label>
      </div>

      <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
        Adresa (ulica, broj, grad)
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 w-full rounded-xl border border-emerald-700/60 bg-black/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
          placeholder="Ulica 123, Grad"
          required
        />
      </label>

      <label className="block text-xs font-sans uppercase tracking-[0.18em] text-slate-400">
        Broj telefona (opciono)
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full rounded-xl border border-emerald-700/60 bg-black/40 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
          placeholder="+381 6x xxx xxxx"
        />
      </label>

      {/* Split card fields: number (full width) / expiry + cvc (second row) */}
      <div className="space-y-3 mt-2">
        <div
          className="rounded-2xl border-2 border-emerald-500/80 bg-black/70 px-3 py-2 shadow-[0_0_25px_rgba(16,185,129,0.25)] cursor-text"
          onClick={focusCardNumber}
        >
          <label className="text-xs text-slate-400 uppercase">Card Number</label>
          <div className="mt-1">
            <CardNumberElement options={cardStyle} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className="rounded-2xl border-2 border-emerald-500/80 bg-black/70 px-3 py-2 shadow-[0_0_25px_rgba(16,185,129,0.25)] cursor-text"
            onClick={focusCardExpiry}
          >
            <label className="text-xs text-slate-400 uppercase">Expiration Date</label>
            <div className="mt-1">
              <CardExpiryElement options={cardStyle} />
            </div>
          </div>

          <div
            className="rounded-2xl border-2 border-emerald-500/80 bg-black/70 px-3 py-2 shadow-[0_0_25px_rgba(16,185,129,0.25)] cursor-text"
            onClick={focusCardCvc}
          >
            <label className="text-xs text-slate-400 uppercase">CVV</label>
            <div className="mt-1">
              <CardCvcElement options={cardStyle} />
            </div>
          </div>
        </div>
      </div>

      {err && <p className="text-xs text-red-400">{err}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 w-full rounded-2xl bg-emerald-500 py-3 text-sm font-sans font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all duration-200 disabled:opacity-60 hover:-translate-y-[1px] hover:bg-emerald-400"
      >
        {loading ? 'Obrada uplate...' : 'Plati karticom'}
      </button>
    </form>
  );
};

export default OnSiteStripeCheckout;
