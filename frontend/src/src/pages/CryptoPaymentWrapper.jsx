import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { createNowPayment } from '../api';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const CryptoPaymentPage = ({ navigate, token, planId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const lang = getLang();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const load = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await createNowPayment(token, planId, 'btc');
        setData(res); // { payment_id, pay_address, pay_amount, pay_currency }
      } catch (e) {
        console.error(e);
        setErr(t('crypto.error', lang));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, planId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-sky-950 to-black text-slate-50">
        <div className="flex-1 flex items-center justify-center">
          <p className="font-sans text-[15px] text-sky-100/90">{t('crypto.loadingShort', lang)}</p>
        </div>
        <Footer navigate={navigate} />
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 px-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full rounded-3xl border border-sky-800/60 bg-black/80 p-6 text-center shadow-xl shadow-sky-500/20">
            <p className="mb-3 font-sans text-[15px] text-red-400">{err}</p>
            <button
              onClick={() => navigate('/#plans')}
              className="mt-1 inline-flex items-center justify-center rounded-full border border-sky-600 px-4 py-2 text-[13px] font-sans uppercase tracking-[0.14em] text-sky-200 hover:bg-sky-500/10 transition-colors"
            >
              {t('crypto.backToPlans', lang)}
            </button>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-sky-950 to-black text-slate-50">
        <div className="flex-1 flex items-center justify-center">
          <p className="font-sans text-[15px] text-sky-100/90">{t('crypto.noData', lang)}</p>
        </div>
        <Footer navigate={navigate} />
      </div>
    );
  }

  const { payment_id, pay_address, pay_amount, pay_currency } = data;

  const handleCopyAddress = async () => {
    if (!pay_address) {
      return;
    }
    setCopyStatus('');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(pay_address);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = pay_address;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!ok) {
          throw new Error('copy_failed');
        }
      }
      setCopyStatus(t('crypto.copySuccess', lang));
    } catch (e) {
      console.error(e);
      setCopyStatus(t('crypto.copyError', lang));
    }
    window.setTimeout(() => setCopyStatus(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <div className="mx-auto max-w-lg px-4 pb-16 pt-10 flex-1">
        <button
          onClick={() => navigate('/#plans')}
          className="mb-6 inline-flex items-center gap-2 text-[12px] font-sans uppercase tracking-[0.16em] text-sky-300 hover:text-sky-100"
        >
          <span className="text-sky-400 text-sm">←</span>
          {t('crypto.backToPlans', lang)}
        </button>

        <p className="font-display text-[12px] uppercase tracking-[0.26em] text-sky-400">
          {t('crypto.title', lang)}
        </p>
        <h1 className="mt-2 font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
          {t('crypto.payWithBtc', lang)}
        </h1>

        <p className="mt-4 mb-4 font-sans text-[15px] text-sky-100/90">
          {t('crypto.sendExactly', lang)}{' '}
          <span className="font-semibold">
            {pay_amount} {pay_currency.toUpperCase()}
          </span>{' '}
          {t('crypto.toAddress', lang)}
        </p>
        <p className="mb-3 font-sans text-[12px] text-slate-400">
          {t('crypto.rightCoinHint', lang)}
        </p>

        <p className="mb-3 break-all font-mono text-[13px] text-sky-200">
          {pay_address}
        </p>

        <button
          onClick={handleCopyAddress}
          className="mb-2 inline-flex items-center justify-center rounded-full border border-sky-600 px-4 py-2 text-[13px] font-sans text-sky-200 hover:bg-sky-500/10 transition-colors"
        >
          {t('crypto.copyAddress', lang)}
        </button>
        {copyStatus && (
          <p className="mb-4 font-sans text-[12px] text-sky-300">
            {copyStatus}
          </p>
        )}

        <div className="mb-6 flex justify-center">
          <QRCode value={pay_address} size={190} bgColor="#020617" fgColor="#a7f3d0" />
        </div>

        <p className="mb-2 font-sans text-[12px] text-slate-400">
          {t('crypto.paymentId', lang)} {payment_id}
        </p>
        <p className="font-sans text-[12px] text-slate-400">
          {t('crypto.note.activate', lang)}
        </p>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default CryptoPaymentPage;


