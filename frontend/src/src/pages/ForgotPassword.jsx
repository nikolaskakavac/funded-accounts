import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestPasswordReset, resetPassword } from '../api';
import { getLang } from '../utils/lang';

const ForgotPassword = ({ navigate, onLogout }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const lang = getLang();
  const copy = lang === 'nl'
    ? {
        back: 'Terug naar inloggen',
        title: 'Wachtwoord vergeten',
        intro: 'Vul je e-mailadres in en we sturen je een resetcode.',
        sent: 'Als dit e-mailadres bestaat, is er een resetcode verzonden.',
        updated: 'Wachtwoord succesvol bijgewerkt.',
        failed: 'Wachtwoord resetten mislukt.',
        emailPlaceholder: 'jij@voorbeeld.com',
        sendCode: 'Code verzenden',
        newPassword: 'Nieuw wachtwoord',
        hide: 'Verbergen',
        show: 'Tonen',
        reset: 'Wachtwoord resetten',
      }
    : {
        back: 'Back to Log in',
        title: 'Forgot Password',
        intro: 'Enter your email and we will send you a reset code.',
        sent: 'If that email exists, a reset code has been sent.',
        updated: 'Password updated successfully.',
        failed: 'Password reset failed.',
        emailPlaceholder: 'you@example.com',
        sendCode: 'Send Code',
        newPassword: 'New password',
        hide: 'Hide',
        show: 'Show',
        reset: 'Reset Password',
      };

  const requestCode = async (e) => {
    e.preventDefault();
    const res = await requestPasswordReset(email);
    setMessage(res.message || copy.sent);
    setCodeSent(true);
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    const res = await resetPassword(email, code, password);
    if (res.success) {
      setMessage(res.message || copy.updated);
      window.setTimeout(() => navigate('/login'), 1200);
    } else {
      setMessage(res.message || copy.failed);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={''} onLogout={onLogout} />
      <div className="relative mx-auto flex flex-1 max-w-5xl flex-col items-center justify-center px-4 py-16 lg:px-8">
        <div className="w-full max-w-md rounded-3xl border border-sky-700/60 bg-black/80 p-7 shadow-xl shadow-sky-500/20">
          <button
            onClick={() => navigate('/login')}
            className="mb-5 inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] text-sky-300 transition hover:text-sky-100"
          >
            {copy.back}
          </button>
          <p className="font-display text-[18px] uppercase tracking-[0.22em] text-sky-400">
            {copy.title}
          </p>
          <p className="mt-3 font-sans text-[14px] leading-relaxed text-sky-100/90">
            {copy.intro}
          </p>

          {!codeSent ? (
            <form onSubmit={requestCode} className="mt-6 space-y-4">
              <input
                className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                type="email"
                id="forgot-email"
                name="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                inputMode="email"
                placeholder={copy.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_20px_rgba(56,189,248,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400"
              >
                {copy.sendCode}
              </button>
            </form>
          ) : (
            <form onSubmit={submitNewPassword} className="mt-6 space-y-4">
              <input
                className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-center text-[20px] font-sans tracking-[0.28em] text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                type="text"
                id="password-reset-code"
                name="one-time-code"
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
              />
              <div className="relative">
                <input
                  className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 pr-20 text-[14px] font-sans text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                  type={showPassword ? 'text' : 'password'}
                  id="new-password"
                  name="new-password"
                  autoComplete="new-password"
                  placeholder={copy.newPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-sky-300 transition hover:text-sky-100"
                >
                  {showPassword ? copy.hide : copy.show}
                </button>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_20px_rgba(56,189,248,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400"
              >
                {copy.reset}
              </button>
            </form>
          )}

          {message && (
            <p className="mt-4 font-sans text-[13px] leading-relaxed text-sky-100/90">
              {message}
            </p>
          )}
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default ForgotPassword;
