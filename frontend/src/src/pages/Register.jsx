import { useState } from 'react';
import { register, verifyEmailCode } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';
import { authMessage } from '../utils/authMessages';

const Register = ({ navigate, onRegister, onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(
    typeof localStorage !== 'undefined' ? (localStorage.getItem('affiliateReferralCode') || '').trim().toUpperCase() : ''
  );
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const lang = getLang();

  const submit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const normalizedEmail = email.trim().toLowerCase();
    setIsSubmitting(true);

    try {
      console.log('Submitting registration...');
      const res = await register(normalizedEmail, password, '', '', referralCode);
      console.log('Registration response:', res);
      if (res.token && res.user) {
        console.log('Calling onRegister...');
        onRegister(res);
      } else if (res.needsVerification) {
        setEmail(normalizedEmail);
        setVerificationSent(true);
      } else {
        console.log('Registration failed:', res.message);
        alert(authMessage(res.message, 'Registration failed. Please try again.'));
      }
    } catch (e) {
      console.log('Registration error:', e);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmCode = async (e) => {
    e.preventDefault();
    if (isConfirming) return;

    setIsConfirming(true);
    try {
      const res = await verifyEmailCode(email.trim().toLowerCase(), verificationCode);
      if (res.token && res.user) {
        onRegister(res);
      } else {
        alert(authMessage(res.message, 'Confirmation failed.'));
      }
    } catch (e) {
      console.log('Confirmation error:', e);
      alert('Confirmation failed.');
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={''} onLogout={onLogout} />
      <div className="relative mx-auto max-w-5xl px-4 pt-2 pb-16 lg:px-8 md:min-h-[calc(100vh-96px)] md:flex md:flex-col md:justify-center md:items-center flex-1">
        <button
          onClick={() => navigate('/')}
          className="mb-2 inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] text-sky-300 transition hover:text-sky-100 md:self-start"
        >
          <span className="text-sky-400 text-sm">&larr;</span>
          {t('register.back', lang)}
        </button>

        <div className="grid w-full max-w-3xl gap-8 md:grid-cols-[1.1fr,0.9fr] md:mx-auto">
          <div className="rounded-3xl border border-sky-700/60 bg-black/80 p-7 shadow-xl shadow-sky-500/20">
            {verificationSent ? (
              <div className="space-y-4 text-center">
                <p className="font-display text-[18px] sm:text-[20px] uppercase tracking-[0.22em] text-sky-400 font-bold">
                  Confirm account
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-sky-100/90">
                  We sent a confirmation code to <span className="font-semibold text-sky-300">{email}</span>.
                  Enter it below to create your account.
                </p>
                <form onSubmit={confirmCode} className="space-y-4">
                  <input
                    className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-center text-[20px] font-sans tracking-[0.28em] text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    type="text"
                    id="register-confirmation-code"
                    name="one-time-code"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isConfirming}
                    className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_20px_rgba(56,189,248,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isConfirming ? 'Confirming...' : 'Confirm Account'}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="mb-6 space-y-2">
                  <p className="font-display text-[18px] sm:text-[20px] uppercase tracking-[0.26em] text-sky-400 font-bold">
                    {t('register.create', lang)}
                  </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[13px] font-medium text-sky-100">{t('register.email', lang)}</label>
                    <input
                    className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    type="email"
                    id="register-email"
                    name="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    inputMode="email"
                    placeholder={t('register.emailPlaceholder', lang)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-[13px] font-medium text-sky-100">{t('register.password', lang)}</label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 pr-20 text-[14px] font-sans text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                        type={showPassword ? 'text' : 'password'}
                        id="register-password"
                        name="new-password"
                        autoComplete="new-password"
                        placeholder={t('register.passwordPlaceholder', lang)}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-sky-300 transition hover:text-sky-100"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-[13px] font-medium text-sky-100">Referral code (optional)</label>
                    <input
                      className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                      type="text"
                      id="register-referral-code"
                      name="referral-code"
                      autoComplete="off"
                      placeholder="Enter referral code"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-3 flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5 text-[14px] sm:text-[15px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_20px_rgba(56,189,248,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? 'Sending code...' : t('register.submit', lang)}
                  </button>
                </form>

                <p className="mt-3 font-sans text-[13px] text-slate-400">
                  {t('register.haveAccount', lang)}{' '}
                  <button
                    className="font-semibold text-sky-300 hover:text-sky-100 transition-colors"
                    onClick={() => navigate('/login')}
                  >
                    {t('register.loginCta', lang)}
                  </button>
                </p>
              </>
            )}
          </div>

          <div className="hidden flex-col justify-between rounded-3xl border border-sky-800/60 bg-gradient-to-b from-black via-[#02110b] to-black p-6 text-xs text-slate-200 shadow-lg shadow-sky-500/10 md:flex">
            <div className="space-y-3">
              <p className="font-display text-[11px] uppercase tracking-[0.2em] text-sky-300">
                {t('register.after.title', lang)}
              </p>
              <p className="font-sans text-[13px] text-sky-100/90 leading-relaxed">
                {t('register.after.desc', lang)}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="font-display text-[12px] uppercase tracking-[0.16em] text-sky-300">
                {t('register.notes.title', lang)}
              </p>
              <ul className="space-y-1 font-sans text-[12px] text-slate-300">
                <li>{t('register.notes.item1', lang)}</li>
                <li>{t('register.notes.item2', lang)}</li>
                <li>{t('register.notes.item3', lang)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default Register;
