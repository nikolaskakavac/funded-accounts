import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000';

const Admin = ({ navigate, token }) => {
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
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 lg:px-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Admin panel
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Pregled svih plaćenih naloga, ručno uključivanje/isključivanje pristupa i evidencija
              poslatih account podataka.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-full border border-sky-500/80 px-3 py-1.5 text-xs text-sky-700 transition-all duration-200 hover:bg-sky-50 hover:-translate-y-[1px]"
          >
            Nazad na klijentski prikaz
          </button>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          {loading ? (
            <p className="text-xs text-slate-600">Učitavanje transakcija...</p>
          ) : transactions.length === 0 ? (
            <p className="text-xs text-slate-600">Nema pronađenih plaćenih transakcija.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="py-2 pr-4">Korisnik</th>
                    <th className="py-2 pr-4">Plan</th>
                    <th className="py-2 pr-4">Iznos</th>
                    <th className="py-2 pr-4">Plaćeno</th>
                    <th className="py-2 pr-4">Aktivno</th>
                    <th className="py-2 pr-4">Account poslat</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="border-b border-slate-100">
                      <td className="py-2 pr-4">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium text-slate-900">
                            {tx.user?.email || 'N/A'}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {tx.user?.name || ''}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 pr-4">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium text-slate-900">
                            {tx.plan?.name || 'N/A'}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {tx.provider === 'stripe' ? 'Kartica' : 'Kripto'}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 pr-4">
                        <span className="text-[11px] font-medium text-slate-900">
                          ${tx.amount}
                        </span>{' '}
                        <span className="text-[10px] uppercase text-slate-500">
                          {tx.currency}
                        </span>
                      </td>
                      <td className="py-2 pr-4">
                        <span className="text-[11px] text-slate-600">
                          {new Date(tx.createdAt).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-2 pr-4">
                        <button
                          onClick={() =>
                            updateTransaction(tx._id, { active: !tx.active })
                          }
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium transition ${
                            tx.active
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <span
                            className={`mr-1 h-1.5 w-1.5 rounded-full ${
                              tx.active ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                          {tx.active ? 'Aktivno' : 'Neaktivno'}
                        </button>
                      </td>
                      <td className="py-2 pr-4">
                        <label className="inline-flex cursor-pointer items-center gap-2 text-[11px]">
                          <input
                            type="checkbox"
                            checked={!!tx.accountSent}
                            onChange={() =>
                              updateTransaction(tx._id, {
                                accountSent: !tx.accountSent,
                              })
                            }
                            className="h-3 w-3 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          />
                          <span className="text-slate-700">
                            {tx.accountSent ? 'Poslato' : 'Nije poslato'}
                          </span>
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
