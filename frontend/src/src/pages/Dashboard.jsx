import { useEffect, useState } from 'react';
import { getMe, getCashoutStatus, requestCashout } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Dashboard = ({ navigate, token, onLogout }) => {
  const [user, setUser] = useState(null);
  const [cashout, setCashout] = useState({ status: 'none', requestedAt: null, loading: false, error: '' });
  const lang = getLang();
  const effectiveToken = token || (typeof localStorage !== 'undefined' ? localStorage.getItem('token') : '');

  useEffect(() => {
    if (!effectiveToken) {
      navigate('/login');
      return;
    }
    (async () => {
      try {
        const res = await getMe(effectiveToken);
        setUser(res.user);
        try {
          const co = await getCashoutStatus(effectiveToken);
          setCashout((prev) => ({ ...prev, status: co.status || 'none', requestedAt: co.requestedAt || null }));
        } catch (coErr) {
          console.error(coErr);
        }
      } catch (e) {
        console.error(e);
        onLogout();
      }
    })();
  }, [effectiveToken, navigate, onLogout]);

  const handleCashout = async () => {
    if (!hasPlan) return;
    setCashout((prev) => ({ ...prev, loading: true, error: '' }));
    try {
      const res = await requestCashout(token);
      setCashout({ status: res.status || 'pending', requestedAt: res.requestedAt || new Date().toISOString(), loading: false, error: '' });
    } catch (err) {
      setCashout((prev) => ({ ...prev, loading: false, error: err.message || 'Cashout request error' }));
    }
  };

  if (!effectiveToken) return null;

  const hasPlan = !!user?.currentPlan;

  const pricePaid = user?.currentPlan?.price;
  const balance =
    user?.currentPlan?.balance ??
    (pricePaid === 300
      ? 5000
      : pricePaid === 500
        ? 10000
        : (pricePaid || 0));
  const activePlanName = pricePaid === 300
    ? 'Investment Account with €5.000'
    : pricePaid === 500
      ? 'Investment Account with €10.000'
      : user?.currentPlan?.name;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={effectiveToken} onLogout={onLogout} />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:pt-8 lg:px-8 flex-1">
        {/* Main grid */}
        <main className="grid gap-7 md:grid-cols-[1.8fr,1.2fr]">
          {/* Levo: balans + pregled */}
          <section className="space-y-6">
            {/* Balans - FIX: € umesto $ */}
            <div className="rounded-3xl border border-sky-800/60 bg-gradient-to-r from-[#02110b] via-black to-[#02110b] p-6 shadow-lg shadow-sky-500/20">
              <p className="font-display text-[12px] uppercase tracking-[0.22em] text-sky-300">
                {t('dashboard.balance', lang)}
              </p>
              <p className="mt-3 font-display text-[32px] sm:text-[36px] font-extrabold tracking-[0.08em] text-sky-300">
                {balance.toLocaleString('de-DE')} €
              </p>
              <p className="mt-1 font-sans text-[12px] text-sky-100/90">
                {t('dashboard.balanceDescription', lang)}
              </p>
            </div>

            {/* Pregled naloga */}
            <div className="rounded-3xl border border-sky-800/60 bg-black/80 p-6 shadow-xl shadow-sky-500/20">
              <div className="mb-5 flex items-center justify-end gap-3">
                <StatusBadge hasPlan={hasPlan} />
              </div>

              <div className="space-y-4 font-sans text-[15px] text-slate-100/90">
                <div>
                  <p className="text-[11px] text-slate-400">{t('dashboard.email', lang)}</p>
                  <p className="mt-0.5 font-medium text-slate-50">{user?.email}</p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">{t('dashboard.plan', lang)}</p>
                  {hasPlan ? (
                    <div className="mt-1 space-y-1">
                      <p className="font-medium text-slate-50">
                        {balance.toLocaleString('de-DE')}€
                      </p>
                    </div>
                  ) : (
                    <p className="mt-0.5 text-[14px] text-slate-400">
                      {t('dashboard.noActivePlan', lang)}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/#plans')}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_18px_rgba(56,189,248,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400"
                >
                  {hasPlan ? t('dashboard.upgradePlan', lang) : t('dashboard.buyPlan', lang)}
                  <span>→</span>
                </button>
                <button
                  onClick={handleCashout}
                  disabled={!hasPlan || cashout.loading || cashout.status === 'pending'}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-500/70 px-5 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-sky-200 transition-all duration-200 hover:bg-sky-500/10 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {cashout.status === 'pending' ? t('dashboard.cashOutPending', lang) : t('dashboard.cashOut', lang)}
                  <span>↗</span>
                </button>
                {cashout.status === 'pending' && cashout.requestedAt && (
                  <p className="text-[11px] font-sans text-sky-300">
                    {t('dashboard.requestSent', lang)} {new Date(cashout.requestedAt).toLocaleString()}
                  </p>
                )}
                {cashout.error && (
                  <p className="text-[11px] font-sans text-red-400">{cashout.error}</p>
                )}
              </div>
            </div>
          </section>

          {/* Desno: kratke info kartice */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-sky-800/60 bg-black/80 p-6 text-slate-100 shadow-lg shadow-sky-500/20">
              <h3 className="mb-2 font-display text-[15px] font-semibold tracking-[0.08em] uppercase text-sky-300">
                {t('dashboardInfo.payments', lang)}
              </h3>
              <ul className="space-y-1.5 font-sans text-[13px] text-slate-300">
                <li>• {t('dashboardInfo.noCardsSaved', lang)}</li>
                <li>• {t('dashboardInfo.encryptedTransactions', lang)}</li>
                <li>• {t('dashboardInfo.activationTime', lang)}</li>
                <li>• {t('dashboardInfo.paymentSupport', lang)}</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-sky-800/60 bg-black/80 p-6 text-slate-100 shadow-lg shadow-sky-500/20">
              <h3 className="mb-2 font-display text-[15px] font-semibold tracking-[0.08em] uppercase text-sky-300">
                {t('dashboardInfo.nextSteps', lang)}
              </h3>
              <ul className="space-y-1.5 font-sans text-[13px] text-slate-300">
                <li>• {t('dashboardInfo.refreshPage', lang)}</li>
                <li>• {t('dashboardInfo.keepEmailUpdated', lang)}</li>
              </ul>
            </div>
          </aside>
        </main>

        {/* Logout Button */}
        <div className="flex justify-center mt-12 pb-8">
          <button
            onClick={onLogout}
            className="rounded-full border border-red-500/80 px-6 py-2 text-[13px] font-sans uppercase tracking-[0.14em] text-red-300 transition-all duration-200 hover:bg-red-600/10 hover:-translate-y-[1px]"
          >
            {t('nav.logout', lang)}
          </button>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

const StatusBadge = ({ hasPlan }) => {
  const lang = getLang();
  if (hasPlan) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-[12px] font-sans font-medium text-sky-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
        {t('dashboard.funded.active', lang)}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-[12px] font-sans font-medium text-slate-300">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
      {t('dashboard.funded.noPlan', lang)}
    </div>
  );
};

export default Dashboard;


