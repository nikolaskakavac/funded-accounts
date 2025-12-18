import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { createNowPayment } from '../api';

export default function CryptoPaymentPage({ token, planId }) {
  const [coin, setCoin] = useState('usdc'); // 'usdc' | 'usdt' | 'eth'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const revealAddress = async () => {
    setErr('');
    setData(null);
    setLoading(true);
    try {
      const res = await createNowPayment(token, planId, coin);
      setData(res); // { payment_id, pay_address, pay_amount, pay_currency }
    } catch (e) {
      console.error(e);
      setErr('Greška pri kreiranju kripto uplate.');
    } finally {
      setLoading(false);
    }
  };

  const { payment_id, pay_address, pay_amount, pay_currency } = data || {};

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10 lg:px-8">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
          Plaćanje kriptom
        </h1>

        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Izbor coina */}
          <p className="mb-3 text-sm font-medium text-slate-800">
            Izaberite coin za uplatu:
          </p>
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCoin('usdc')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                coin === 'usdc'
                  ? 'border-sky-500 bg-sky-50 text-sky-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="font-semibold">USDC</span>
              <span className="text-[11px] text-slate-500">Ethereum mreža</span>
            </button>

            <button
              type="button"
              onClick={() => setCoin('usdt')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                coin === 'usdt'
                  ? 'border-sky-500 bg-sky-50 text-sky-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="font-semibold">USDT</span>
              <span className="text-[11px] text-slate-500">Ethereum mreža</span>
            </button>

            <button
              type="button"
              onClick={() => setCoin('eth')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                coin === 'eth'
                  ? 'border-sky-500 bg-sky-50 text-sky-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="font-semibold">ETH</span>
              <span className="text-[11px] text-slate-500">Ethereum mreža</span>
            </button>
          </div>

          {/* Dugme za prikaz adrese */}
          <button
            type="button"
            onClick={revealAddress}
            disabled={loading}
            className="mb-4 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Kreiranje uplate…' : 'Prikaži kripto adresu za uplatu'}
          </button>

          {err && (
            <p className="mb-3 text-xs text-red-500">
              {err}
            </p>
          )}

          {/* Adresa & QR tek nakon kreiranja */}
          {data && (
            <div className="mt-4 space-y-3 text-xs text-slate-700">
              <p>
                Pošaljite tačno{' '}
                <span className="font-semibold">
                  {pay_amount} {pay_currency?.toUpperCase()}
                </span>{' '}
                na sledeću adresu:
              </p>

              <p className="break-all font-mono text-[11px] text-slate-900">
                {pay_address}
              </p>

              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(pay_address)}
                className="rounded-full border border-slate-300 px-3 py-1 text-[11px] text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Kopiraj adresu
              </button>

              <div className="mt-4 flex justify-center">
                <QRCodeCanvas value={pay_address} size={180} />
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Payment ID: {payment_id}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Nakon što uplata bude potvrđena na blockchain‑u, vaš funded nalog i plan će se
                automatski aktivirati.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
