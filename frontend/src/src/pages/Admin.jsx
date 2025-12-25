import { useEffect, useState } from 'react';
import Header from '../components/Header';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Admin = ({ navigate, token, onLogout }) => {
  const [transactions, setTransactions] = useState([]);
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

    fetchTx();
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

  if (!token) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <div className="relative mx-auto max-w-6xl pb-16 pt-8 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="font-display text-[13px] uppercase tracking-[0.26em] text-emerald-400">
              Admin zona
            </p>
            <h1 className="mt-1 font-display text-[30px] sm:text-[34px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              Admin panel
            </h1>
            <p className="mt-2 font-sans text-[15px] text-emerald-100/90">
              Transakcije, aktivacija naloga i slanje account podataka.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
           className="rounded-full border border-emerald-500/80 px-6 py-1.5 text-[13px] font-sans uppercase tracking-[0.12em] text-emerald-200 transition-all duration-200 hover:bg-emerald-500/10 hover:-translate-y-[1px] whitespace-nowrap"
          >
            Klijentski prikaz
          </button>
        </header>

        {/* Tabela */}
        <section className="rounded-3xl border border-emerald-800/60 bg-black/80 p-5 shadow-xl shadow-emerald-500/20">
          {loading ? (
            <p className="font-sans text-[15px] text-emerald-100/90">
              Učitavanje transakcija...
            </p>
          ) : transactions.length === 0 ? (
            <p className="font-sans text-[15px] text-emerald-100/90">
              Nema evidentiranih plaćenih transakcija.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full font-sans text-[14px] text-slate-100">
                <thead className="border-b border-emerald-900 text-[12px] uppercase tracking-[0.16em] text-emerald-300">
                  <tr className="text-left">
                    <th className="py-2 pr-4">Korisnik</th>
                    <th className="py-2 pr-4">Plan</th>
                    <th className="hidden py-2 pr-4 md:table-cell">Iznos</th>
                    <th className="hidden py-2 pr-4 md:table-cell">Plaćeno</th>
                    <th className="py-2 pr-4">Aktivno</th>
                    <th className="py-2 pr-4">Cash Out</th>
                    <th className="py-2 pr-0">Account</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx._id}
                      className="border-b border-emerald-900/40 last:border-0"
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
      <span className="text-[12px] text-emerald-300">
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
                            {tx.provider === 'stripe' ? 'Kartica' : 'Kripto'}
                          </span>

                          {/* Na mobilnom ispod plana prikaži iznos i vreme da ne mora horizontalni scroll */}
                          <div className="mt-1 space-y-0.5 text-[12px] text-slate-400 md:hidden">
                            <div>
                              ${tx.amount}{' '}
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
                        <span className="text-[14px] font-semibold text-emerald-300">
                          ${tx.amount}
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
                              ? 'bg-emerald-500/10 text-emerald-300'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span
                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                              tx.active ? 'bg-emerald-400' : 'bg-slate-500'
                            }`}
                          />
                          {tx.active ? 'Aktivno' : 'Neaktivno'}
                        </button>
                      </td>

                      {/* Cash out status */}
                      <td className="py-3 pr-4 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-[13px] font-medium text-slate-50">
                            {tx.cashoutStatus === 'pending'
                              ? 'Zahtev poslat'
                              : tx.cashoutStatus === 'done'
                                ? 'Obrađeno'
                                : 'Nema zahteva'}
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
                                className="rounded-full bg-emerald-500/10 px-3 py-1 text-[12px] text-emerald-200 hover:bg-emerald-500/20"
                              >
                                Označi obrađeno
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
                                Resetuj
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
                            className="h-4 w-4 rounded border-emerald-700 bg-black text-emerald-500 focus:ring-emerald-500"
                          />
                          <span>{tx.accountSent ? 'Poslato' : 'Nije poslato'}</span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Admin;
