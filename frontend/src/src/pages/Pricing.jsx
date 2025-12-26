import { useState } from 'react';
import { createNowPayment } from '../api';  // ← DODAO CRYPTO
import OnSiteStripeCheckout from '../components/OnSiteStripeCheckout';
import Header from '../components/Header';

const plans = [
  {
    id: '693db3e0e9cf589519c144fe',
    name: 'Nalog sa 10.000€',
    price: 99,
    currency: 'usd',
    balance: 10000,
    highlighted: true,
  },
  {
    id: '693db3ede9cf589519c14500',
    name: 'Nalog sa 20.000€',
    price: 189,
    currency: 'usd',
    balance: 20000,
  },
];

const Pricing = ({ navigate, token, onLogout }) => {
  const [onSitePlanId, setOnSitePlanId] = useState(null);

  const handleCrypto = async (planId) => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await createNowPayment(token, planId, 'BTC'); // ili 'USDT'
      if (res.invoice_url) {
        window.location.href = res.invoice_url;
      } else {
        alert('Crypto greška. Pokušaj ponovo.');
      }
    } catch (e) {
      console.error(e);
      alert('Crypto greška.');
    }
  };

  const selectedPlan = plans.find((p) => p.id === onSitePlanId);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16 lg:px-8">

        {/* Title */}
        <header className="mb-12 space-y-4 text-left">
          <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400">
            Funding planovi
          </p>
          <h1 className="font-display text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.05] font-extrabold tracking-[0.12em] uppercase text-slate-50">
            Izaberi veličinu funded naloga.
          </h1>
          <p className="font-sans max-w-3xl text-[16px] sm:text-[18px] text-emerald-100/90 leading-relaxed">
            Plati karticom na licu mesta ili kriptom. Instant dashboard pristup nakon uplate.
          </p>
        </header>

        {/* Plans */}
        <main>
          <div className="grid gap-7 md:grid-cols-2 md:justify-items-center">
            {plans.map((plan) => (
              <div key={plan.id} className="w-full max-w-sm">
                <PlanCard
                  plan={plan}
                  token={token}
                  navigate={navigate}
                  onChooseOnSite={() => setOnSitePlanId(plan.id)}
                  isOnSiteSelected={onSitePlanId === plan.id}
                  onCrypto={() => handleCrypto(plan.id)}
                />
              </div>
            ))}
          </div>

          {/* ON-SITE PLAĆANJE */}
          {token && selectedPlan && (
            <div className="mt-12 flex justify-center">
              <div className="w-full max-w-lg rounded-3xl border-2 border-emerald-500/80 bg-gradient-to-b from-emerald-500/10 via-black/80 to-emerald-900/10 p-8 shadow-2xl shadow-emerald-500/30 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/50 px-4 py-1.5 text-xs font-display uppercase tracking-[0.2em] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ✅ Plaćanje na licu mesta
                  </p>
                  <p className="mt-4 text-2xl font-display font-extrabold tracking-[0.1em] uppercase text-slate-50">
                    {selectedPlan.name}
                  </p>
                  <p className="text-4xl font-display font-extrabold tracking-[0.15em] text-emerald-400 mt-2">
                    {selectedPlan.price}€
                  </p>
                  <p className="text-lg font-semibold text-emerald-200 mt-1">
                    {selectedPlan.balance.toLocaleString()}€ kapitala
                  </p>
                </div>

                <OnSiteStripeCheckout
                  token={token}
                  planId={selectedPlan.id}
                  onSuccess={() => (window.location.href = '/success')}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const PlanCard = ({
  plan,
  token,
  navigate,
  onChooseOnSite,
  isOnSiteSelected,
  onCrypto,
}) => {
  const { name, price, highlighted } = plan;

  return (
    <div
      className={
        'relative flex h-full flex-col rounded-3xl border p-6 shadow-lg bg-gradient-to-b from-black via-[#02110b] to-black transition-all duration-200 ease-out ' +
        (highlighted
          ? 'border-emerald-400 shadow-emerald-500/30 hover:-translate-y-2 ring-2 ring-emerald-500/20'
          : 'border-emerald-700/40 hover:border-emerald-400/80 hover:-translate-y-1')
      }
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 px-4 py-0.5 text-[10px] font-display uppercase tracking-[0.2em] text-black shadow-md">
          Preporučeno
        </div>
      )}

      <div className="mb-4 space-y-1 text-center">
        <div className="font-display text-[20px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
          {name}
        </div>
        <div className="font-display text-[16px] font-semibold tracking-[0.08em] text-emerald-300">
          Cena:
        </div>
        <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
          {price}€
        </div>
      </div>

      <div className="space-y-2">
        {token ? (
          <>
            <button
              onClick={onChooseOnSite}
              disabled={isOnSiteSelected}
              className={
                'w-full rounded-2xl py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-200 shadow-lg ' +
                (isOnSiteSelected
                  ? 'bg-emerald-500/90 text-black shadow-emerald-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] hover:-translate-y-0.5')
              }
            >
              {isOnSiteSelected ? 'IZABRAN - PLAĆAJ ISPOD' : '💳 Plati karticom'}
            </button>
            <button
  onClick={onCrypto}
  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-400/15 to-cyan-400/15 p-[1px] shadow-[0_0_25px_rgba(34,197,94,0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,197,94,0.75)]"
>
  <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black/90 px-4 py-3 sm:py-3.5">
    <span className="text-lg sm:text-xl">🪙</span>
    <span className="font-sans text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.18em] text-emerald-100 group-hover:text-emerald-50">
      Plati kriptom ({price}€)
    </span>
    <span className="text-[11px] sm:text-[12px] text-emerald-300/80 group-hover:text-emerald-200/90">
      BTC • ETH • USDT
    </span>
  </div>

  {/* subtle shine animacija preko dugmeta */}
  <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[100%] transition-all duration-700" />
</button>

          </>
        ) : (
          <button
            onClick={() => navigate('/register')}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-3.5 font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:shadow-[0_0_35px_rgba(16,185,129,0.9)] hover:-translate-y-0.5 transition-all duration-200"
          >
            KREIRAJ NALOG DA ZAVRŠIŠ PLAĆANJE
          </button>
        )}
      </div>
    </div>
  );
};

export default Pricing;
