import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Determine API base URL (same logic as api.js)
const getApiBase = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Auto-detect: if on arbexfund.com, use api.arbexfund.com
  if (typeof window !== 'undefined' && window.location.hostname === 'arbexfund.com') {
    return 'https://api.arbexfund.com';
  }
  return 'http://localhost:4000';
};

const API_BASE = getApiBase();

const formatMoney = (amount, currency) => {
  const normalizedCurrency = String(currency || 'eur').toLowerCase();
  const symbol = normalizedCurrency === 'eur' ? '€' : normalizedCurrency === 'usd' ? '$' : '';
  return `${symbol}${amount}`;
};

const Admin = ({ navigate, token, onLogout }) => {
  const [transactions, setTransactions] = useState([]);
  const [affiliateCommissions, setAffiliateCommissions] = useState([]);
  const [affiliateCodeForm, setAffiliateCodeForm] = useState({ email: '', code: '' });
  const [affiliateCodeStatus, setAffiliateCodeStatus] = useState({ saving: false, error: '', success: '' });
  const [whatsappRequests, setWhatsappRequests] = useState([]);
  const [whatsappCount, setWhatsappCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTx = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to load transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchWhatsApp = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/whatsapp/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to load WhatsApp requests');
        const data = await res.json();
        setWhatsappRequests(data.requests || []);
        setWhatsappCount(data.uncontactedCount || 0);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchAffiliateCommissions = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/affiliate/commissions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to load affiliate commissions');
        const data = await res.json();
        setAffiliateCommissions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTx();
    fetchWhatsApp();
    fetchAffiliateCommissions();
  }, [token, navigate]);

  const updateTransaction = async (id, changes) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/transactions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(changes),
      });

      if (!res.ok) throw new Error('Failed to update transaction');
      const updated = await res.json();

      setTransactions((prev) =>
        prev.map((tx) => (tx._id === updated._id ? updated : tx))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const updateAffiliateCommission = async (id, changes) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/affiliate/commissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(changes),
      });

      if (!res.ok) throw new Error('Failed to update affiliate commission');
      const updated = await res.json();
      setAffiliateCommissions((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
    } catch (err) {
      console.error(err);
    }
  };

  const assignCustomAffiliateCode = async (e) => {
    e.preventDefault();
    setAffiliateCodeStatus({ saving: true, error: '', success: '' });
    try {
      const res = await fetch(`${API_BASE}/api/admin/affiliate/custom-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: affiliateCodeForm.email,
          code: affiliateCodeForm.code,
        }),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || 'Failed to assign affiliate code');
      }

      setAffiliateCodeStatus({
        saving: false,
        error: '',
        success: `Custom code ${(body.user?.affiliateCode || body.reservation?.affiliateCode || affiliateCodeForm.code).toUpperCase()} saved for ${body.user?.email || body.reservation?.email || affiliateCodeForm.email}.`,
      });
    } catch (err) {
      setAffiliateCodeStatus({ saving: false, error: err.message || 'Failed to assign affiliate code', success: '' });
    }
  };

  if (!token) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="font-display text-[13px] uppercase tracking-[0.26em] text-sky-400">
              Admin Zone
            </p>
            <h1 className="mt-1 font-display text-[30px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              Admin panel
            </h1>
            <p className="mt-2 font-sans text-[15px] text-sky-100/90">
              Transactions, account activation, and account credential delivery.
            </p>
            {whatsappCount > 0 && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-3 py-1 border border-sky-500/50">
                <span className="text-[12px] font-sans text-sky-300">
                  {whatsappCount} new WhatsApp {whatsappCount === 1 ? 'request' : 'requests'}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
           className="rounded-full border border-sky-500/80 px-6 py-1.5 text-[13px] font-sans uppercase tracking-[0.12em] text-sky-200 transition-all duration-200 hover:bg-sky-500/10 hover:-translate-y-[1px] whitespace-nowrap"
          >
            Client View
          </button>
        </header>

        {/* Tabela */}
        <section className="rounded-3xl border border-sky-800/60 bg-black/80 p-4 sm:p-5 shadow-xl shadow-sky-500/20">
          {loading ? (
            <p className="font-sans text-[15px] text-sky-100/90">
              Loading transactions...
            </p>
          ) : transactions.length === 0 ? (
            <p className="font-sans text-[15px] text-sky-100/90">
              No recorded paid transactions.
            </p>
          ) : (
            <>
            <div className="space-y-4 md:hidden">
              {transactions.map((tx) => (
                <article
                  key={tx._id}
                  className="rounded-2xl border border-sky-800/60 bg-slate-950/80 p-4 shadow-lg shadow-sky-500/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-all text-[14px] font-semibold text-slate-50">
                        {tx.user?.email || 'N/A'}
                      </p>
                      {tx.phone && (
                        <p className="mt-1 break-all text-[12px] text-sky-300">
                          {tx.phone}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full border border-sky-500/40 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-sky-200">
                      {tx.provider === 'stripe' ? 'Card' : 'Crypto'}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-slate-300">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Plan</p>
                      <p className="mt-1 break-words text-slate-100">{tx.plan?.name || 'N/A'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Amount</p>
                        <p className="mt-1 font-semibold text-sky-300">
                          {tx.amount} <span className="uppercase">{tx.currency}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Paid</p>
                        <p className="mt-1 text-slate-300">{new Date(tx.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateTransaction(tx._id, { active: !tx.active })}
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium transition ${
                          tx.active
                            ? 'bg-sky-500/10 text-sky-300'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        <span
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            tx.active ? 'bg-sky-400' : 'bg-slate-500'
                          }`}
                        />
                        {tx.active ? 'Active' : 'Inactive'}
                      </button>

                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-[12px] text-slate-300">
                        <input
                          type="checkbox"
                          checked={!!tx.accountSent}
                          onChange={() =>
                            updateTransaction(tx._id, {
                              accountSent: !tx.accountSent,
                            })
                          }
                          className="h-4 w-4 rounded border-sky-700 bg-black text-sky-500 focus:ring-sky-500"
                        />
                        <span>{tx.accountSent ? 'Account sent' : 'Not sent'}</span>
                      </label>
                    </div>

                    <div className="rounded-2xl border border-sky-900/50 bg-black/50 p-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Cash Out</p>
                      <p className="mt-1 text-[13px] font-medium text-slate-100">
                        {tx.cashoutStatus === 'pending'
                          ? 'Request sent'
                          : tx.cashoutStatus === 'done'
                            ? 'Done'
                            : 'No request'}
                      </p>
                      {tx.cashoutRequestedAt && (
                        <p className="mt-1 text-[12px] text-slate-400">
                          {new Date(tx.cashoutRequestedAt).toLocaleString()}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {tx.cashoutStatus === 'pending' && (
                          <button
                            onClick={() =>
                              updateTransaction(tx._id, {
                                cashoutStatus: 'done',
                              })
                            }
                            className="rounded-full bg-sky-500/10 px-3 py-1 text-[12px] text-sky-200 hover:bg-sky-500/20"
                          >
                            Mark done
                          </button>
                        )}
                        {tx.cashoutStatus && tx.cashoutStatus !== 'none' && (
                          <button
                            onClick={() =>
                              updateTransaction(tx._id, {
                                cashoutStatus: 'none',
                                cashoutRequestedAt: null,
                              })
                            }
                            className="rounded-full bg-slate-800 px-3 py-1 text-[12px] text-slate-200 hover:bg-slate-700"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full font-sans text-[14px] text-slate-100">
                <thead className="border-b border-sky-900 text-[12px] uppercase tracking-[0.16em] text-sky-300">
                  <tr className="text-left">
                    <th className="py-2 pr-4">User</th>
                    <th className="py-2 pr-4">Plan</th>
                    <th className="hidden py-2 pr-4 md:table-cell">Amount</th>
                    <th className="hidden py-2 pr-4 md:table-cell">Paid</th>
                    <th className="py-2 pr-4">Active</th>
                    <th className="py-2 pr-4">Cash Out</th>
                    <th className="py-2 pr-0">Account</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx._id}
                      className="border-b border-sky-900/40 last:border-0"
                    >
                     {/* Korisnik */}
<td className="py-3 pr-4 align-top">
  <div className="flex flex-col">
    <span className="text-[14px] font-medium text-slate-50">
      {tx.user?.email || 'N/A'}
    </span>
    {tx.user?.name && (
      <span className="text-[12px] text-slate-400">
        {tx.user.name}
      </span>
    )}
    {tx.phone && (
      <span className="text-[12px] text-sky-300">
        {tx.phone}
      </span>
    )}
  </div>
</td>


                      {/* Plan */}
                      <td className="py-3 pr-4 align-top">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-slate-50">
                            {tx.plan?.name || 'N/A'}
                          </span>
                          <span className="text-[12px] text-slate-400">
                            {tx.provider === 'stripe' ? 'Card' : 'Crypto'}
                          </span>

                          {/* Na mobilnom ispod plana prikaži iznos i vreme da ne mora horizontalni scroll */}
                          <div className="mt-1 space-y-0.5 text-[12px] text-slate-400 md:hidden">
                            <div>
                              {formatMoney(tx.amount, tx.currency)}{' '}
                              <span className="text-[10px] uppercase text-slate-500">
                                {tx.currency}
                              </span>
                            </div>
                            <div>{new Date(tx.createdAt).toLocaleString()}</div>
                          </div>
                        </div>
                      </td>

                      {/* Iznos – samo desktop */}
                      <td className="hidden py-3 pr-4 align-top md:table-cell">
                        <span className="text-[14px] font-semibold text-sky-300">
                          {formatMoney(tx.amount, tx.currency)}
                        </span>{' '}
                        <span className="text-[11px] uppercase text-slate-500">
                          {tx.currency}
                        </span>
                      </td>

                      {/* Plaćeno – samo desktop */}
                      <td className="hidden py-3 pr-4 align-top md:table-cell">
                        <span className="text-[13px] text-slate-300">
                          {new Date(tx.createdAt).toLocaleString()}
                        </span>
                      </td>

                      {/* Aktivno */}
                      <td className="py-3 pr-4 align-top">
                        <button
                          onClick={() =>
                            updateTransaction(tx._id, { active: !tx.active })
                          }
                          className={`inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                            tx.active
                              ? 'bg-sky-500/10 text-sky-300'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span
                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                              tx.active ? 'bg-sky-400' : 'bg-slate-500'
                            }`}
                          />
                          {tx.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>

                      {/* Cash out status */}
                      <td className="py-3 pr-4 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-[13px] font-medium text-slate-50">
                            {tx.cashoutStatus === 'pending'
                              ? 'Request sent'
                              : tx.cashoutStatus === 'done'
                                ? 'Done'
                                : 'No request'}
                          </span>
                          {tx.cashoutRequestedAt && (
                            <span className="text-[12px] text-slate-400">
                              {new Date(tx.cashoutRequestedAt).toLocaleString()}
                            </span>
                          )}
                          <div className="flex flex-wrap gap-2 mt-1">
                            {tx.cashoutStatus === 'pending' && (
                              <button
                                onClick={() =>
                                  updateTransaction(tx._id, {
                                    cashoutStatus: 'done',
                                  })
                                }
                                className="rounded-full bg-sky-500/10 px-3 py-1 text-[12px] text-sky-200 hover:bg-sky-500/20"
                              >
                                Mark done
                              </button>
                            )}
                            {tx.cashoutStatus && tx.cashoutStatus !== 'none' && (
                              <button
                                onClick={() =>
                                  updateTransaction(tx._id, {
                                    cashoutStatus: 'none',
                                    cashoutRequestedAt: null,
                                  })
                                }
                                className="rounded-full bg-slate-800 px-3 py-1 text-[12px] text-slate-200 hover:bg-slate-700"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Account poslat – poslednja kolona, uvek vidljiva */}
                      <td className="py-3 pr-0 align-top">
                        <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-slate-300">
                          <input
                            type="checkbox"
                            checked={!!tx.accountSent}
                            onChange={() =>
                              updateTransaction(tx._id, {
                                accountSent: !tx.accountSent,
                              })
                            }
                            className="h-4 w-4 rounded border-sky-700 bg-black text-sky-500 focus:ring-sky-500"
                          />
                          <span>{tx.accountSent ? 'Sent' : 'Not sent'}</span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          )}
        </section>

        <section className="mt-8 rounded-3xl border border-sky-800/60 bg-black/80 p-4 sm:p-5 shadow-xl shadow-sky-500/20">
          <h2 className="mb-4 font-display text-[18px] font-semibold uppercase tracking-[0.14em] text-sky-400">
            Custom Affiliate Codes
          </h2>
          <p className="mb-4 text-[14px] text-slate-300">
            Create clean promo codes for influencers by assigning a custom affiliate code to any user or reserving it for an email before that person creates an account.
          </p>
          <form onSubmit={assignCustomAffiliateCode} className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
            <input
              type="email"
              value={affiliateCodeForm.email}
              onChange={(e) => setAffiliateCodeForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Influencer email"
              className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] text-slate-50 outline-none focus:border-sky-400"
              required
            />
            <input
              type="text"
              value={affiliateCodeForm.code}
              onChange={(e) => setAffiliateCodeForm((prev) => ({ ...prev, code: e.target.value.toUpperCase().replace(/\s+/g, '') }))}
              placeholder="MARKO"
              className="w-full rounded-2xl border border-sky-700 bg-black/60 px-3.5 py-2.5 text-[14px] text-slate-50 outline-none focus:border-sky-400"
              required
            />
            <button
              type="submit"
              disabled={affiliateCodeStatus.saving}
              className="rounded-full bg-sky-500 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-sky-400 disabled:opacity-70"
            >
              {affiliateCodeStatus.saving ? 'Saving...' : 'Save code'}
            </button>
          </form>
          <p className="mt-3 text-[12px] text-slate-400">
            Allowed: 3-24 characters, letters, numbers, `_` and `-`.
          </p>
          <p className="mt-1 text-[12px] text-slate-500">
            If the email does not exist yet, the code is reserved and will be attached automatically when that email registers later.
          </p>
          {affiliateCodeStatus.error && (
            <p className="mt-3 text-[12px] text-red-400">{affiliateCodeStatus.error}</p>
          )}
          {affiliateCodeStatus.success && (
            <p className="mt-3 text-[12px] text-sky-300">{affiliateCodeStatus.success}</p>
          )}
        </section>

        {/* WhatsApp Requests */}
        <section className="mt-8 rounded-3xl border border-sky-800/60 bg-black/80 p-4 sm:p-5 shadow-xl shadow-sky-500/20">
          <h2 className="mb-4 font-display text-[18px] font-semibold uppercase tracking-[0.14em] text-sky-400">
            WhatsApp Call Requests
            {whatsappCount > 0 && (
              <span className="ml-2 rounded-full bg-sky-500/20 px-2 py-0.5 text-[12px] text-sky-300">
                {whatsappCount} new
              </span>
            )}
          </h2>
          
          {whatsappRequests.length === 0 ? (
            <p className="font-sans text-[15px] text-sky-100/90">
              No WhatsApp requests.
            </p>
          ) : (
            <>
            <div className="space-y-3 md:hidden">
              {whatsappRequests.map((req) => (
                <article
                  key={req._id}
                  className="rounded-2xl border border-sky-800/60 bg-slate-950/80 p-4"
                >
                  <p className="break-all text-[15px] font-semibold text-slate-50">
                    {req.phoneNumber}
                  </p>
                  <p className="mt-1 text-[12px] text-slate-400">
                    {new Date(req.createdAt).toLocaleDateString('sr-RS', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-[12px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={!!req.contacted}
                      onChange={async () => {
                        try {
                          await fetch(`${API_BASE}/api/whatsapp/${req._id}/contacted`, {
                            method: 'PATCH',
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          setWhatsappRequests((prev) =>
                            prev.map((r) =>
                              r._id === req._id ? { ...r, contacted: true } : r
                            )
                          );
                          setWhatsappCount((prev) => Math.max(0, prev - 1));
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="h-4 w-4 rounded border-sky-700 bg-black text-sky-500 focus:ring-sky-500"
                    />
                    <span>{req.contacted ? 'Contacted' : 'Not contacted'}</span>
                  </label>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full font-sans text-[14px] text-slate-100">
                <thead className="border-b border-sky-900 text-[12px] uppercase tracking-[0.16em] text-sky-300">
                  <tr className="text-left">
                    <th className="py-2 pr-4">Phone Number</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-0">Contacted</th>
                  </tr>
                </thead>
                <tbody>
                  {whatsappRequests.map((req) => (
                    <tr
                      key={req._id}
                      className="border-b border-sky-900/40 last:border-0"
                    >
                      <td className="py-3 pr-4 align-top">
                        <span className="text-[14px] font-medium text-slate-50">
                          {req.phoneNumber}
                        </span>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        <span className="text-[13px] text-slate-400">
                          {new Date(req.createdAt).toLocaleDateString('sr-RS', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>
                      <td className="py-3 pr-0 align-top">
                        <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-slate-300">
                          <input
                            type="checkbox"
                            checked={!!req.contacted}
                            onChange={async () => {
                              try {
                                await fetch(`${API_BASE}/api/whatsapp/${req._id}/contacted`, {
                                  method: 'PATCH',
                                  headers: { Authorization: `Bearer ${token}` },
                                });
                                setWhatsappRequests((prev) =>
                                  prev.map((r) =>
                                    r._id === req._id ? { ...r, contacted: true } : r
                                  )
                                );
                                setWhatsappCount((prev) => Math.max(0, prev - 1));
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            className="h-4 w-4 rounded border-sky-700 bg-black text-sky-500 focus:ring-sky-500"
                          />
                          <span>{req.contacted ? 'Contacted' : 'Not contacted'}</span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </>
          )}
        </section>

        <section className="mt-8 rounded-3xl border border-sky-800/60 bg-black/80 p-4 sm:p-5 shadow-xl shadow-sky-500/20">
          <h2 className="mb-4 font-display text-[18px] font-semibold uppercase tracking-[0.14em] text-sky-400">
            Affiliate Commissions
          </h2>
          {affiliateCommissions.length === 0 ? (
            <p className="font-sans text-[15px] text-sky-100/90">No affiliate commissions yet.</p>
          ) : (
            <div className="space-y-3">
              {affiliateCommissions.map((item) => (
                <article key={item._id} className="rounded-2xl border border-sky-800/60 bg-slate-950/80 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-1 text-[13px] text-slate-300">
                      <p><span className="text-slate-500">Affiliate:</span> {item.affiliateUser?.email || 'N/A'}</p>
                      <p><span className="text-slate-500">Code:</span> {item.affiliateUser?.affiliateCode || '-'}</p>
                      <p><span className="text-slate-500">Referral:</span> {item.referredUser?.email || 'N/A'}</p>
                      <p><span className="text-slate-500">Plan:</span> {item.plan?.name || 'N/A'}</p>
                      <p><span className="text-slate-500">Commission:</span> <span className="text-sky-300">{item.commissionAmount} {String(item.currency || 'eur').toUpperCase()}</span></p>
                      <p><span className="text-slate-500">Payout:</span> {item.affiliateUser?.affiliatePayoutMethod || 'none'}{item.affiliateUser?.affiliatePayoutDetails ? ` - ${item.affiliateUser?.affiliatePayoutDetails}` : ''}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1.5 text-[12px] uppercase tracking-[0.12em] ${item.status === 'paid' ? 'bg-sky-500/15 text-sky-300' : 'bg-amber-500/15 text-amber-300'}`}>
                        {item.status}
                      </span>
                      {item.status !== 'paid' && (
                        <button
                          onClick={() => updateAffiliateCommission(item._id, { status: 'paid' })}
                          className="rounded-full bg-sky-500/10 px-3 py-1.5 text-[12px] text-sky-200 hover:bg-sky-500/20"
                        >
                          Mark paid
                        </button>
                      )}
                      {item.status === 'paid' && (
                        <button
                          onClick={() => updateAffiliateCommission(item._id, { status: 'pending' })}
                          className="rounded-full bg-slate-800 px-3 py-1.5 text-[12px] text-slate-200 hover:bg-slate-700"
                        >
                          Revert to pending
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default Admin;


