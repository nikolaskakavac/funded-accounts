// Success.jsx
const Success = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="max-w-md rounded-2xl border border-emerald-500/40 bg-slate-900/80 p-6 text-center shadow-xl shadow-black/60">
        <h1 className="text-2xl font-semibold text-emerald-400">Uplata je uspešna</h1>
        <p className="mt-3 text-sm text-slate-300">
          Vaša uplata je primljena. Vaš funded plan će se uskoro pojaviti u dashboard‑u.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Idi na dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;
