import React from 'react';
import Header from '../components/Header';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const About = ({ navigate, token, onLogout }) => {
  const lang = getLang();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50 overflow-x-hidden">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <main className="relative mx-auto max-w-5xl px-4 pb-16 space-y-12">

        {/* Naslov + uvod */}
        <section>
          <h1 className="font-display text-[34px] sm:text-[40px] font-extrabold tracking-[0.14em] uppercase text-slate-50 flex items-center gap-3">
            {t('about.title', lang)}
          </h1>

          <p className="mt-3 font-sans text-[22px] sm:text-[24px] text-emerald-100/95 leading-relaxed">
            {t('about.subtitle', lang)}
          </p>

          {/* Glavni opis */}
          <div className="mt-8 space-y-6 max-w-4xl">
            {/* Naše poreklo */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                {t('about.origin.title', lang)}
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                {t('about.origin.description', lang)}
              </p>
            </div>

            {/* Regionalni pristup */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                {t('about.regional.title', lang)}
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                {t('about.regional.description', lang)}
              </p>
            </div>

            {/* Naš model */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                {t('about.model.title', lang)}
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                {t('about.model.description', lang)}
              </p>
            </div>

            {/* Izgradnja mreže */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                {t('about.network.title', lang)}
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                {t('about.network.description', lang)}
              </p>
            </div>

            {/* Naša misija */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-200 font-semibold mb-4 text-[20px] sm:text-[21px] flex items-center gap-2">
                {t('about.mission.title', lang)}
              </p>
              <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
                {t('about.mission.description', lang)}
              </p>
            </div>

            {/* Registracioni broj */}
            <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
              <p className="text-emerald-300/90 font-semibold text-[18px] sm:text-[19px] text-center">
                {t('about.registration', lang)} <span className="text-emerald-200 font-bold">EQS-BAL-2025-047</span>
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="flex justify-center mt-8">
            <span className="text-emerald-400/60 text-2xl">⸻</span>
          </div>

        {/* CTA dugme */}
<button
  onClick={() => {
    navigate && navigate('/partnerstvo');
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
  }}
  className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/80 bg-emerald-500/15 px-6 py-2.5 text-[16px] font-sans font-semibold text-emerald-100 hover:bg-emerald-500/25 hover:border-emerald-400 transition"
>
  {t('about.partnershipButton', lang)}
</button>

        </section>

        {/* Statistike / highlight-i */}
<section className="grid gap-5 sm:grid-cols-2">
  {/* Klijenti */}
  <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20 space-y-2">
    <p className="font-display text-[13px] uppercase tracking-[0.22em] text-emerald-300">
      {t('about.stats.clients.title', lang)}
    </p>
    <p className="font-display text-[30px] font-extrabold text-emerald-300">
      200+
    </p>
    <p className="font-sans text-[17px] text-slate-300 leading-relaxed">
      {t('about.stats.clients.description', lang)}
    </p>
  </div>

  {/* Podela profita */}
  <div className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20 space-y-2">
    <p className="font-display text-[13px] uppercase tracking-[0.22em] text-emerald-300">
      {t('about.stats.profit.title', lang)}
    </p>
    <p className="font-display text-[30px] font-extrabold text-emerald-300">
      80% 
    </p>
    <p className="font-sans text-[17px] text-slate-300 leading-relaxed">
      {t('about.stats.profit.description', lang)}
    </p>
  </div>
</section>

        {/* Vrednosti / šta garantujemo */}
        <section className="mt-2 rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="mb-4 font-display text-[12px] uppercase tracking-[0.23em] text-emerald-300">
            {t('about.expectations.title', lang)}
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 font-display text-[16px] font-semibold text-emerald-200">
                {t('about.expectations.longterm.title', lang)}
              </p>
              <p className="font-sans text-[15px] text-slate-300">
                {t('about.expectations.longterm.description', lang)}
              </p>
            </div>
            <div>
              <p className="mb-1.5 font-display text-[16px] font-semibold text-emerald-200">
                {t('about.expectations.security.title', lang)}
              </p>
              <p className="font-sans text-[15px] text-slate-300">
                {t('about.expectations.security.description', lang)}
              </p>
            </div>
            <div>
              <p className="mb-1.5 font-display text-[16px] font-semibold text-emerald-200">
                {t('about.expectations.tools.title', lang)}
              </p>
              <p className="font-sans text-[15px] text-slate-300">
                {t('about.expectations.tools.description', lang)}
              </p>
            </div>
            <div>
              <p className="mb-1.5 font-display text-[16px] font-semibold text-emerald-200">
                {t('about.expectations.support.title', lang)}
              </p>
              <p className="font-sans text-[15px] text-slate-300">
                {t('about.expectations.support.description', lang)}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
