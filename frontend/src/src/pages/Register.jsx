import { useState } from 'react';
import { register } from '../api';

const Register = ({ navigate, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(email, password);
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
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-10 lg:px-8">
        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center gap-1 text-xs text-sky-700 transition hover:text-sky-900"
        >
          <span className="text-sky-500">←</span> Nazad na sajt
        </button>

        <div className="grid w-full max-w-xl gap-10 md:grid-cols-[1.1fr,0.9fr]">
          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                Napravite nalog za funded račun
              </h1>
              <p className="text-xs text-slate-600">
                Unesite email koji redovno proveravate. Ovaj login koristite za pristup dashboard‑u
                i podacima o isplatama.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Email</label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="email"
                  placeholder="vi@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Lozinka</label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  type="password"
                  placeholder="Min. 8 karaktera"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md hover:-translate-y-[1px]"
              >
                Napravi nalog
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-500">
              Kreiranjem naloga prihvatate osnovna pravila rizika i isplata koja će biti prikazana
              u vašem dashboard‑u.
            </p>

            <p className="mt-4 text-xs text-slate-600">
              Već imate nalog?{' '}
              <button
                className="font-medium text-sky-700 transition hover:text-sky-900"
                onClick={() => navigate('/login')}
              >
                Prijava
              </button>
            </p>
          </div>

          {/* Side block */}
          <div className="hidden flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-700 shadow-sm md:flex">
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-600">
                Šta se dešava nakon registracije
              </p>
              <p className="text-xs text-slate-600">
                Nakon registracije možete da se prijavite, izaberete plan i završite jednokratnu
                uplatu karticom ili kriptom. U dashboard‑u ćete videti kada je vaš funded nalog
                aktivan.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-medium text-slate-900">Brze napomene</p>
              <ul className="space-y-1 text-[11px] text-slate-600">
                <li>• Kasnije možete preći na veći plan.</li>
                <li>• Isti login se koristi za praćenje naloga i isplate.</li>
                <li>• Gašenje naloga možete zatražiti iz dashboard‑a u bilo kom trenutku.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
