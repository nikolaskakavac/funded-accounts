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
  const balance = user?.currentPlan?.balance || user?.currentPlan?.price || 0;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Klijent dashboard
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Pregled funded naloga, aktivnog plana i informacija o plaćanjima na jednom mestu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/pricing')}
              className="hidden rounded-full border border-sky-500/70 px-3 py-1.5 text-xs text-sky-700 transition-all duration-200 hover:bg-sky-50 hover:-translate-y-[1px] sm:inline-flex"
            >
              Pogledaj planove
            </button>
            <button
              onClick={onLogout}
              className="rounded-full border border-red-500/70 px-3 py-1.5 text-xs font-medium text-red-600 transition-all duration-200 hover:bg-red-50 hover:-translate-y-[1px]"
            >
              Odjava
            </button>
          </div>
        </header>

        {/* Main grid */}
        <main className="grid gap-6 md:grid-cols-[1.8fr,1.2fr]">
          {/* Levo: pregled naloga + balans */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Pregled naloga</h2>
                  <p className="text-xs text-slate-500">
                    Osnovni podaci o vašem klijentskom profilu i funded statusu.
                  </p>
                </div>
                <StatusBadge hasPlan={hasPlan} />
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="mt-0.5 font-medium text-slate-900">{user?.email}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Trenutni plan</p>
                  {hasPlan ? (
                    <div className="mt-1 space-y-1 text-sm">
                      <p className="font-medium text-slate-900">
                        {user.currentPlan.name}{' '}
                        {user.currentPlan.balance && (
                          <span className="text-xs text-slate-500">
                            ({user.currentPlan.balance})
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">
                        Jednokratna naknada:{' '}
                        <span className="font-medium text-emerald-600">
                          ${user.currentPlan.price}{' '}
                          <span className="text-[10px] uppercase text-slate-500">
                            {user.currentPlan.currency}
                          </span>
                        </span>
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Aktivan funded plan
                      </span>
                    </div>
                  ) : (
                    <p className="mt-0.5 text-sm text-slate-500">
                      Još uvek nemate aktivan plan.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/pricing')}
                  className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md hover:-translate-y-[1px]"
                >
                  {hasPlan ? 'Nadogradi plan' : 'Kupi funded nalog'}
                  <span>→</span>
                </button>
                <p className="text-[11px] text-slate-500">
                  Nadogradnja zadržava vaš postojeći login i istoriju.
                </p>
              </div>
            </div>

            {/* Balance blok */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                BALANS
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              {hasPlan ? (
                <p className="mt-1 text-[11px] text-slate-500">
                  Na osnovu vašeg aktivnog funded naloga.
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-slate-500">
                  Još uvek nemate aktivan funded nalog.
                </p>
              )}
            </div>
          </section>

          {/* Desno: plaćanja / info */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-700 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Plaćanja i bezbednost
              </h3>
              <p className="text-xs text-slate-600">
                Kartična plaćanja idu preko Stripe‑a, dok kripto uplate obrađuje NOWPayments.
                Oba provajdera na svojoj strani rešavaju PCI i bezbednost novčanika.
              </p>
              <ul className="mt-3 space-y-1.5 text-[11px] text-slate-600">
                <li>• Nikada ne čuvamo vaše kompletne podatke o kartici.</li>
                <li>• Kripto računi imaju vremensko ograničenje; istekle linkove treba regenerisati.</li>
                <li>• Aktivacija plana može potrajati nekoliko minuta nakon uspešne uplate.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-700 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Sledeći koraci
              </h3>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li>
                  • Ako ne vidite aktivan plan nakon plaćanja, osvežite stranicu i proverite ponovo
                  za par minuta.
                </li>
                <li>• Držite email ažuriranim zbog obaveštenja o isplatama i statusu naloga.</li>
                <li>• Putem podrške možete tražiti nadogradnju, smanjenje ili gašenje naloga.</li>
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
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
        Funded status: Aktivan
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Funded status: Nije aktivan
    </div>
  );
};

export default Dashboard;
