import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { createNowPayment } from '../api';

const CryptoPaymentPage = ({ navigate, token, planId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await createNowPayment(token, planId, 'btc');
        setData(res); // { payment_id, pay_address, pay_amount, pay_currency }
      } catch (e) {
        console.error(e);
        setErr('Greška pri kreiranju kripto uplate.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, planId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
        <p className="font-sans text-[15px] text-emerald-100/90">Učitavanje uplate…</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50 px-4">
        <div className="max-w-md w-full rounded-3xl border border-emerald-800/60 bg-black/80 p-6 text-center shadow-xl shadow-emerald-500/20">
          <p className="mb-3 font-sans text-[15px] text-red-400">{err}</p>
          <button
            onClick={() => navigate('/#plans')}
            className="mt-1 inline-flex items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-[13px] font-sans uppercase tracking-[0.14em] text-emerald-200 hover:bg-emerald-500/10 transition-colors"
          >
            Nazad na planove
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
        <p className="font-sans text-[15px] text-emerald-100/90">Nema podataka o uplati.</p>
      </div>
    );
  }

  const { payment_id, pay_address, pay_amount, pay_currency } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <div className="mx-auto max-w-lg px-4 pb-16 pt-10">
        <button
          onClick={() => navigate('/#plans')}
          className="mb-6 inline-flex items-center gap-2 text-[12px] font-sans uppercase tracking-[0.16em] text-emerald-300 hover:text-emerald-100"
        >
          <span className="text-emerald-400 text-sm">←</span>
          Nazad na planove
        </button>

        <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
          Kripto uplata
        </p>
        <h1 className="mt-2 font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
          Plati BTC‑om
        </h1>

        <p className="mt-4 mb-4 font-sans text-[15px] text-emerald-100/90">
          Pošalji tačno{' '}
          <span className="font-semibold">
            {pay_amount} {pay_currency.toUpperCase()}
          </span>{' '}
          na ovu adresu:
        </p>

        <p className="mb-3 break-all font-mono text-[13px] text-emerald-200">
          {pay_address}
        </p>

        <button
          onClick={() => navigator.clipboard.writeText(pay_address)}
          className="mb-6 inline-flex items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-[13px] font-sans text-emerald-200 hover:bg-emerald-500/10 transition-colors"
        >
          Kopiraj adresu
        </button>

        <div className="mb-6 flex justify-center">
          <QRCode value={pay_address} size={190} bgColor="#020617" fgColor="#a7f3d0" />
        </div>

        <p className="mb-2 font-sans text-[12px] text-slate-400">
          Payment ID: {payment_id}
        </p>
        <p className="font-sans text-[12px] text-slate-400">
          Nakon potvrde uplate na mreži, paket se automatski aktivira na tvom nalogu.
          Potvrda može da potraje nekoliko minuta u zavisnosti od mreže.
        </p>
      </div>
    </div>
  );
};

export default CryptoPaymentPage;
