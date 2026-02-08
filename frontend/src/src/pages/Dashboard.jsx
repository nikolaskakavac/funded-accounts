import { useEffect, useState } from 'react';
import { getMe, getCashoutStatus, requestCashout, submitWhatsAppRequest } from '../api';
import Header from '../components/Header';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Dashboard = ({ navigate, token, onLogout }) => {
  const [user, setUser] = useState(null);
  const [cashout, setCashout] = useState({ status: 'none', requestedAt: null, loading: false, error: '' });
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [whatsappSubmitting, setWhatsappSubmitting] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('');
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

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    if (!whatsappPhone || whatsappPhone.trim().length < 5) {
      setWhatsappMessage(t('whatsapp.error', lang));
      return;
    }

    setWhatsappSubmitting(true);
    setWhatsappMessage('');

    try {
      await submitWhatsAppRequest(whatsappPhone);
      setWhatsappMessage(t('whatsapp.success', lang));
      setWhatsappPhone('');
    } catch (err) {
      setWhatsappMessage(t('whatsapp.error', lang));
    } finally {
      setWhatsappSubmitting(false);
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Allow only numbers and + at the beginning
    // Remove all non-numeric characters except +
    value = value.replace(/[^\d+]/g, '');
    
    // Ensure + is only at the start
    if (value.includes('+')) {
      const plusCount = (value.match(/\+/g) || []).length;
      if (plusCount > 1 || value.indexOf('+') !== 0) {
        // Remove all + and add one at the start
        value = '+' + value.replace(/\+/g, '');
      }
    } else if (!value.startsWith('+') && value.length > 0) {
      // Add + at the beginning if not present
      value = '+' + value;
    }
    
    setWhatsappPhone(value);
  };

  if (!effectiveToken) return null;

  const hasPlan = !!user?.currentPlan;

  const pricePaid = user?.currentPlan?.price;
  const balance =
    user?.currentPlan?.balance ??
    (pricePaid === 300
      ? 10000
      : pricePaid === 600
        ? 20000
        : (pricePaid || 0));

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <Header navigate={navigate} token={effectiveToken} onLogout={onLogout} />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:pt-8 lg:px-8">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
              {t('dashboard.clientZone', lang)}
            </p>
            <h1 className="mt-1 font-display text-[30px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              {t('dashboard.title', lang)}
            </h1>
            <p className="mt-2 font-sans text-[15px] text-emerald-100/90">
              {t('dashboard.description', lang)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/#plans')}
              className="hidden rounded-full border border-emerald-500/70 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-emerald-200 transition-all duration-200 hover:bg-emerald-500/10 hover:-translate-y-[1px] sm:inline-flex"
            >
              {t('nav.plans', lang)}
            </button>
            <button
              onClick={onLogout}
              className="rounded-full border border-red-500/80 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-red-300 transition-all duration-200 hover:bg-red-600/10 hover:-translate-y-[1px]"
            >
              {t('nav.logout', lang)}
            </button>
          </div>
        </header>

        {/* Main grid */}
        <main className="grid gap-7 md:grid-cols-[1.8fr,1.2fr]">
          {/* Levo: balans + pregled */}
          <section className="space-y-6">
            {/* Balans - FIX: € umesto $ */}
            <div className="rounded-3xl border border-emerald-800/60 bg-gradient-to-r from-[#02110b] via-black to-[#02110b] p-6 shadow-lg shadow-emerald-500/20">
              <p className="font-display text-[12px] uppercase tracking-[0.22em] text-emerald-300">
                {t('dashboard.balance', lang)}
              </p>
              <p className="mt-3 font-display text-[32px] sm:text-[36px] font-extrabold tracking-[0.08em] text-emerald-300">
                {balance.toLocaleString('de-DE')} €
              </p>
              <p className="mt-1 font-sans text-[12px] text-emerald-100/90">
                {t('dashboard.balanceDescription', lang)}
              </p>
            </div>

            {/* Pregled naloga */}
            <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 shadow-xl shadow-emerald-500/20">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-[20px] font-extrabold tracking-[0.08em] uppercase text-slate-50">
                    {t('dashboard.account', lang)}
                  </h2>
                  <p className="mt-1 font-sans text-[14px] text-emerald-100/90">
                    {t('dashboard.accountDescription', lang)}
                  </p>
                </div>
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
                        {user.currentPlan.name}{' '}
                        {user.currentPlan.balance && (
                          <span className="text-[11px] text-slate-400">
                            ({user.currentPlan.balance.toLocaleString('de-DE')})
                          </span>
                        )}
                      </p>
                      {/* FIX: Placeno sa € */}
                      <p className="text-[12px] text-slate-400">
                        {t('dashboard.paid', lang)}{' '}
                        <span className="font-medium text-emerald-400">
                          {user.currentPlan.price}€
                        </span>
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
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_18px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
                >
                  {hasPlan ? t('dashboard.upgradePlan', lang) : t('dashboard.buyPlan', lang)}
                  <span>→</span>
                </button>
                <button
                  onClick={handleCashout}
                  disabled={!hasPlan || cashout.loading || cashout.status === 'pending'}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/70 px-5 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-emerald-200 transition-all duration-200 hover:bg-emerald-500/10 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {cashout.status === 'pending' ? t('dashboard.cashOutPending', lang) : t('dashboard.cashOut', lang)}
                  <span>↗</span>
                </button>
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-sans text-slate-400">
                    {t('dashboard.loginStays', lang)}
                  </p>
                  {cashout.status === 'pending' && cashout.requestedAt && (
                    <p className="text-[11px] font-sans text-emerald-300">
                      {t('dashboard.requestSent', lang)} {new Date(cashout.requestedAt).toLocaleString()}
                    </p>
                  )}
                  {cashout.error && (
                    <p className="text-[11px] font-sans text-red-400">{cashout.error}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Desno: kratke info kartice */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 text-slate-100 shadow-lg shadow-emerald-500/20">
              <h3 className="mb-2 font-display text-[15px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                {t('dashboardInfo.payments', lang)}
              </h3>
              <ul className="space-y-1.5 font-sans text-[13px] text-slate-300">
                <li>• {t('dashboardInfo.noCardsSaved', lang)}</li>
                <li>• {t('dashboardInfo.encryptedTransactions', lang)}</li>
                <li>• {t('dashboardInfo.activationTime', lang)}</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-emerald-800/60 bg-black/80 p-6 text-slate-100 shadow-lg shadow-emerald-500/20">
              <h3 className="mb-2 font-display text-[15px] font-semibold tracking-[0.08em] uppercase text-emerald-300">
                {t('dashboardInfo.nextSteps', lang)}
              </h3>
              <ul className="space-y-1.5 font-sans text-[13px] text-slate-300">
                <li>• {t('dashboardInfo.refreshPage', lang)}</li>
                <li>• {t('dashboardInfo.keepEmailUpdated', lang)}</li>
                <li>• {t('dashboardInfo.supportFromDashboard', lang)}</li>
              </ul>
            </div>
          </aside>
        </main>

        {/* WhatsApp Call Request */}
        <section className="relative bg-gradient-to-b from-black via-emerald-950 to-black rounded-3xl border-2 border-emerald-500/40 p-8 mt-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="font-display text-[24px] sm:text-[28px] font-black uppercase tracking-[0.18em] text-emerald-400 mb-3">
                {t('whatsapp.title', lang)}
              </h2>
              <p className="font-sans text-[16px] leading-relaxed text-emerald-100/90 mb-8 max-w-xl mx-auto">
                {t('whatsapp.description', lang)}
              </p>
              
              <form onSubmit={handleWhatsAppSubmit} className="max-w-sm mx-auto">
                <div className="space-y-4">
                  <input
                    type="tel"
                    value={whatsappPhone}
                    onChange={handlePhoneChange}
                    placeholder={t('whatsapp.placeholder', lang)}
                    pattern="\+[0-9]+"
                    title="Phone number must start with + followed by digits only"
                    className="w-full rounded-2xl border-2 border-emerald-500/60 bg-black/80 px-6 py-4 text-[17px] font-medium text-center text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/40 shadow-lg shadow-emerald-500/10 transition-all"
                    disabled={whatsappSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={whatsappSubmitting}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-4 text-[15px] font-sans font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_24px_rgba(16,185,129,0.8)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(16,185,129,1)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {whatsappSubmitting ? '...' : t('whatsapp.submit', lang)}
                  </button>
                </div>
                {whatsappMessage && (
                  <p className={`mt-4 text-center text-[15px] font-medium ${whatsappMessage.includes('Hvala') || whatsappMessage.includes('Thank') || whatsappMessage.includes('Bedankt') ? 'text-emerald-300' : 'text-red-400'}`}>
                    {whatsappMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const StatusBadge = ({ hasPlan }) => {
  const lang = getLang();
  if (hasPlan) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[12px] font-sans font-medium text-emerald-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
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
