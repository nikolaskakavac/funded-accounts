import React from 'react';

const About = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <main className="relative mx-auto max-w-5xl px-4 py-16 space-y-10">
        {/* Naslov + uvod */}
        <section>
          <h1 className="mb-3 text-3xl md:text-4xl font-semibold text-slate-900">
            O nama
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-700">
            Pomažemo traderima da dođu do kapitala uz jasna pravila rizika i fer podelu profita,
            bez nepotrebne birokratije.
          </p>
        </section>

        {/* Statistike / highlight-i */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Traderi
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">200+</p>
            <p className="mt-1 text-xs text-slate-600">
              Aktivnih naloga na kripto tržištima.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Maksimalni nalog
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">$200K</p>
            <p className="mt-1 text-xs text-slate-600">
              Skaliranje kapitala za dosledne tradere.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Podela profita
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">Do 70%</p>
            <p className="mt-1 text-xs text-slate-600">
              Veći deo dobiti ostaje traderu.
            </p>
          </div>
        </section>

        {/* Kratko objašnjenje + kako radimo */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
          <div className="space-y-4 text-sm sm:text-base text-slate-700">
            <p>
              Firma obezbeđuje kapital, postavlja jasne limite rizika i deli profit sa traderima.
              Vi birate nalog, završite uplatu i pratite status kroz jednostavan dashboard.
            </p>
            <p>
              Trgujete na svojim platformama (npr. MT4, MT5), dok mi vodimo računa o aktivaciji
              naloga, praćenju pravila i isplatama.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Naša filozofija
              </p>
              <p className="text-sm text-slate-700">
                Gledamo na saradnju kao partnerstvo: ako vi rastete i imate rezultate, raste i fond.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Fokus na rizik
              </p>
              <p className="text-sm text-slate-700">
                Jasni dnevni limiti i ukupni drawdown štite i fond i tradera od prekomernog rizika.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Tehnologija
              </p>
              <p className="text-sm text-slate-700">
                Integracija sa Stripe‑om i kripto gateway‑em, automatizowana aktivacija naloga i
                pregled u realnom vremenu kroz dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Vrednosti / šta garantujemo */}
        <section className="mt-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Šta garantujemo
          </p>
          <div className="grid gap-4 sm:grid-cols-3 text-sm text-slate-700">
            <div>
              <p className="mb-1 font-medium">Transparentni uslovi</p>
              <p className="text-xs text-slate-600">
                Limiti, troškovi i pravila su jasno prikazani pre kupovine naloga.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium">Podrška traderima</p>
              <p className="text-xs text-slate-600">
                Pomoć oko naloga i plaćanja da biste se fokusirali na strategiju.
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium">Partnerski pristup</p>
              <p className="text-xs text-slate-600">
                Cilj je dugoročna saradnja i skaliranje, ne kazna za svaku grešku.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
