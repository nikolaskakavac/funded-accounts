import { useState } from 'react';

const getApiBase = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'arbexfund.com') {
    return 'https://api.arbexfund.com';
  }
  return 'http://localhost:4000';
};

const API_BASE = getApiBase();

const WhatsAppConsultation = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedPhone = phoneNumber.trim();
    if (normalizedPhone.length < 5) {
      setResult({ type: 'error', message: 'Please enter a valid WhatsApp number.' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/whatsapp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: normalizedPhone }),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || 'Failed to send request');
      }

      setResult({ type: 'success', message: 'Your WhatsApp consultation request has been sent.' });
      setPhoneNumber('');
    } catch (err) {
      setResult({ type: 'error', message: err.message || 'Failed to send request.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-sky-500/35 bg-gradient-to-b from-sky-500/10 via-black/80 to-sky-900/10 p-6 shadow-lg shadow-sky-500/10">
      <div className="text-center">
        <p className="font-display text-[11px] uppercase tracking-[0.24em] text-sky-300">
          WhatsApp Support
        </p>
        <h3 className="mt-2 font-display text-[22px] sm:text-[26px] tracking-[0.12em] uppercase text-slate-50">
          Request WhatsApp Consultation
        </h3>
        <p className="mt-3 font-sans text-[14px] text-slate-300">
          Leave your WhatsApp number and our team will contact you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+31 6 12 34 56 78"
          className="w-full rounded-2xl border border-sky-500/30 bg-black/60 px-4 py-3 font-sans text-[14px] text-slate-50 outline-none transition-colors focus:border-sky-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-sky-400 px-5 py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-black transition-all hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Sending...' : 'Request Call'}
        </button>
      </form>

      {result && (
        <p className={`mt-3 text-center font-sans text-[13px] ${result.type === 'success' ? 'text-sky-300' : 'text-red-400'}`}>
          {result.message}
        </p>
      )}
    </section>
  );
};

export default WhatsAppConsultation;
