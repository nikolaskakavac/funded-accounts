import { useEffect, useState } from 'react';
import { checkNowPaymentStatus } from '../api';

const Success = ({ navigate }) => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Čekamo potvrdu plaćanja...');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Stripe parametri (SUCCESS odmah)
    const sessionId = urlParams.get('session_id');
    const paymentIntent = urlParams.get('payment_intent');
    
    // NowPayments parametri
    const paymentId = urlParams.get('payment_id') || 
                     urlParams.get('invoice_id') || 
                     urlParams.get('order_id');
    
    // Plan info (može biti prazno)
    const plan = urlParams.get('plan') || 'tvoj plan';
    const method = urlParams.get('method') || 'karticom';

    console.log('Success URL params:', { 
      sessionId, 
      paymentIntent, 
      paymentId, 
      plan, 
      method 
    });

    // ✅ STRIPE - SUCCESS ODMAH (nema čekanja)
    if (sessionId || paymentIntent) {
      setStatus('success');
      setMessage(`Plan uspešno aktiviran preko Stripe ${method}!`);
      setTimeout(() => navigate('/dashboard'), 2000);
      return;
    }

    // ✅ NowPayments - proveri status
    if (paymentId) {
      const checkStatus = async () => {
        try {
          console.log('Checking NowPayments:', paymentId);
          const res = await checkNowPaymentStatus(paymentId);
          
          console.log('NowPayments response:', res);
          
          if (res.status === 'confirmed' || res.status === 'paid' || res.status === 'finished') {
            setStatus('success');
            setMessage(`Plan uspešno aktiviran preko NowPayments!`);
            setTimeout(() => navigate('/dashboard'), 2000);
          } else if (res.status === 'failed' || res.status === 'expired' || res.status === 'cancelled') {
            setStatus('error');
            setMessage('NowPayments plaćanje neuspešno.');
          } else {
            setMessage(`NowPayments: ${res.status || 'u obradi'}. Čekamo 10s...`);
          }
        } catch (e) {
          console.error('NowPayments error:', e);
          setMessage('Greška NowPayments. Proveri dashboard.');
        }
      };

      checkStatus();
      const interval = setInterval(checkStatus, 10000);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setStatus('timeout');
        setMessage('Čekamo blockchain potvrdu. Proveri dashboard za status.');
      }, 10 * 60 * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }

    // ❌ Ništa nije prepoznato
    setStatus('error');
    setMessage('Nepoznat payment provider. Kontaktiraj podršku.');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-emerald-950 to-black text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-emerald-600/60 bg-black/80 p-7 text-center shadow-xl shadow-emerald-500/30">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
          status === 'success' ? 'bg-emerald-500/20 border-2 border-emerald-400' : 
          status === 'error' ? 'bg-red-500/20 border-2 border-red-400' : 
          'bg-yellow-500/20 border-2 border-yellow-400'
        }`}>
          {status === 'success' ? '✅' : status === 'error' ? '❌' : '⏳'}
        </div>
        
        <p className="font-display text-[12px] uppercase tracking-[0.26em] mb-2 text-emerald-400">
          {status === 'success' ? 'Uspjeh' : status === 'error' ? 'Greška' : 'U obradi'}
        </p>
        <h1 className={`font-display text-[26px] sm:text-[32px] font-extrabold tracking-[0.12em] uppercase mb-4 ${
          status === 'success' ? 'text-emerald-300' : status === 'error' ? 'text-red-300' : 'text-yellow-300'
        }`}>
          {status === 'success' ? 'Plan aktivan!' : status === 'error' ? 'Neuspeh' : 'Čekamo potvrdu'}
        </h1>
        <p className="mt-3 font-sans text-[15px] text-emerald-100/90 leading-relaxed mb-6">
          {message}
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full rounded-full bg-emerald-500 px-4 py-3
                     text-lg font-sans font-semibold uppercase tracking-[0.16em] text-black
                     shadow-[0_0_20px_rgba(16,185,129,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400"
        >
          {status === 'success' ? 'Dashboard →' : 'Proveri Status'}
        </button>
      </div>
    </div>
  );
};

export default Success;
