import { useEffect, useState } from 'react';
import { getMe, getCashoutStatus, requestCashout, getAffiliateDashboard, saveAffiliatePayoutDetails } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const Dashboard = ({ navigate, token, onLogout }) => {
  const [user, setUser] = useState(null);
  const [cashout, setCashout] = useState({ status: 'none', requestedAt: null, loading: false, error: '' });
  const [affiliate, setAffiliate] = useState(null);
  const [affiliateForm, setAffiliateForm] = useState({ payoutMethod: 'none', payoutDetails: '', payoutNotes: '' });
  const [affiliateStatus, setAffiliateStatus] = useState({ loading: false, saving: false, error: '', success: '', copied: false });
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
          const affiliateData = await getAffiliateDashboard(effectiveToken);
          setAffiliate(affiliateData);
          setAffiliateForm({
            payoutMethod: affiliateData.payoutMethod || 'none',
            payoutDetails: affiliateData.payoutDetails || '',
            payoutNotes: affiliateData.payoutNotes || '',
          });
        } catch (affiliateErr) {
          console.error(affiliateErr);
          setAffiliateStatus((prev) => ({ ...prev, error: affiliateErr.message || 'Affiliate dashboard error' }));
        }
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

  const handleCopyAffiliateLink = async () => {
    if (!affiliate?.affiliateLink) return;
    try {
      await navigator.clipboard.writeText(affiliate.affiliateLink);
      setAffiliateStatus((prev) => ({ ...prev, copied: true }));
      window.setTimeout(() => {
        setAffiliateStatus((prev) => ({ ...prev, copied: false }));
      }, 1800);
    } catch (err) {
      setAffiliateStatus((prev) => ({ ...prev, error: 'Failed to copy affiliate link' }));
    }
  };

  const handleAffiliateSave = async (e) => {
    e.preventDefault();
    setAffiliateStatus((prev) => ({ ...prev, saving: true, error: '', success: '' }));
    try {
      const res = await saveAffiliatePayoutDetails(effectiveToken, affiliateForm);
      setAffiliate((prev) => prev ? ({
        ...prev,
        payoutMethod: res.payoutMethod,
        payoutDetails: res.payoutDetails,
        payoutNotes: res.payoutNotes,
      }) : prev);
      setAffiliateStatus((prev) => ({ ...prev, saving: false, success: 'Payout details saved.' }));
    } catch (err) {
      setAffiliateStatus((prev) => ({ ...prev, saving: false, error: err.message || 'Failed to save payout details' }));
    }
  };

  if (!effectiveToken) return null;

  const hasPlan = !!user?.currentPlan;

  const pricePaid = user?.currentPlan?.price;
  const balance =
    user?.currentPlan?.balance ??
    (pricePaid === 150
      ? 5000
      : pricePaid === 300
        ? 10000
        : pricePaid === 800
          ? 25000
          : 0);
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
              <div className="mb-5 flex items-start justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                  Email &amp; Account Status:
                </p>
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
                      <p className="font-normal tracking-[0.02em] text-slate-50/85">
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
                  onClick={() => navigate('/#account-prices')}
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

        <section className="mt-8 rounded-3xl border border-sky-800/60 bg-black/80 p-6 shadow-xl shadow-sky-500/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-[12px] uppercase tracking-[0.22em] text-sky-300">
                Affiliate Office
              </p>
              <h2 className="mt-2 font-display text-[22px] uppercase tracking-[0.08em] text-slate-50">
                Earn 30% from each paid referral
              </h2>
              <p className="mt-2 text-[14px] text-slate-300">
                Share your link, track registrations, and leave your bank or crypto payout details here.
              </p>
            </div>
            {affiliate?.affiliateCode && (
              <div className="rounded-2xl border border-sky-700/60 bg-slate-950/70 px-4 py-3 text-center">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Your code</p>
                <p className="mt-1 font-display text-[20px] tracking-[0.08em] text-sky-300">{affiliate.affiliateCode}</p>
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Registrations" value={affiliate?.stats?.registrations ?? 0} />
            <StatCard label="Paid purchases" value={affiliate?.stats?.purchases ?? 0} />
            <StatCard label="Pending commission" value={`${affiliate?.stats?.pendingCommission ?? 0} EUR`} />
            <StatCard label="Paid commission" value={`${affiliate?.stats?.paidCommission ?? 0} EUR`} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="rounded-3xl border border-sky-800/50 bg-slate-950/60 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Affiliate link</p>
              <p className="mt-2 break-all text-[14px] text-sky-200">{affiliate?.affiliateLink || 'Loading...'}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopyAffiliateLink}
                  className="rounded-full bg-sky-500 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-sky-400"
                >
                  Copy link
                </button>
                {affiliateStatus.copied && (
                  <span className="self-center text-[12px] text-sky-300">Copied</span>
                )}
              </div>

              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Recent commissions</p>
                <div className="mt-3 space-y-3">
                  {(affiliate?.commissions || []).slice(0, 5).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-sky-900/50 bg-black/50 p-3 text-[13px] text-slate-300">
                      <div className="flex items-center justify-between gap-3">
                        <span className="break-all text-slate-100">{item.referredEmail}</span>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] ${item.status === 'paid' ? 'bg-sky-500/15 text-sky-300' : 'bg-amber-500/15 text-amber-300'}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-400">{item.planName}</p>
                      <p className="mt-1 text-sky-300">{item.commissionAmount} EUR</p>
                    </div>
                  ))}
                  {affiliate && affiliate.commissions?.length === 0 && (
                    <p className="text-[13px] text-slate-400">No commissions yet.</p>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleAffiliateSave} className="rounded-3xl border border-sky-800/50 bg-slate-950/60 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Payout details</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-[12px] text-slate-300">Payout method</label>
                  <select
                    value={affiliateForm.payoutMethod}
                    onChange={(e) => setAffiliateForm((prev) => ({ ...prev, payoutMethod: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] text-slate-50 outline-none focus:border-sky-400"
                  >
                    <option value="none">Not set yet</option>
                    <option value="bank">Bank account</option>
                    <option value="crypto">Crypto wallet</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12px] text-slate-300">Bank / wallet details</label>
                  <textarea
                    value={affiliateForm.payoutDetails}
                    onChange={(e) => setAffiliateForm((prev) => ({ ...prev, payoutDetails: e.target.value }))}
                    rows={4}
                    className="mt-1 w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] text-slate-50 outline-none focus:border-sky-400"
                    placeholder="IBAN / bank name / account holder or wallet address"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-slate-300">Notes</label>
                  <input
                    value={affiliateForm.payoutNotes}
                    onChange={(e) => setAffiliateForm((prev) => ({ ...prev, payoutNotes: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] text-slate-50 outline-none focus:border-sky-400"
                    placeholder="Optional notes for payout"
                  />
                </div>

                <button
                  type="submit"
                  disabled={affiliateStatus.saving}
                  className="rounded-full bg-sky-500 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-sky-400 disabled:opacity-70"
                >
                  {affiliateStatus.saving ? 'Saving...' : 'Save payout details'}
                </button>
                {affiliateStatus.error && <p className="text-[12px] text-red-400">{affiliateStatus.error}</p>}
                {affiliateStatus.success && <p className="text-[12px] text-sky-300">{affiliateStatus.success}</p>}
              </div>
            </form>
          </div>
        </section>

        {/* Logout Button */}
        <div className="mt-12 border-t border-sky-500/20 pt-6 pb-8">
          <div className="flex justify-center">
          <button
            onClick={onLogout}
            className="rounded-full border border-red-500/80 px-6 py-2 text-[13px] font-sans uppercase tracking-[0.14em] text-red-300 transition-all duration-200 hover:bg-red-600/10 hover:-translate-y-[1px]"
          >
            {t('nav.logout', lang)}
          </button>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-sky-800/50 bg-slate-950/70 p-4">
    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">{label}</p>
    <p className="mt-2 font-display text-[24px] text-sky-300">{value}</p>
  </div>
);

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


