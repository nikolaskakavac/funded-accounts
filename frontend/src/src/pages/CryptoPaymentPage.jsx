import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { createNowPayment } from '../api';
import Header from '../components/Header';

export default function CryptoPaymentPage({ token, planId, navigate, onLogout }) {
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
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10 lg:px-8">
        {/* Header */}
        <div className="mb-8 w-full flex items-center justify-between">
          <div>
            <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
              Kripto uplata
            </p>
            <h1 className="mt-2 font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              Plati kriptom
            </h1>
            <p className="mt-2 font-sans text-[15px] text-emerald-100/90">
              Izaberi coin i generiši jedinstvenu adresu za uplatu.
            </p>
          </div>

          {navigate && (
            <button
              onClick={() => navigate('/pricing')}
              className="hidden rounded-full border border-emerald-500/70 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-emerald-200 transition-colors hover:bg-emerald-500/10 sm:inline-flex"
            >
              Nazad na planove
            </button>
          )}
        </div>

        <div className="w-full rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-xl shadow-emerald-500/20">
          {/* Izbor coina */}
          <p className="mb-3 font-sans text-[15px] font-medium text-slate-50">
            Izaberi coin:
          </p>
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCoin('usdc')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition ${
                coin === 'usdc'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                  : 'border-emerald-700 bg-black/60 text-slate-200 hover:bg-emerald-500/5'
              }`}
            >
              <span className="font-semibold">USDC</span>
              <span className="text-[11px] text-slate-400">Ethereum mreža</span>
            </button>

            <button
              type="button"
              onClick={() => setCoin('usdt')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition ${
                coin === 'usdt'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                  : 'border-emerald-700 bg-black/60 text-slate-200 hover:bg-emerald-500/5'
              }`}
            >
              <span className="font-semibold">USDT</span>
              <span className="text-[11px] text-slate-400">Ethereum mreža</span>
            </button>

            <button
              type="button"
              onClick={() => setCoin('eth')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition ${
                coin === 'eth'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                  : 'border-emerald-700 bg-black/60 text-slate-200 hover:bg-emerald-500/5'
              }`}
            >
              <span className="font-semibold">ETH</span>
              <span className="text-[11px] text-slate-400">Ethereum mreža</span>
            </button>
          </div>

          {/* Dugme za prikaz adrese */}
          <button
            type="button"
            onClick={revealAddress}
            disabled={loading}
            className="mb-4 flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_18px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Kreiranje uplate…' : 'Prikaži adresu za uplatu'}
          </button>

          {err && (
            <p className="mb-3 font-sans text-[13px] text-red-400">
              {err}
            </p>
          )}

          {/* Adresa & QR */}
          {data && (
            <div className="mt-5 space-y-3 font-sans text-[13px] text-slate-200">
              <p>
                Pošalji tačno{' '}
                <span className="font-semibold">
                  {pay_amount} {pay_currency?.toUpperCase()}
                </span>{' '}
                na ovu adresu:
              </p>

              <p className="break-all font-mono text-[12px] text-emerald-100">
                {pay_address}
              </p>

              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(pay_address)}
                className="rounded-full border border-emerald-600 px-3 py-1.5 text-[13px] text-emerald-200 hover:bg-emerald-500/10 transition-colors"
              >
                Kopiraj adresu
              </button>

              <div className="mt-4 flex justify-center">
                <QRCodeCanvas value={pay_address} size={190} bgColor="#020617" fgColor="#a7f3d0" />
              </div>

              <p className="mt-2 text-[12px] text-slate-400">
                Payment ID: {payment_id}
              </p>
              <p className="mt-1 text-[12px] text-slate-400">
                Nakon potvrde na blockchain‑u, tvoj plan se automatski aktivira u dashboard‑u.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
