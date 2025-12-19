import React from 'react';

const About = ({ navigate }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <main className="relative mx-auto max-w-5xl px-4 py-14 space-y-10">
        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="mb-2 inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] text-emerald-300 transition hover:text-emerald-100"
        >
          <span className="text-emerald-400 text-sm">←</span>
          Nazad na početnu
        </button>

        {/* Naslov + uvod */}
        <section>
          <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
            Ko smo
          </p>
          <h1 className="mt-2 font-display text-[30px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
            O nama
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-[15px] sm:text-[16px] text-emerald-100/90 leading-relaxed">
            Povezujemo tradere sa kapitalom fonda, uz jasna pravila rizika i fer podelu profita.
            Ti trguješ – mi obezbeđujemo nalog i pratimo pravila.
          </p>
        </section>

        {/* Statistike / highlight-i */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
            <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              Traderi
            </p>
            <p className="mt-2 font-display text-[26px] font-extrabold text-emerald-300">
              200+
            </p>
            <p className="mt-1 font-sans text-[13px] text-slate-300">
              Aktivnih naloga na kripto tržištima.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
            <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              Maksimalni nalog
            </p>
            <p className="mt-2 font-display text-[26px] font-extrabold text-emerald-300">
              $200K
            </p>
            <p className="mt-1 font-sans text-[13px] text-slate-300">
              Skaliranje kapitala za dosledne tradere.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
            <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              Podela profita
            </p>
            <p className="mt-2 font-display text-[26px] font-extrabold text-emerald-300">
              Do 70%
            </p>
            <p className="mt-1 font-sans text-[13px] text-slate-300">
              Veći deo dobiti ostaje traderu.
            </p>
          </div>
        </section>

        {/* Kako radimo */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <div className="space-y-4">
            <p className="font-sans text-[15px] text-emerald-100/90 leading-relaxed">
              Mi obezbeđujemo kapital i limite rizika. Ti biraš veličinu naloga, završiš uplatu i
              pratiš sve kroz jednostavan dashboard.
            </p>
            <p className="font-sans text-[15px] text-emerald-100/90 leading-relaxed">
              Trguješ na platformi koju znaš (npr. MT5), dok mi vodimo računa o aktivaciji naloga,
              praćenju pravila i isplatama profita.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
              <p className="mb-1 font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                Naša filozofija
              </p>
              <p className="font-sans text-[14px] text-slate-300">
                Partnerstvo, ne “test”. Kada ti praviš rezultate, zajedno širimo kapital.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
              <p className="mb-1 font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                Fokus na rizik
              </p>
              <p className="font-sans text-[14px] text-slate-300">
                Jasni dnevni limiti i ukupni drawdown štite i fond i tradera od prevelikog gubitka.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-5 shadow-lg shadow-emerald-500/20">
              <p className="mb-1 font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                Tehnologija
              </p>
              <p className="font-sans text-[14px] text-slate-300">
                Stripe i kripto gateway za uplate, automatska aktivacija naloga i praćenje u realnom
                vremenu kroz dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Vrednosti / šta garantujemo */}
        <section className="mt-2 rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="mb-4 font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
            Šta možeš da očekuješ
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <p className="mb-1 font-display text-[14px] font-semibold text-emerald-200">
                Jasni uslovi
              </p>
              <p className="font-sans text-[13px] text-slate-300">
                Limiti, troškovi i pravila su prikazani pre kupovine naloga.
              </p>
            </div>
            <div>
              <p className="mb-1 font-display text-[14px] font-semibold text-emerald-200">
                Fokus na traderu
              </p>
              <p className="font-sans text-[13px] text-slate-300">
                Podrška oko naloga i plaćanja da se ti baviš samo tradingom.
              </p>
            </div>
            <div>
              <p className="mb-1 font-display text-[14px] font-semibold text-emerald-200">
                Dugoročna igra
              </p>
              <p className="font-sans text-[13px] text-slate-300">
                Cilj je stabilna i dugoročna saradnja, ne kazna za svaku grešku.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
