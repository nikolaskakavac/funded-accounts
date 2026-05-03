import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { createNowPayment, validateAffiliateCode } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

const PLAN_CRYPTO_PRICES = {
  '693db3e0e9cf589519c144fe': 150,
  '693db3ede9cf589519c14501': 300,
  '693db3ede9cf589519c14500': 800,
};

const DISCOUNT_RATE = 0.05;

export default function CryptoPaymentPage({ token, planId, navigate, onLogout }) {
  const [coin, setCoin] = useState('usdt'); // 'usdt' | 'usdc' | 'eth'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscountCode, setAppliedDiscountCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [checkingDiscount, setCheckingDiscount] = useState(false);
  const lang = getLang();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.setItem('authRedirectTo', `/pay-crypto/${planId}`);
      navigate('/register');
    }
  }, [navigate, planId, token]);

  useEffect(() => {
    if (token) {
      revealAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedDiscountCode, coin, token]);

  const baseAmount = PLAN_CRYPTO_PRICES[planId] || 0;
  const discountedAmount = Number((baseAmount * (1 - DISCOUNT_RATE)).toFixed(2));
  const expectedAmount = appliedDiscountCode ? discountedAmount : baseAmount;

  const revealAddress = async () => {
    setErr('');
    setData(null);
    setLoading(true);
    try {
      const res = await createNowPayment(token, planId, coin, expectedAmount, appliedDiscountCode);
      setData(res); // { payment_id, pay_address, pay_amount, pay_currency, invoice_url }
    } catch (e) {
      console.error(e);
      setErr(e?.message || t('crypto.error', lang));
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = async () => {
    const normalizedCode = String(discountCode || '').trim().toUpperCase();
    if (!normalizedCode) {
      setAppliedDiscountCode('');
      setDiscountMessage('');
      setDiscountError('');
      return;
    }

    setCheckingDiscount(true);
    setDiscountError('');
    setDiscountMessage('');

    try {
      const result = await validateAffiliateCode(normalizedCode);
      if (!result?.valid) {
        setAppliedDiscountCode('');
        setDiscountError(lang === 'nl' ? 'Code is niet geldig.' : 'Code is not valid.');
        return;
      }

      setAppliedDiscountCode(result.code || normalizedCode);
      setDiscountMessage(
        lang === 'nl'
          ? '5% korting toegepast op deze aankoop.'
          : '5% discount applied to this purchase.'
      );
    } catch (applyError) {
      console.error(applyError);
      setAppliedDiscountCode('');
      setDiscountError(lang === 'nl' ? 'Code kon niet worden gecontroleerd.' : 'Could not verify code.');
    } finally {
      setCheckingDiscount(false);
    }
  };

  const handleDiscountInputChange = (event) => {
    const nextValue = event.target.value.toUpperCase();
    setDiscountCode(nextValue);
    if (nextValue.trim() !== appliedDiscountCode) {
      setAppliedDiscountCode('');
      setDiscountMessage('');
      setDiscountError('');
    }
  };

  const {
    payment_id,
    pay_address,
    pay_amount,
    pay_currency,
    eur_amount,
    fiat_amount,
    fiat_currency,
    invoice_url,
  } = data || {};
  const formattedAmount =
    pay_currency?.toLowerCase() === 'eth' && pay_amount !== null && pay_amount !== undefined
      ? (Number(pay_amount) || 0).toFixed(3)
      : pay_amount;
  const displayCurrency =
    pay_currency?.toLowerCase() === 'usdterc20'
      ? 'USDT'
      : pay_currency?.toUpperCase();
  const fiatAmount = fiat_amount || eur_amount || expectedAmount;
  const fiatCurrency = (fiat_currency || 'EUR').toUpperCase();
  const fiatLabel = `${fiatAmount} ${fiatCurrency}`;

  if (!token) {
    return null;
  }

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
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} />
      <div className="relative mx-auto flex flex-1 max-w-3xl flex-col items-center justify-center px-4 py-10 lg:px-8">
        {/* Header */}
        <div className="mb-8 w-full flex items-center justify-between">
          <div>
            <p className="font-display text-[12px] uppercase tracking-[0.26em] text-sky-400">
              {t('crypto.title', lang)}
            </p>
            <h1 className="mt-2 font-display text-[28px] sm:text-[32px] font-extrabold tracking-[0.12em] uppercase text-slate-50">
              {t('crypto.header', lang)}
            </h1>
            <p className="mt-2 font-sans text-[15px] text-sky-100/90">
              {t('crypto.description', lang)}
            </p>
          </div>

          {navigate && (
            <button
              onClick={() => navigate('/#plans')}
              className="hidden rounded-full border border-sky-500/70 px-4 py-1.5 text-[12px] font-sans uppercase tracking-[0.14em] text-sky-200 transition-colors hover:bg-sky-500/10 sm:inline-flex"
            >
              {t('crypto.backToPlans', lang)}
            </button>
          )}
        </div>

        <div className="w-full rounded-3xl border border-sky-800/60 bg-black/80 p-6 shadow-xl shadow-sky-500/20">
          {/* Izbor coina */}
          <p className="mb-3 font-sans text-[15px] font-medium text-slate-50">
            {t('crypto.selectCoin', lang)}
          </p>
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCoin('usdt')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition ${
                coin === 'usdt'
                  ? 'border-sky-500 bg-sky-500/10 text-sky-200'
                  : 'border-sky-700 bg-black/60 text-slate-200 hover:bg-sky-500/5'
              }`}
            >
              <span className="relative inline-flex h-6 w-6">
                <img src="/img/usdt.png" alt="USDT" className="h-6 w-6" />
                <img
                  src="/img/ethereum.png"
                  alt="Ethereum"
                  className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-black/90 p-[1px]"
                />
              </span>
              <span className="font-semibold">{t('crypto.coin.usdt', lang)}</span>
              <span className="text-[11px] text-slate-400">Ethereum</span>
            </button>

            <button
              type="button"
              onClick={() => setCoin('usdc')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition ${
                coin === 'usdc'
                  ? 'border-sky-500 bg-sky-500/10 text-sky-200'
                  : 'border-sky-700 bg-black/60 text-slate-200 hover:bg-sky-500/5'
              }`}
            >
              <span className="relative inline-flex h-6 w-6">
                <img src="/img/usdc.png" alt="USDC" className="h-6 w-6" />
                <img
                  src="/img/ethereum.png"
                  alt="Ethereum"
                  className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-black/90 p-[1px]"
                />
              </span>
              <span className="font-semibold">{t('crypto.coin.usdc', lang)}</span>
              <span className="text-[11px] text-slate-400">Ethereum</span>
            </button>

            <button
              type="button"
              onClick={() => setCoin('eth')}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition ${
                coin === 'eth'
                  ? 'border-sky-500 bg-sky-500/10 text-sky-200'
                  : 'border-sky-700 bg-black/60 text-slate-200 hover:bg-sky-500/5'
              }`}
            >
              <span className="relative inline-flex h-6 w-6">
                <img src="/img/ethereum.png" alt="ETH" className="h-6 w-6" />
                <img
                  src="/img/ethereum.png"
                  alt="Ethereum"
                  className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-black/90 p-[1px]"
                />
              </span>
              <span className="font-semibold">{t('crypto.coin.eth', lang)}</span>
              <span className="text-[11px] text-slate-400">Ethereum</span>
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
              Discount code
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={discountCode}
                  onChange={handleDiscountInputChange}
                  className="min-w-0 flex-1 rounded-full border border-sky-700 bg-black/60 px-4 py-2 text-sm uppercase text-slate-100 outline-none focus:border-sky-400"
                  placeholder="Enter code"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  disabled={checkingDiscount}
                  className="rounded-full border border-sky-500/70 px-4 py-2 text-[12px] font-sans font-semibold uppercase tracking-[0.14em] text-sky-200 transition-colors hover:bg-sky-500/10 disabled:opacity-60"
                >
                  {checkingDiscount ? 'Checking...' : 'Apply'}
                </button>
              </div>
              <p className="mt-2 text-[11px] font-sans normal-case tracking-normal text-slate-400">
                {lang === 'nl'
                  ? 'Voer een geldige code in voor 5% korting op je checkout.'
                  : 'Enter a valid code for 5% off at checkout.'}
              </p>
            </label>
            {discountMessage && <p className="mt-2 text-[11px] text-emerald-400">{discountMessage}</p>}
            {discountError && <p className="mt-2 text-[11px] text-red-400">{discountError}</p>}
          </div>

          {/* Dugme za prikaz adrese - REMOVED since we create automatically */}
          {/* <button
            type="button"
            onClick={revealAddress}
            disabled={loading}
            className="mb-4 flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_18px_rgba(56,189,248,0.7)] transition-all duration-200 hover:-translate-y-1 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Kreiranje uplate…' : 'Prikaži adresu za uplatu'}
          </button> */}

          {loading && (
            <div className="mb-4 flex w-full items-center justify-center rounded-full bg-sky-500/20 px-4 py-2.5 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-sky-200">
              {t('crypto.loading', lang)}
            </div>
          )}

          {err && (
            <p className="mb-3 font-sans text-[13px] text-red-400">
              {err}
            </p>
          )}

          {/* Adresa & QR or invoice fallback */}
          {data && !loading && pay_amount !== null && pay_amount !== undefined && (
            <div className="mt-5 space-y-3 font-sans text-[13px] text-slate-200">
              <div className="rounded-2xl border border-sky-500/40 bg-sky-500/10 p-3 text-sky-100">
                <p className="text-[11px] uppercase tracking-[0.16em] text-sky-300">
                  {lang === 'nl' ? 'Accountprijs' : 'Account price'}
                </p>
                <p className="mt-1 text-[18px] font-semibold text-slate-50">
                  {fiatLabel}
                </p>
                <p className="mt-1 text-[12px] text-slate-400">
                  {lang === 'nl'
                    ? `Je betaalt dezelfde ${fiatCurrency}-prijs. Het tokenbedrag hieronder is alleen de actuele crypto-equivalent voor de gekozen coin.`
                    : `You pay the same ${fiatCurrency} price. The token amount below is only the live crypto equivalent for the selected coin.`}
                </p>
              </div>
              <p>
                {t('crypto.sendExactly', lang)}{' '}
                <span className="font-semibold">
                  {formattedAmount} {displayCurrency}
                </span>{' '}
                {t('crypto.toAddress', lang)}
                {fiatAmount && (
                  <span className="block text-[12px] text-slate-400 mt-1">
                    {lang === 'nl' ? 'Live crypto-equivalent van' : 'Live crypto equivalent of'} {fiatLabel}
                  </span>
                )}
              </p>
              <p className="text-[12px] text-slate-400">
                <button
                  type="button"
                  onClick={() => setShowGuide(true)}
                  className="text-sky-300 hover:text-sky-200 underline underline-offset-2"
                >
                  How do I know if I'm sending the right coin?
                </button>
              </p>

              <p className="break-all font-mono text-[12px] text-sky-100">
                {pay_address}
              </p>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="rounded-full border border-sky-600 px-3 py-1.5 text-[13px] text-sky-200 hover:bg-sky-500/10 transition-colors"
              >
                {t('crypto.copyAddress', lang)}
              </button>
              {copyStatus && (
                <p className="text-[12px] text-sky-300">
                  {copyStatus}
                </p>
              )}

              <div className="mt-4 flex justify-center">
                <QRCodeCanvas value={pay_address} size={190} bgColor="#020617" fgColor="#ffffff" />
              </div>

              <p className="mt-2 text-[12px] text-slate-400">
                {t('crypto.paymentId', lang)} {payment_id}
              </p>
              <p className="mt-1 text-[12px] text-slate-400">
                {t('crypto.afterConfirmation', lang)}
              </p>
            </div>
          )}

          {data && !loading && (pay_amount === null || pay_amount === undefined) && invoice_url && (
            <div className="mt-5 space-y-3 font-sans text-[13px] text-slate-200">
              <p className="text-slate-300">
                {t('crypto.invoiceFallback', lang) || 'Open the invoice to see the exact amount and address.'}
              </p>
              {fiatAmount && (
                <p className="text-[15px] font-semibold text-sky-300">
                  {lang === 'nl' ? 'Accountprijs' : 'Account price'}: {fiatLabel}
                </p>
              )}
              <a
                href={invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-[14px] font-sans font-semibold uppercase tracking-[0.16em] text-black shadow-[0_0_18px_rgba(56,189,248,0.7)] hover:bg-sky-400"
              >
                {t('crypto.openInvoice', lang) || 'Otvori fakturu'}
                <span>↗</span>
              </a>
            </div>
          )}
        </div>
        <section className="mt-8 rounded-3xl border border-sky-800/60 bg-black/80 p-6 shadow-xl shadow-sky-500/20">
          <h2 className="font-display text-[20px] uppercase tracking-[0.14em] text-sky-300">
            Crypto Payment Guide
          </h2>
          <ol className="mt-4 space-y-3 font-sans text-[14px] text-slate-200 list-decimal list-inside">
            <li>
              Select the cryptocurrency you want to use (USDT, USDC, or ETHEREUM) and a unique payment
              address will be generated specifically for your transaction.
            </li>
            <li>
              Copy the provided address (or scan the QR code) and complete the transfer from your wallet

              or exchange.
            </li>
            <li>
              The exact amount to send will be displayed on the screen - please make sure the amount
              matches precisely.
            </li>
          </ol>
          <p className="mt-4 font-sans text-[14px] text-sky-100/90">
            After completing the purchase, you will receive an email with your trading account's login information.
          </p>
        </section>
        <div className="mt-4 w-full rounded-3xl border border-sky-800/50 bg-black/70 p-4 text-left text-[12px] font-sans leading-relaxed text-slate-300 space-y-1">
          <p className="font-semibold text-slate-100">Full name of registered company: Arbex Fund B. V.</p>
          <p>Address: Barbara Strozzilaan 310</p>
          <p>Postal code: 1083 HN</p>
          <p>Contact email: arbexfund@support.com</p>
          <p>Contact phone number: +31 6 19 36 42 04</p>
          <p>AFM License number: 14000716</p>
          <p>Yes, our business is licensed by the AFM (Autoriteit Financiele Markten).</p>
        </div>
      </div>
      <Footer navigate={navigate} />

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0"
            onClick={() => setShowGuide(false)}
          />
          <div className="relative w-full max-w-md rounded-3xl border border-sky-600/60 bg-black p-6 text-slate-100 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="absolute right-3 top-3 text-xl leading-none text-slate-300 hover:text-slate-100"
            >
              ×
            </button>
            <h3 className="font-display text-[18px] uppercase tracking-[0.14em] text-sky-300">
              How do I know if I'm sending the right coin?
            </h3>
            <ol className="mt-4 space-y-3 font-sans text-[14px] text-slate-200 list-decimal list-inside">
              <li>You're using the Ethereum network (ERC-20).</li>
              <li>
                You're sending the correct coin: USDT (Tether), USDC (USD Coin), or ETH (Ethereum).
              </li>
              <li>The wallet address matches exactly what's shown on our payment page.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}


