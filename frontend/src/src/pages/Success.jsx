// Success.jsx
import { useEffect, useState } from 'react';
import { checkNowPaymentStatus } from '../api';

const Success = ({ navigate }) => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Čekamo potvrdu plaćanja...');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('payment_id') || urlParams.get('paymentId');

    if (!paymentId) {
      setStatus('error');
      setMessage('Nema payment ID u URL-u. Kontaktirajte podršku.');
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await checkNowPaymentStatus(paymentId);
        if (res.status === 'paid') {
          setStatus('success');
          setMessage('Plan je uspešno aktiviran!');
          // Redirect to dashboard after 3 seconds
          setTimeout(() => navigate('/dashboard'), 3000);
        } else if (res.status === 'failed') {
          setStatus('error');
          setMessage('Plaćanje nije uspelo. Pokušajte ponovo.');
        } else {
          setMessage(`Status: ${res.status || 'čekamo'}. Proveravamo ponovo za 10 sekundi...`);
        }
      } catch (e) {
        console.error('Status check error:', e);
        setMessage('Greška pri proveri statusa. Osvežite stranicu.');
      }
    };

    // Proveri odmah
    checkStatus();

    // Proveravaj svakih 10 sekundi
    const interval = setInterval(checkStatus, 10000);

    // Zaustavi proveru nakon 10 minuta
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setStatus('timeout');
      setMessage('Provera statusa je zaustavljena. Proverite dashboard za status plana.');
    }, 10 * 60 * 1000); // 10 minuta

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-emerald-600/60 bg-black/80 p-7 text-center shadow-xl shadow-emerald-500/30">
        <p className="font-display text-[12px] uppercase tracking-[0.26em] text-emerald-400">
          {status === 'success' ? 'Uplata uspešna' : status === 'error' ? 'Greška' : 'Uplata poslata'}
        </p>
        <h1 className={`mt-2 font-display text-[26px] sm:text-[30px] font-extrabold tracking-[0.12em] uppercase ${
          status === 'success' ? 'text-emerald-300' : status === 'error' ? 'text-red-300' : 'text-yellow-300'
        }`}>
          {status === 'success' ? 'Plan aktiviran!' : status === 'error' ? 'Neuspeh' : 'Čekamo potvrdu'}
        </h1>
        <p className="mt-3 font-sans text-[15px] text-emerald-100/90">
          {message}
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5
                     text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black
                     shadow-[0_0_18px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
        >
          Idi na dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;
