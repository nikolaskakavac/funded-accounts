// Cancel.jsx
const Cancel = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center shadow-xl shadow-black/60">
        <h1 className="text-2xl font-semibold text-slate-50">Uplata je otkazana</h1>
        <p className="mt-3 text-sm text-slate-300">
          Uplata nije završena. Možete pokušati ponovo ili izabrati drugi plan.
        </p>
        <button
          onClick={() => navigate('/pricing')}
          className="mt-5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Nazad na planove
        </button>
      </div>
    </div>
  );
};

export default Cancel;
