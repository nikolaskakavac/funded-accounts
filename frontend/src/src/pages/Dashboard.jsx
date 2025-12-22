import { useEffect, useState } from 'react';
import { getMe } from '../api';

const Dashboard = ({ navigate, token, onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    (async () => {
      try {
        const res = await getMe(token);
        setUser(res.user);
      } catch (e) {
        console.error(e);
        onLogout();
      }
    })();
  }, [token, navigate, onLogout]);

  if (!token) return null;

  const hasPlan = !!user?.currentPlan;
  const isAdmin = user?.role === 'admin' || user?.isAdmin;
  const balance = user?.currentPlan?.balance || user?.currentPlan?.price || 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <div className="mx-auto max-w-6xl pb-16 pt-8 lg:px-8">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
              Klijent zona
            </p>
            <h1 className="mt-1 font-display text-[30px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              Dashboard
            </h1>
            <p className="mt-2 font-sans text-[15px] text-emerald-100/90">
              Pregled naloga, plana i balansa.
            </p>
          </div>
<div className="flex items-center gap-3">
  {isAdmin && (
    <button
      onClick={() => navigate('/admin')}
      className="rounded-full border border-emerald-500/80 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-emerald-300 transition-all duration-200 hover:bg-emerald-500/10 hover:-translate-y-[1px]"
    >
      Admin panel
    </button>
  )}

  <button
    onClick={() => navigate('/pricing')}
    className="hidden rounded-full border border-emerald-500/70 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-emerald-200 transition-all duration-200 hover:bg-emerald-500/10 hover:-translate-y-[1px] sm:inline-flex"
  >
    Planovi
  </button>
  <button
    onClick={onLogout}
    className="rounded-full border border-red-500/80 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-red-300 transition-all duration-200 hover:bg-red-600/10 hover:-translate-y-[1px]"
  >
    Odjava
  </button>
</div>

        </header>

        {/* Main grid */}
        <main className="grid gap-7 md:grid-cols-[1.8fr,1.2fr]">
          {/* Levo: pregled + balans */}
          <section className="space-y-6">
            {/* Pregled naloga */}
            <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-xl shadow-emerald-500/20">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-[20px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
                    Nalog
                  </h2>
                  <p className="mt-1 font-sans text-[14px] text-emerald-100/90">
                    Tvoj email i funded status.
                  </p>
                </div>
                <StatusBadge hasPlan={hasPlan} />
              </div>

              <div className="space-y-4 font-sans text-[15px] text-slate-100/90">
                <div>
                  <p className="text-[11px] text-slate-400">Email</p>
                  <p className="mt-0.5 font-medium text-slate-50">{user?.email}</p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">Plan</p>
                  {hasPlan ? (
                    <div className="mt-1 space-y-1">
                      <p className="font-medium text-slate-50">
                        {user.currentPlan.name}{' '}
                        {user.currentPlan.balance && (
                          <span className="text-[11px] text-slate-400">
                            ({user.currentPlan.balance})
                          </span>
                        )}
                      </p>
                      <p className="text-[12px] text-slate-400">
                        Plaćeno:{' '}
                        <span className="font-medium text-emerald-400">
                          ${user.currentPlan.price}{' '}
                          <span className="text-[10px] uppercase text-slate-500">
                            {user.currentPlan.currency}
                          </span>
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="mt-0.5 text-[14px] text-slate-400">
                      Trenutno nemaš aktivan plan.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/pricing')}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_18px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
                >
                  {hasPlan ? 'Nadogradi plan' : 'Kupi plan'}
                  <span>→</span>
                </button>
                <p className="text-[11px] font-sans text-slate-400">
                  Login ostaje isti nakon nadogradnje.
                </p>
              </div>
            </div>

            {/* Balans */}
            <div className="rounded-3xl border border-emerald-800/60 bg-gradient-to-r from-[#02110b] via-black to-[#02110b] p-6 shadow-lg shadow-emerald-500/20">
              <p className="font-display text-[12px] uppercase tracking-[0.22em] text-emerald-300">
                Balans
              </p>
              <p className="mt-3 font-display text-[32px] sm:text-[36px] font-extrabold tracking-[0.08em] text-emerald-300">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="mt-1 font-sans text-[12px] text-emerald-100/90">
                Vrednost tvog aktivnog plana.
              </p>
            </div>
          </section>

          {/* Desno: kratke info kartice */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 text-slate-100 shadow-lg shadow-emerald-500/20">
              <h3 className="mb-2 font-display text-[15px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                Plaćanja
              </h3>
              <ul className="space-y-1.5 font-sans text-[13px] text-slate-300">
                <li>• Kartice idu preko Stripe‑a, kripto preko NOWPayments.</li>
                <li>• Ne čuvamo brojeve kartica.</li>
                <li>• Aktivacija plana obično traje nekoliko minuta.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 text-slate-100 shadow-lg shadow-emerald-500/20">
              <h3 className="mb-2 font-display text-[15px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                Sledeći koraci
              </h3>
              <ul className="space-y-1.5 font-sans text-[13px] text-slate-300">
                <li>• Ako plan ne vidiš odmah, osveži stranicu posle par minuta.</li>
                <li>• Drži email ažuriranim zbog obaveštenja i isplata.</li>
                <li>• Podršku i izmene plana tražiš iz dashboard‑a.</li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

const StatusBadge = ({ hasPlan }) => {
  if (hasPlan) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[12px] font-sans font-medium text-emerald-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Funded: aktivan
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-[12px] font-sans font-medium text-slate-300">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
      Funded: nema plana
    </div>
  );
};

export default Dashboard;
