import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Contact = ({ navigate, token, onLogout }) => {
  const lang = getLang();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <main className="relative mx-auto max-w-6xl px-4 pt-2 pb-12 space-y-8 flex-1">
        {/* Header */}
        <section className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-[12px] uppercase tracking-[0.26em] text-sky-400">
              {t('contact.section', lang)}
            </p>
            <h1 className="mt-2 font-display text-[30px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              {t('contact.title', lang)}
            </h1>
            <p className="mt-3 font-sans text-[15px] text-sky-100/90 max-w-xl">
              {t('contact.subtitle', lang)}
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="hidden rounded-full border border-sky-500/70 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-sky-200 transition-colors hover:bg-sky-500/10 sm:inline-flex"
          >
            {t('contact.back', lang)}
          </button>
        </section>

        {/* Contact Form Section */}
        <section className="rounded-3xl border border-sky-800/60 bg-black/80 p-8 shadow-lg shadow-sky-500/20">
          <ContactForm />
        </section>

      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export default Contact;


