import React, { useState } from 'react';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const ContactForm = () => {
  const lang = getLang();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contactForm.validationName', lang);
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contactForm.validationEmail', lang);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contactForm.validationEmail', lang);
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contactForm.validationSubject', lang);
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contactForm.validationMessage', lang);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setResult({
          type: 'success',
          title: t('contactForm.successTitle', lang),
          message: t('contactForm.successMessage', lang)
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        // Auto-hide success message after 5 seconds
        setTimeout(() => setResult(null), 5000);
      } else {
        setResult({
          type: 'error',
          title: t('contactForm.errorTitle', lang),
          message: t('contactForm.errorMessage', lang)
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setResult({
        type: 'error',
        title: t('contactForm.errorTitle', lang),
        message: t('contactForm.errorMessage', lang)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Form Header */}
      <div className="text-center mb-8">
        <h2 className="font-display text-[24px] sm:text-[28px] font-extrabold tracking-[0.12em] uppercase text-slate-50 mb-2">
          {t('contactForm.title', lang)}
        </h2>
        <p className="font-sans text-[14px] sm:text-[15px] text-emerald-100/90">
          {t('contactForm.subtitle', lang)}
        </p>
      </div>

      {/* Result Message */}
      {result && (
        <div className={`mb-6 rounded-2xl p-4 border ${
          result.type === 'success' 
            ? 'border-emerald-500/50 bg-emerald-500/10' 
            : 'border-red-500/50 bg-red-500/10'
        }`}>
          <h3 className={`font-display text-[14px] font-semibold tracking-[0.08em] uppercase ${
            result.type === 'success' ? 'text-emerald-300' : 'text-red-300'
          }`}>
            {result.title}
          </h3>
          <p className={`font-sans text-[13px] mt-1 ${
            result.type === 'success' ? 'text-emerald-200' : 'text-red-200'
          }`}>
            {result.message}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block font-sans text-[13px] font-semibold tracking-[0.08em] uppercase text-emerald-300 mb-2">
            {t('contactForm.name', lang)}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-2xl border bg-black/60 px-4 py-3 font-sans text-[14px] text-slate-50 outline-none transition-all ${
              errors.name
                ? 'border-red-500/70 focus:border-red-400'
                : 'border-emerald-700/50 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30'
            }`}
            placeholder={lang === 'sr' ? 'Marko Marković' : 'John Doe'}
          />
          {errors.name && (
            <p className="mt-1 font-sans text-[12px] text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block font-sans text-[13px] font-semibold tracking-[0.08em] uppercase text-emerald-300 mb-2">
            {t('contactForm.email', lang)}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-2xl border bg-black/60 px-4 py-3 font-sans text-[14px] text-slate-50 outline-none transition-all ${
              errors.email
                ? 'border-red-500/70 focus:border-red-400'
                : 'border-emerald-700/50 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30'
            }`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-1 font-sans text-[12px] text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label className="block font-sans text-[13px] font-semibold tracking-[0.08em] uppercase text-emerald-300 mb-2">
            {t('contactForm.subject', lang)}
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t('contactForm.subjectPlaceholder', lang)}
            className={`w-full rounded-2xl border bg-black/60 px-4 py-3 font-sans text-[14px] text-slate-50 outline-none transition-all ${
              errors.subject
                ? 'border-red-500/70 focus:border-red-400'
                : 'border-emerald-700/50 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30'
            }`}
          />
          {errors.subject && (
            <p className="mt-1 font-sans text-[12px] text-red-400">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label className="block font-sans text-[13px] font-semibold tracking-[0.08em] uppercase text-emerald-300 mb-2">
            {t('contactForm.message', lang)}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('contactForm.messagePlaceholder', lang)}
            rows="5"
            className={`w-full rounded-2xl border bg-black/60 px-4 py-3 font-sans text-[14px] text-slate-50 outline-none resize-none transition-all ${
              errors.message
                ? 'border-red-500/70 focus:border-red-400'
                : 'border-emerald-700/50 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/30'
            }`}
          />
          {errors.message && (
            <p className="mt-1 font-sans text-[12px] text-red-400">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-3.5 font-sans font-semibold uppercase tracking-[0.16em] text-black transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] hover:-translate-y-0.5"
        >
          {loading ? t('contactForm.sending', lang) : t('contactForm.submit', lang)}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
