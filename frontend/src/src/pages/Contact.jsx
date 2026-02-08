import React, { useState } from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';
import { submitWhatsAppRequest } from '../api';

const Contact = ({ navigate, token, onLogout }) => {
  const lang = getLang();
  const [whatsappPhone, setWhatsappPhone] = useState('+');
  const [whatsappSubmitting, setWhatsappSubmitting] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('');

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    if (!whatsappPhone || whatsappPhone.trim().length < 5) {
      setWhatsappMessage(t('whatsapp.error', lang));
      return;
    }

    setWhatsappSubmitting(true);
    setWhatsappMessage('');

    try {
      await submitWhatsAppRequest(whatsappPhone);
      setWhatsappMessage(t('whatsapp.success', lang));
      setWhatsappPhone('+');
    } catch (err) {
      setWhatsappMessage(t('whatsapp.error', lang));
    } finally {
      setWhatsappSubmitting(false);
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Allow only numbers and + at the beginning
    // Remove all non-numeric characters except +
    value = value.replace(/[^\d+]/g, '');
    
    // Ensure + is only at the start
    if (value.includes('+')) {
      const plusCount = (value.match(/\+/g) || []).length;
      if (plusCount > 1 || value.indexOf('+') !== 0) {
        // Remove all + and add one at the start
        value = '+' + value.replace(/\+/g, '');
      }
    } else if (!value.startsWith('+') && value.length > 0) {
      // Add + at the beginning if not present
      value = '+' + value;
    }
    
    setWhatsappPhone(value);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <main className="relative mx-auto max-w-6xl px-4 py-14 space-y-14">
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

        {/* Contact Form Section */}
        <section className="rounded-3xl border border-emerald-800/60 bg-black/80 p-8 shadow-lg shadow-emerald-500/20">
          <ContactForm />
        </section>

        {/* WhatsApp Call Request */}
        <section className="relative bg-gradient-to-b from-black via-emerald-950 to-black rounded-3xl border-2 border-emerald-500/40 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="font-display text-[24px] sm:text-[28px] font-extrabold uppercase tracking-[0.18em] text-emerald-400 mb-3">
                {t('whatsapp.title', lang)}
              </h2>
              <p className="font-sans text-[16px] leading-relaxed text-emerald-100/90 mb-8 max-w-xl mx-auto">
                {t('whatsapp.description', lang)}
              </p>
              
              <form onSubmit={handleWhatsAppSubmit} className="max-w-sm mx-auto">
                <div className="space-y-4">
                  <input
                    type="tel"
                    value={whatsappPhone}
                    onChange={handlePhoneChange}
                    placeholder={t('whatsapp.placeholder', lang)}
                    pattern="\+[0-9]+"
                    title="Phone number must start with + followed by digits only"
                    className="w-full rounded-2xl border-2 border-emerald-500/60 bg-black/80 px-6 py-4 text-[17px] font-medium text-center text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/40 shadow-lg shadow-emerald-500/10 transition-all"
                    disabled={whatsappSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={whatsappSubmitting}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-4 text-[15px] font-sans font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_24px_rgba(16,185,129,0.8)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(16,185,129,1)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {whatsappSubmitting ? '...' : t('whatsapp.submit', lang)}
                  </button>
                </div>
                {whatsappMessage && (
                  <p className={`mt-4 text-center text-[15px] font-medium ${whatsappMessage.includes('Hvala') || whatsappMessage.includes('Thank') || whatsappMessage.includes('Bedankt') ? 'text-emerald-300' : 'text-red-400'}`}>
                    {whatsappMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
