import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { verifyEmail } from '../api';

const VerifyEmail = ({ navigate, onLogout }) => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Confirming your email...');

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (!token) {
      setStatus('error');
      setMessage('Verification link is missing.');
      return;
    }

    const run = async () => {
      try {
        const res = await verifyEmail(token);
        if (res.success) {
          setStatus('success');
          setMessage(res.message || 'Email confirmed successfully. You can now log in.');
        } else {
          setStatus('error');
          setMessage(res.message || 'Verification link is invalid or expired.');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage('Could not confirm your email. Please try again.');
      }
    };

    run();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={''} onLogout={onLogout} />
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-sky-700/60 bg-black/80 p-7 text-center shadow-xl shadow-sky-500/20">
          <p className="font-display text-[18px] uppercase tracking-[0.22em] text-sky-400">
            {status === 'success' ? 'Email Confirmed' : status === 'error' ? 'Verification Failed' : 'Checking'}
          </p>
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-sky-100/90">
            {message}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_20px_rgba(56,189,248,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400"
          >
            Go to Log in
          </button>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default VerifyEmail;
