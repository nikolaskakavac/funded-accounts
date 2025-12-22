import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createStripeCheckout } from '../api';

const cardStyle = {
  style: {
    base: {
      color: '#e5e7eb',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setErr('');
    setLoading(true);

    try {
      const res = await createStripeCheckout(token, planId, { mode: 'intent', phone });
      const { clientSecret } = res;

      if (!clientSecret) {
        setErr('Nije moguće kreirati Stripe uplatu.');
        setLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: phone ? { phone } : {},
        },
      });

      if (result.error) {
        setErr(result.error.message || 'Greška pri plaćanju.');
      } else if (result.paymentIntent?.status === 'succeeded') {
        onSuccess?.();
      }
    } catch (e) {
      console.error(e);
      setErr('Stripe greška. Pokušaj ponovo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
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

      <div className="rounded-2xl border border-emerald-700/70 bg-black/40 px-3 py-3">
        <CardElement options={cardStyle} />
      </div>

      {err && (
        <p className="text-xs text-red-400">
          {err}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-2 w-full rounded-2xl bg-emerald-500 py-3 text-sm font-sans font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all duration-200 disabled:opacity-60 hover:-translate-y-[1px] hover:bg-emerald-400"
      >
        {loading ? 'Obrada uplate...' : 'Plati karticom'}
      </button>
    </form>
  );
};

export default OnSiteStripeCheckout;
