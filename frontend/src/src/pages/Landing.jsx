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

const Landing = ({ navigate, token }) => {
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
    <div className="relative min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* HEADER WRAPPER */}
      <div className="relative mx-auto max-w-6xl px-4 pt-8 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div
            className="cursor-pointer text-lg font-semibold tracking-tight text-sky-700 transition-colors duration-200 hover:text-sky-900"
            onClick={() => navigate('/')}
          >
            NovaFunded
          </div>

          <nav className="hidden md:flex items-center gap-2 text-sm">
            {[
              { label: 'Paketi naloga', path: '/pricing' },
              { label: 'O nama', path: '/about' },
              { label: 'Kontakt', path: '/contact' },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="rounded-full px-3 py-1.5 text-slate-600 transition-all duration-200 ease-out hover:text-sky-900 hover:bg-slate-100/80 hover:-translate-y-[1px]"
              >
                {item.label}
              </button>
            ))}

            {token ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="ml-2 rounded-full border border-sky-500/80 px-3.5 py-1.5 text-sky-700 text-sm font-medium transition-all duration-200 ease-out hover:bg-sky-50 hover:-translate-y-[1px]"
              >
                Moj nalog
              </button>
            ) : (
              <div className="ml-2 flex items-center gap-1.5">
                <button
                  onClick={() => navigate('/login')}
                  className="rounded-full px-3 py-1.5 text-slate-600 text-sm transition-all duration-200 ease-out hover:text-sky-900 hover:bg-slate-100/80 hover:-translate-y-[1px]"
                >
                  Prijava
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="rounded-full bg-sky-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-out hover:bg-sky-700 hover:shadow-md hover:-translate-y-[1px]"
                >
                  Kupi nalog
                </button>
              </div>
            )}
          </nav>
        </header>
      </div>

      <main className="flex flex-col items-center gap-12 pb-12">
        {/* HERO */}
        <section
          className="relative w-full py-14 px-4 sm:px-8"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 60%), url('/img/crypto-bg.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />

          <div className="relative mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
            {/* LEFT TEXT */}
            <div className="max-w-xl space-y-6 animate-[fadeIn_0.8s_ease-out]">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-slate-900/40 px-3 py-1 text-[11px] text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.6)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Trgujte kriptom našim novcem, ne svojim
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white">
                Kapital za trgovanje,
                <span className="block bg-gradient-to-r from-sky-400 to-emerald-300 bg-clip-text text-transparent">
                  bez rizika vašeg novca.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-200/90">
                Kupiš nalog, dobiješ kapital firme i jasna pravila rizika – profit delimo 70% za tebe,
                30% za fond. Bez kredita i poluga na sopstveni novac.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-sky-100/90">
                <div className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Bezbedna kartična plaćanja (Stripe)</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span>Kripto uplata: BTC, ETH, USDT (NOWPayments)</span>
                </div>
              </div>
            </div>

            {/* RIGHT – floating card */}
            <div className="mt-6 w-full max-w-sm md:mt-0 md:w-auto">
              <div className="relative rounded-3xl border border-sky-400/40 bg-slate-900/70 p-5 shadow-[0_25px_80px_rgba(8,47,73,0.95)] backdrop-blur-lg animate-[float_6s_ease-in-out_infinite]">
                {/* glow ring */}
                <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-3xl bg-gradient-to-r from-sky-500/40 via-emerald-400/30 to-sky-500/40 blur-xl opacity-60" />

                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Prvi korak
                </p>
                <p className="mb-4 text-sm text-slate-100">
                  Izaberi veličinu naloga i odmah rezerviši kapital. Plaćanje karticom ili kriptom.
                </p>

                <div className="grid gap-3 text-xs text-slate-200">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 px-3 py-2">
                    <span className="font-medium text-slate-100">Starter 10K</span>
                    <span className="text-emerald-300">$199</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-3 py-2 ring-1 ring-emerald-400/40">
                    <span className="font-medium text-slate-50">Pro 25K</span>
                    <span className="text-emerald-300">$399</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 px-3 py-2">
                    <span className="font-medium text-slate-100">Elite 50K</span>
                    <span className="text-emerald-300">$799</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() =>
                      document
                        .getElementById('pricing-section')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="group inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.7)] transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:-translate-y-[1px]"
                  >
                    Pogledaj pakete naloga
                    <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex w-full items-center justify-center rounded-full border border-sky-400/70 bg-slate-900/60 px-4 py-2.5 text-sm text-sky-100 transition-all duration-200 hover:bg-sky-500/15 hover:border-sky-300"
                  >
                    Prijava klijenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 TAČAKA */}
        <section className="w-full max-w-5xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 px-6 sm:px-10 py-10 shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-blue-600 text-center">
                Šta tačno dobijate
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 text-center">
                Sve objašnjeno u 6 jasnih tačaka
              </h2>
              <p className="text-base sm:text-lg text-slate-700 text-center">
                Kratko i jasno, bez suvišnih reči – svaki nalog uključuje sledeće stavke.
              </p>

              <div className="mt-6 divide-y divide-slate-200 border-t border-b border-slate-200">
                {[
                  {
                    title: 'Kapital za trgovanje',
                    text: 'Pristup novcu naše firme kojim trgujete na kripto tržištu. Ne rizikujete sopstveni novac.',
                  },
                  {
                    title: 'Profesionalna platforma',
                    text: 'Nakon kupovine naloga dobijate log in podatke i besplatan pristup našoj trgovačkoj platformi i alatima.',
                  },
                  {
                    title: 'Jasna pravila i limiti',
                    text: 'Dnevni i ukupni limit gubitka + jednostavna pravila rizika, jasno objašnjena od prvog dana.',
                  },
                  {
                    title: 'Mi preuzimamo rizik',
                    text: 'Svi gubici na nalogu su naš trošak. Vaš lični novac je 100% zaštićen.',
                  },
                  {
                    title: 'Podela profita 70% / 30%',
                    text: '70% profita ide vama, 30% zadržava firma za kapital, infrastrukturu i podršku.',
                  },
                  {
                    title: 'Mogućnost skaliranja',
                    text: 'Za stabilne rezultate postoji mogućnost povećanja kapitala i dugoročne saradnje.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center gap-2 py-5 sm:py-6 hover:bg-slate-100/70 transition-colors"
                  >
                    <p className="text-3xl sm:text-4xl font-bold text-blue-500 leading-none">
                      {idx + 1}
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-base sm:text-lg text-slate-700 max-w-2xl">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING / CHECKOUT SA STRIPE + NOWPAYMENTS */}
        <section id="pricing-section" className="w-full max-w-6xl px-4">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Izaberi nalog i plati odmah
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Jednokratna naknada, jasna pravila rizika i instant pristup dashboard‑u nakon uplate.
            </p>
          </div>

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

          <p className="mt-6 text-xs text-slate-500 text-center">
            Nakon uspešne uplate, aktivni plan se prikazuje u tvom klijent dashboard‑u zajedno sa pravilima trgovanja.
          </p>
        </section>

        {/* MALI FAQ */}
        <section className="w-full max-w-4xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-white px-6 sm:px-8 py-8 shadow-[0_14px_35px_rgba(15,23,42,0.12)]">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 text-center">
              Često postavljena pitanja
            </h2>
            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <p className="font-semibold text-slate-900">Da li rizikujem svoj novac?</p>
                <p className="text-slate-700">
                  Ne. Trguješ našim kapitalom. Tvoj lični novac je izložen samo prilikom kupovine naloga.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Kada dobijam pristup nalogu?</p>
                <p className="text-slate-700">
                  U roku od nekoliko minuta nakon uspešne uplate dobijaš email sa podacima za prijavu.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Kako se isplaćuje profit?</p>
                <p className="text-slate-700">
                  Profit se deli 70% za tebe, 30% za firmu i isplata ide jednom mesečno na tvoj račun ili kripto novčanik.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER – PLAV (#3B82F6) */}
      <footer className="mt-6 w-full border-t border-blue-600/60 bg-blue-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs sm:flex-row sm:text-sm text-blue-50">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} NovaFunded. Sva prava zadržana.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-white/90 transition-colors"
            >
              Uslovi korišćenja
            </button>
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-white/90 transition-colors"
            >
              Politika privatnosti
            </button>
          </div>
        </div>
      </footer>
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

export default Landing;
