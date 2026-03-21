import { useState } from 'react';
import { login } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Login = ({ navigate, onLogin, onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const lang = getLang();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res.token && res.user) {
        onLogin(res);
      } else {
        alert(res.message || 'Prijava nije uspela.');
      }
    } catch (e) {
      alert('Greška pri prijavi. Pokušajte ponovo.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={''} onLogout={onLogout} />
      <div className="relative mx-auto max-w-5xl px-4 pt-2 pb-16 lg:px-8 md:min-h-[calc(100vh-96px)] md:flex md:flex-col md:justify-center md:items-center flex-1">
        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="mb-2 inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] text-sky-300 transition hover:text-sky-100 md:self-start"
        >
          <span className="text-sky-400 text-sm">←</span>
          {t('login.back', lang)}
        </button>

        <div className="grid w-full max-w-3xl gap-8 md:grid-cols-[1.1fr,0.9fr] md:mx-auto">
          {/* Form */}
          <div className="rounded-3xl border border-sky-700/60 bg-black/80 p-7 shadow-xl shadow-sky-500/20">
            <div className="mb-6 space-y-2">
              <p className="font-display text-[18px] sm:text-[20px] uppercase tracking-[0.26em] text-sky-400 font-bold">
                {t('login.clientAccess', lang)}
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-sans text-[13px] font-medium text-sky-100">{t('login.email', lang)}</label>
                <input
                  className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition
                             placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                  type="email"
                  placeholder={t('register.emailPlaceholder', lang)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[13px] font-medium text-sky-100">{t('login.password', lang)}</label>
                <input
                  className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition
                             placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                  type="password"
                  placeholder={t('login.passwordPlaceholder', lang)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-3 flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5
                           text-[14px] sm:text-[15px] font-sans font-semibold uppercase tracking-[0.16em] text-black
                           shadow-[0_0_20px_rgba(56,189,248,0.7)]
                           transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400"
              >
                {t('login.submit', lang)}
              </button>
            </form>

            <p className="mt-5 font-sans text-[13px] text-slate-400">
              {t('login.noAccount', lang)}{' '}
              <button
                className="font-semibold text-sky-300 hover:text-sky-100 transition-colors"
                onClick={() => navigate('/register')}
              >
                {t('login.registerCta', lang)}
              </button>
            </p>
          </div>

          {/* Side block */}
          <div className="hidden flex-col justify-between rounded-3xl border border-sky-800/60 bg-gradient-to-b from-black via-[#02110b] to-black p-6 text-xs text-slate-200 shadow-lg shadow-sky-500/10 md:flex">
            <div className="space-y-3">
              <p className="font-display text-[11px] uppercase tracking-[0.2em] text-sky-300">
                  {t('login.dashboard.see', lang)}
              </p>
              <p className="font-sans text-[13px] text-sky-100/90 leading-relaxed">
                  {t('login.dashboard.desc', lang)}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="font-display text-[12px] uppercase tracking-[0.16em] text-sky-300">
                  {t('login.tips.title', lang)}
              </p>
              <ul className="space-y-1 font-sans text-[12px] text-slate-300">
                  <li>{t('login.tips.item1', lang)}</li>
                  <li>{t('login.tips.item2', lang)}</li>
                  <li>{t('login.tips.item3', lang)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default Login;


