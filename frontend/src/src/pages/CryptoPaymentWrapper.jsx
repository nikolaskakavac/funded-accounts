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
        setData(res); // očekuje { payment_id, pay_address, pay_amount, pay_currency }
      } catch (e) {
        console.error(e);
        setErr('Greška pri kreiranju crypto uplate.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, planId, navigate]);

  if (loading) {
    return <div className="p-6">Učitavanje uplate...</div>;
  }

  if (err) {
    return (
      <div className="p-6">
        <p className="mb-4 text-red-400">{err}</p>
        <button
          onClick={() => navigate('/pricing')}
          className="rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-200"
        >
          Nazad na pakete
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <p>Nema podataka o uplati.</p>
      </div>
    );
  }

  const { payment_id, pay_address, pay_amount, pay_currency } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-lg px-4 pb-16 pt-10">
        <button
          onClick={() => navigate('/pricing')}
          className="mb-6 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-sky-300"
        >
          <span className="text-slate-500">←</span>
          Back to plans
        </button>

        <h1 className="mb-4 text-2xl font-semibold">Crypto plaćanje</h1>

        <p className="mb-4 text-sm text-slate-300">
          Pošalji tačno{' '}
          <span className="font-semibold">
            {pay_amount} {pay_currency.toUpperCase()}
          </span>{' '}
          na sledeću adresu:
        </p>

        <p className="mb-3 break-all font-mono text-xs text-emerald-300">
          {pay_address}
        </p>

        <button
          onClick={() => navigator.clipboard.writeText(pay_address)}
          className="mb-6 rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:border-sky-500 hover:text-sky-300"
        >
          Kopiraj adresu
        </button>

        <div className="mb-6 flex justify-center">
          <QRCode value={pay_address} size={180} />
        </div>

        <p className="mb-2 text-[11px] text-slate-500">Payment ID: {payment_id}</p>
        <p className="text-[11px] text-slate-500">
          Nakon potvrde uplate na mreži, paket će ti se automatski aktivirati na nalogu.
          Potvrda može da potraje nekoliko minuta u zavisnosti od mreže.
        </p>
      </div>
    </div>
  );
};

export default CryptoPaymentPage;
