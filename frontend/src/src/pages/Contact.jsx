import React from 'react';
import Header from '../components/Header';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Contact = ({ navigate, token, onLogout }) => {
  const lang = getLang();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <main className="relative mx-auto max-w-4xl px-4 py-14 space-y-10">
        {/* Header */}
        <section className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
              {t('contact.section', lang)}
            </p>
            <h1 className="mt-2 font-display text-[30px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              {t('contact.title', lang)}
            </h1>
            <p className="mt-3 font-sans text-[15px] text-emerald-100/90 max-w-xl">
              {t('contact.subtitle', lang)}
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="hidden rounded-full border border-emerald-500/70 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-emerald-200 transition-colors hover:bg-emerald-500/10 sm:inline-flex"
          >
            {t('contact.back', lang)}
          </button>
        </section>

        {/* Kartice sa kontakt podacima */}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
            <p className="mb-2 font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              {t('contact.support.title', lang)}
            </p>
            <p className="font-sans text-[15px] text-slate-50">{t('contact.support.emailLabel', lang)}</p>
            <a
              href="mailto:support@firma.com"
              className="mt-1 inline-block font-sans text-[15px] font-semibold text-emerald-300 hover:text-emerald-100"
            >
              support@firma.com
            </a>
            <p className="mt-3 font-sans text-[13px] text-slate-400">
              {t('contact.support.note', lang)}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
            <p className="mb-2 font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              {t('contact.biz.title', lang)}
            </p>
            <p className="font-sans text-[15px] text-slate-50">{t('contact.biz.emailLabel', lang)}</p>
            <a
              href="mailto:office@firma.com"
              className="mt-1 inline-block font-sans text-[15px] font-semibold text-emerald-300 hover:text-emerald-100"
            >
              office@firma.com
            </a>
            <p className="mt-3 font-sans text-[13px] text-slate-400">
              {t('contact.biz.note', lang)}
            </p>
          </div>
        </section>

        {/* Adresa / radno vreme */}
        <section className="space-y-3 rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
            {t('contact.companyDetails', lang)}
          </p>
          <p className="font-sans text-[15px] text-slate-50" style={{ whiteSpace: 'pre-line' }}>
            {t('contact.companyAddress', lang)}
          </p>
          <p className="font-sans text-[13px] text-slate-400">
            {t('contact.companyHours', lang)}
          </p>
        </section>

        {/* Kratak FAQ uz kontakt */}
        <section className="space-y-3 rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-lg shadow-emerald-500/20">
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
            {t('contact.whatToSend', lang)}
          </p>
          <div className="space-y-2 font-sans text-[13px] text-slate-300">
            <p>{t('contact.msg.payment', lang)}</p>
            <p>{t('contact.msg.rules', lang)}</p>
            <p>{t('contact.msg.biz', lang)}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
