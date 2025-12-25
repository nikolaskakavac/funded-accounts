  import { useState } from 'react';
  import { register } from '../api';
  import Header from '../components/Header';
  import { t } from '../utils/translations';
  import { getLang } from '../utils/lang';

  const Register = ({ navigate, onRegister, onLogout }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const lang = getLang();
  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting registration...');
      const res = await register(email, password, firstName, lastName);
      console.log('Registration response:', res);
      if (res.token && res.user) {
        console.log('Calling onRegister...');
        onRegister(res);
      } else {
        console.log('Registration failed:', res.message);
        alert(res.message || 'Registracija nije uspela');
      }
    } catch (e) {
      console.log('Registration error:', e);
      alert('Greška pri registraciji');
    }
  };


    return (
      <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
        <Header navigate={navigate} token={''} onLogout={onLogout} />
        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-10 lg:px-8">
          {/* Back link */}
          <button
            onClick={() => navigate('/')}
            className="mb-8 inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] text-emerald-300 transition hover:text-emerald-100"
          >
            <span className="text-emerald-400 text-sm">←</span>
            {t('register.back', lang)}
          </button>

          <div className="grid w-full max-w-3xl gap-8 md:grid-cols-[1.1fr,0.9fr]">
            {/* Form */}
            <div className="rounded-3xl border border-emerald-700/60 bg-black/80 p-7 shadow-xl shadow-emerald-500/20">
              <div className="mb-6 space-y-2">
                <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400">
                  {t('register.create', lang)}
                </p>
                <h1 className="font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
                  {t('register.title', lang)}
                </h1>
                <p className="font-sans text-[14px] sm:text-[15px] text-emerald-100/90 leading-relaxed">
                  {t('register.subtitle', lang)}
                </p>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[13px] font-medium text-emerald-100">{t('register.firstName', lang)}</label>
                    <input
                      className="w-full rounded-2xl border border-emerald-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      type="text"
                      placeholder={t('register.firstNamePlaceholder', lang)}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[13px] font-medium text-emerald-100">{t('register.lastName', lang)}</label>
                    <input
                      className="w-full rounded-2xl border border-emerald-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                      type="text"
                      placeholder={t('register.lastNamePlaceholder', lang)}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-[13px] font-medium text-emerald-100">{t('register.email', lang)}</label>
                  <input
                    className="w-full rounded-2xl border border-emerald-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    type="email"
                    placeholder={t('register.emailPlaceholder', lang)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-[13px] font-medium text-emerald-100">{t('register.password', lang)}</label>
                  <input
                    className="w-full rounded-2xl border border-emerald-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition
                              placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    type="password"
                    placeholder={t('register.passwordPlaceholder', lang)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5
                            text-[14px] sm:text-[15px] font-sans font-semibold uppercase tracking-[0.16em] text-black
                            shadow-[0_0_20px_rgba(16,185,129,0.7)]
                            transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
                >
                  {t('register.submit', lang)}
                </button>
              </form>

              <p className="mt-5 font-sans text-[13px] text-slate-400">
                {t('register.terms', lang)}
              </p>

              <p className="mt-3 font-sans text-[13px] text-slate-400">
                {t('register.haveAccount', lang)}{' '}
                <button
                  className="font-semibold text-emerald-300 hover:text-emerald-100 transition-colors"
                  onClick={() => navigate('/login')}
                >
                  {t('register.loginCta', lang)}
                </button>
              </p>
            </div>

            {/* Side block */}
            <div className="hidden flex-col justify-between rounded-3xl border border-emerald-800/60 bg-gradient-to-b from-black via-[#02110b] to-black p-6 text-xs text-slate-200 shadow-lg shadow-emerald-500/10 md:flex">
              <div className="space-y-3">
                <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                  {t('register.after.title', lang)}
                </p>
                <p className="font-sans text-[13px] text-emerald-100/90 leading-relaxed">
                  {t('register.after.desc', lang)}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="font-display text-[12px] uppercase tracking-[0.16em] text-emerald-300">
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
      </div>
    );
  };

  export default Register;
