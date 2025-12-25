import React from 'react';
import Header from '../components/Header';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Partnerstvo = ({ navigate, token, onLogout }) => {
  const lang = getLang();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50 overflow-x-hidden">
      <Header navigate={navigate} token={token} onLogout={onLogout} />

      <main className="relative mx-auto max-w-5xl px-4 py-16 space-y-10">
        {/* Naslov */}
        <section className="space-y-3">
          <h1 className="font-display text-[32px] sm:text-[38px] font-extrabold tracking-[0.14em] uppercase text-slate-50">
            {t('partner.title', lang)}
          </h1>
          <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/95 leading-relaxed max-w-2xl">
            {t('partner.subtitle', lang)}
          </p>
        </section>

        {/* Uvodni opis */}
        <section className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20 space-y-3">
          <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
            {t('partner.intro1', lang)}
          </p>
          <p className="font-sans text-[18px] sm:text-[19px] text-emerald-100/90 leading-relaxed">
            {t('partner.intro2', lang)}
          </p>
        </section>

        {/* Separator */}
        <div className="flex justify-center">
          <span className="text-emerald-400/60 text-2xl">⸻</span>
        </div>

        {/* Šta partnerstvo znači za vas */}
        <section className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20 space-y-3">
          <p className="font-display text-[11.5px] uppercase tracking-[0.22em] text-emerald-300">
            {t('partner.section.what', lang)}
          </p>
          <ul className="mt-1 space-y-3 font-sans text-[17px] sm:text-[18px] text-slate-200 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <div className="space-y-0.5">
                <p className="font-semibold text-emerald-200">{t('partner.bullet.security.title', lang)}</p>
                <p>{t('partner.bullet.security.desc', lang)}</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <div className="space-y-0.5">
                <p className="font-semibold text-emerald-200">{t('partner.bullet.tools.title', lang)}</p>
                <p>{t('partner.bullet.tools.desc', lang)}</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <div className="space-y-0.5">
                <p className="font-semibold text-emerald-200">{t('partner.bullet.transparency.title', lang)}</p>
                <p>{t('partner.bullet.transparency.desc', lang)}</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <div className="space-y-0.5">
                <p className="font-semibold text-emerald-200">{t('partner.bullet.regional.title', lang)}</p>
                <p>{t('partner.bullet.regional.desc', lang)}</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Separator */}
        <div className="flex justify-center">
          <span className="text-emerald-400/60 text-2xl">⸻</span>
        </div>

        {/* Završni deo */}
        <section className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20 space-y-3">
          <p className="font-sans text-[17px] sm:text-[18px] text-emerald-100/90 leading-relaxed">
            {t('partner.conclusion1', lang)}
          </p>
          <p className="font-sans text-[17px] sm:text-[18px] text-emerald-100/90 leading-relaxed">
            {t('partner.conclusion2', lang)}
          </p>
        </section>

        {/* Separator */}
        <div className="flex justify-center">
          <span className="text-emerald-400/60 text-2xl">⸻</span>
        </div>

        {/* Registracioni broj */}
        <section className="rounded-2xl border border-emerald-800/70 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="font-sans text-[17px] text-emerald-300/90 font-medium text-center">
            {t('partner.registration', lang)} EQS-BAL-2025-047
          </p>
        </section>

        {/* Nazad na O nama */}
        <section>
          <button
            onClick={() => navigate && navigate('/about')}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/80 bg-emerald-500/10 px-6 py-2.5 text-[15px] font-sans font-medium text-emerald-100 hover:bg-emerald-500/20 hover:border-emerald-400 transition"
          >
            {t('partner.back', lang)}
          </button>
        </section>
      </main>
    </div>
  );
};

export default Partnerstvo;
