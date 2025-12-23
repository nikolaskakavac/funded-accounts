  import { useState } from 'react';
  import { register } from '../api';
  import Header from '../components/Header';

  const Register = ({ navigate, onRegister, onLogout }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(email, password);
      console.log('REGISTER RES', res); // <-- dodaj
      if (res.token && res.user) {
        onRegister(res);
      } else {
        alert(res.message || 'Registracija nije uspela');
      }
    } catch (e) {
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
            Nazad na sajt
          </button>

          <div className="grid w-full max-w-3xl gap-8 md:grid-cols-[1.1fr,0.9fr]">
            {/* Form */}
            <div className="rounded-3xl border border-emerald-700/60 bg-black/80 p-7 shadow-xl shadow-emerald-500/20">
              <div className="mb-6 space-y-2">
                <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400">
                  Kreiranje naloga
                </p>
                <h1 className="font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
                  Napravi pristup funded nalogu
                </h1>
                <p className="font-sans text-[14px] sm:text-[15px] text-emerald-100/90 leading-relaxed">
                  Unesi email koji redovno proveravaš. Ovaj login koristiš za pristup
                  dashboard‑u, praćenje plana i isplata.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-sans text-[13px] font-medium text-emerald-100">
                    Email
                  </label>
                  <input
                    className="w-full rounded-2xl border border-emerald-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition
                              placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    type="email"
                    placeholder="ti@primer.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-[13px] font-medium text-emerald-100">
                    Lozinka
                  </label>
                  <input
                    className="w-full rounded-2xl border border-emerald-700 bg-black/60 px-3.5 py-2.5 text-[14px] font-sans text-slate-50 outline-none transition
                              placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    type="password"
                    placeholder="Min. 8 karaktera"
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
                  Napravi nalog
                </button>
              </form>

              <p className="mt-5 font-sans text-[13px] text-slate-400">
                Kreiranjem naloga prihvataš osnovna pravila rizika i isplata koja će biti
                prikazana u tvom dashboard‑u.
              </p>

              <p className="mt-3 font-sans text-[13px] text-slate-400">
                Već imaš nalog?{' '}
                <button
                  className="font-semibold text-emerald-300 hover:text-emerald-100 transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Prijava
                </button>
              </p>
            </div>

            {/* Side block */}
            <div className="hidden flex-col justify-between rounded-3xl border border-emerald-800/60 bg-gradient-to-b from-black via-[#02110b] to-black p-6 text-xs text-slate-200 shadow-lg shadow-emerald-500/10 md:flex">
              <div className="space-y-3">
                <p className="font-display text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                  Posle registracije
                </p>
                <p className="font-sans text-[13px] text-emerald-100/90 leading-relaxed">
                  Nakon registracije možeš odmah da se prijaviš, izabereš plan i završiš
                  jednokratnu uplatu karticom ili kriptom. Status naloga pratiš kroz
                  klijent dashboard.
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="font-display text-[12px] uppercase tracking-[0.16em] text-emerald-300">
                  Brze napomene
                </p>
                <ul className="space-y-1 font-sans text-[12px] text-slate-300">
                  <li>• Kasnije uvek možeš da pređeš na veći plan.</li>
                  <li>• Isti login koristiš za praćenje naloga i isplata.</li>
                  <li>• Gašenje naloga tražiš direktno iz dashboard‑a.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Register;
