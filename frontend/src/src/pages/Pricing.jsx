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
  {
    id: '693db3f4e9cf589519c14502',
    name: 'Elite 50K',
    balance: '$50.000',
    price: '$799',
    description: 'Ozbiljan kapital za iskusne i dosledne tradere.',
    tag: 'Za napredne tradere',
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
    <div className="relative min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 lg:px-8">
        {/* Header / back link */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1 text-xs text-sky-700 transition hover:text-sky-900"
          >
            <span className="text-sky-500">←</span>
            Nazad na početnu
          </button>

          {!token && (
            <button
              onClick={() => navigate('/login')}
              className="rounded-full border border-sky-500/80 px-3 py-1.5 text-xs text-sky-700 transition hover:bg-sky-50"
            >
              Prijavite se da kupite nalog
            </button>
          )}
        </div>

        {/* Title */}
        <header className="mb-10 space-y-3 text-left">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
            Funding planovi
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Izaberite veličinu funded naloga.
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Jednokratna naknada, jasna pravila rizika i instant pristup klijent dashboard‑u nakon
            potvrde uplate. Možete krenuti od manjeg 10K naloga ili odmah preći na 50K ako već
            trgujete sa većim iznosima.
          </p>
        </header>

        {/* Plans grid */}
        <main>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onStripe={handleStripe}
                onCrypto={handleCrypto}
              />
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Nakon uspešne uplate, vaš aktivni plan će biti prikazan u klijent dashboard‑u, zajedno
            sa pravilima trgovanja. Uvek možete kasnije preći na veći nalog.
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
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 ease-out ${
        highlighted
          ? 'border-sky-400 ring-1 ring-sky-400/60 hover:border-sky-500 hover:shadow-xl hover:scale-[1.03]'
          : 'border-slate-200 hover:border-sky-300 hover:shadow-lg hover:scale-[1.02]'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-md">
          Preporučeno
        </div>
      )}

      <div className="mb-4 space-y-1">
        <div className="text-xs font-medium text-sky-600">{balance}</div>
        <div className="text-lg font-semibold text-slate-900">{name}</div>
        <div className="text-2xl font-bold text-slate-900">{price}</div>
      </div>

      {tag && <div className="mb-3 text-[11px] text-slate-600">{tag}</div>}

      <p className="mb-4 text-sm sm:text-base text-slate-700">
        {description}
      </p>

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={() => onStripe(id)}
          className="group inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-950 shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md hover:-translate-y-[1px]"
        >
          Plati karticom (Stripe)
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
        <button
          onClick={() => onCrypto(id)}
          className="inline-flex items-center justify-center rounded-full border border-sky-300 px-3 py-2 text-xs sm:text-sm text-sky-700 hover:bg-sky-50 transition-colors"
        >
          Plati kriptom (NOWPayments)
        </button>
      </div>
    </div>
  );
};

export default Pricing;
