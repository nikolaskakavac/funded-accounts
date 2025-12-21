import { useState } from 'react';
import { createNowPayment } from '../api';  // ← DODAO CRYPTO
import OnSiteStripeCheckout from '../components/OnSiteStripeCheckout';

const plans = [
  {
    id: '693db3e0e9cf589519c144fe',
    name: '10K Kapital',
    price: 79,
    currency: 'usd',
    balance: 10000,
    description: 'Testiraj sistem sa manjim kapitalom. Savršen za nove tradere.',
    tag: 'Idealno za početak'
  },
  {
    id: '693db3ede9cf589519c14500',
    name: '20K Kapital',
    price: 169,
    currency: 'usd',
    balance: 20000,
    description: 'Veći kapital, bolji profit potencijal. Za ozbiljne tradere.',
    tag: 'Najčešći izbor',
    highlighted: true
  }
];

const Pricing = ({ navigate, token }) => {
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
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] text-emerald-300 transition hover:text-emerald-100"
          >
            <span className="text-emerald-400 text-sm">←</span>
            Nazad na početnu
          </button>

          {!token && (
            <button
              onClick={() => navigate('/login')}
              className="rounded-full border border-emerald-500/70 px-4 py-1.5 text-[11px] font-sans uppercase tracking-[0.16em] text-emerald-200 hover:bg-emerald-500/10 transition-colors"
            >
              Prijavite se da kupite nalog
            </button>
          )}
        </div>

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
  onChooseOnSite,
  isOnSiteSelected,
  onCrypto
}) => {
  const { name, balance, price, description, tag, highlighted } = plan;

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

      <div className="mb-4 space-y-1">
        <div className="font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-emerald-300">
          {balance.toLocaleString()}€
        </div>
        <div className="font-display text-[20px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
          {name}
        </div>
        <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
          {price}€
        </div>
      </div>

      <div className="mb-3 font-sans text-[12px] text-emerald-200/90">{tag}</div>

      <p className="mb-6 font-sans text-[14px] sm:text-[15px] text-slate-100/90 leading-relaxed flex-1">
        {description}
      </p>

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
              {isOnSiteSelected ? '✅ IZABRAN - PLAĆAJ ISPOD' : '💳 Plati karticom'}
            </button>
            <button
              onClick={onCrypto}
              className="w-full rounded-2xl border-2 border-emerald-500/60 bg-emerald-500/10 py-3 font-sans font-semibold uppercase tracking-[0.16em] text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-400/80 hover:-translate-y-0.5 transition-all duration-200"
            >
              🪙 Plati kriptom
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-3.5 font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:shadow-[0_0_35px_rgba(16,185,129,0.9)] hover:-translate-y-0.5 transition-all duration-200"
          >
            PRIJAVI SE DA KUPIŠ
          </button>
        )}
      </div>
    </div>
  );
};

export default Pricing;
