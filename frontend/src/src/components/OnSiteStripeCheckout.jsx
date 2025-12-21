import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createStripeCheckout } from '../api';

const OnSiteStripeCheckout = ({ token, planId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [phone, setPhone] = useState(''); // NOVO

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
          billing_details: phone ? { phone } : {}, // opcioni telefon
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
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Broj telefona (opciono, za WhatsApp konsultacije)"
        className="w-full rounded-xl border border-emerald-700 bg-black/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />

      <div className="rounded-xl border border-emerald-600 bg-black/40 px-3 py-2">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '14px',
                color: '#e5e7eb',
                '::placeholder': { color: '#6b7280' },
              },
              invalid: { color: '#f87171' },
            },
          }}
        />
      </div>

      {err && <p className="text-xs text-red-400">{err}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-full bg-emerald-500 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black disabled:opacity-60"
      >
        {loading ? 'Obrada...' : 'Plati karticom na licu mesta'}
      </button>
    </form>
  );
};

export default OnSiteStripeCheckout;
