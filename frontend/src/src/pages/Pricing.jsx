import { createStripeCheckout } from '../api';

const plans = [
  {
    id: '693db3e0e9cf589519c144fe',
    name: 'Starter 10K',
    balance: '$10.000',
    price: '$199',
    description: 'Ulazni funded nalog za disciplinovane tradere.',
    tag: 'Idealno za prvi prop nalog',
  },
  {
    id: '693db3ede9cf589519c14500',
    name: 'Pro 25K',
    balance: '$25.000',
    price: '$399',
    description: 'Više kapitala, jasnija pravila rizika i bolji potencijal skaliranja.',
    tag: 'Najčešći izbor klijenata',
    highlighted: true,
  },
];

const Pricing = ({ navigate, token }) => {
  const handleStripe = async (planId) => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await createStripeCheckout(token, planId);
      if (res.url) {
        window.location.href = res.url;
      } else {
        alert('Ne može da se kreira Stripe sesija.');
      }
    } catch (e) {
      console.error(e);
      alert('Stripe greška. Pokušajte ponovo.');
    }
  };

  const handleCrypto = (planId) => {
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/pay-crypto/${planId}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-16 lg:px-8">
        {/* Header / back link */}
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
            Jednokratna naknada, jasno definisana pravila rizika i instant pristup klijent
            dashboard‑u nakon potvrde uplate. Kreni od 10K ako testiraš sistem ili odmah
            pređi na 25K ako već trguješ sa većim kapitalom.
          </p>
        </header>

        {/* Plans grid */}
        <main>
          <div className="grid gap-7 md:grid-cols-2 md:justify-items-center">
            {plans.map((plan) => (
              <div key={plan.id} className="w-full max-w-sm">
                <PlanCard
                  plan={plan}
                  onStripe={handleStripe}
                  onCrypto={handleCrypto}
                />
              </div>
            ))}
          </div>

          <p className="mt-8 font-sans text-[13px] text-slate-400 max-w-3xl">
            Nakon uspešne uplate, tvoj aktivni plan se prikazuje u klijent dashboard‑u zajedno
            sa pravilima trgovanja. Uvek možeš kasnije da pređeš na veći nalog kada ti rezultati
            postanu stabilni.
          </p>
        </main>
      </div>
    </div>
  );
};

const PlanCard = ({ plan, onStripe, onCrypto }) => {
  const { id, name, balance, price, description, tag, highlighted } = plan;

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-lg
                  bg-gradient-to-b from-black via-[#02110b] to-black
                  transition-all duration-200 ease-out
                  ${
                    highlighted
                      ? 'border-emerald-400 shadow-emerald-500/30 hover:-translate-y-2'
                      : 'border-emerald-700/40 hover:border-emerald-400/80 hover:-translate-y-1'
                  }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 px-4 py-0.5 text-[10px] font-display uppercase tracking-[0.2em] text-black shadow-md">
          Preporučeno
        </div>
      )}

      <div className="mb-4 space-y-1">
        <div className="font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-emerald-300">
          {balance}
        </div>
        <div className="font-display text-[20px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
          {name}
        </div>
        <div className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.08em] text-emerald-300">
          {price}
        </div>
      </div>

      {tag && (
        <div className="mb-3 font-sans text-[12px] text-emerald-200/90">
          {tag}
        </div>
      )}

      <p className="mb-5 font-sans text-[14px] sm:text-[15px] text-slate-100/90 leading-relaxed">
        {description}
      </p>

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={() => onStripe(id)}
          className="group inline-flex items-center justify-center gap-2 rounded-full 
                     bg-emerald-500 px-4 py-2.5 text-[13px] sm:text-[14px] font-sans font-semibold 
                     uppercase tracking-[0.14em] text-black shadow-[0_0_20px_rgba(16,185,129,0.6)]
                     transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
        >
          Plati karticom (Stripe)
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
        <button
          onClick={() => onCrypto(id)}
          className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-[13px] sm:text-[14px] font-sans uppercase tracking-[0.14em] text-emerald-200
                     hover:bg-emerald-500/10 transition-all duration-200"
        >
          Plati kriptom (NOWPayments)
        </button>
      </div>
    </div>
  );
};

export default Pricing;
