import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createStripeCheckout, validateAffiliateCode } from '../api';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';
import visaLogo from '/img/visa.png';
import mastercardLogo from '/img/mastercard-logo.svg';
import dinersLogo from '/img/dinersclub.svg';
import unionPayLogo from '/img/unionpay.svg';
import maestroLogo from '/img/maestro.png';

const PLAN_AMOUNT_EUR = {
  '693db3e0e9cf589519c144fe': 150,
  '693db3ede9cf589519c14501': 300,
  '693db3ede9cf589519c14500': 800,
  '1': 150,
  '2': 300,
  '3': 800,
};

const DISCOUNT_RATE = 0.05;

const cardStyle = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#0f172a',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#94a3b8',
      },
    },
    invalid: {
      color: '#e11d48',
      iconColor: '#e11d48',
    },
  },
  placeholder: '0000 0000 0000 0000',
};

function getPlanAmount(planId) {
  const key = planId != null ? String(planId) : '';
  return PLAN_AMOUNT_EUR[key] || 0;
}

function formatEuro(amount) {
  return `${Number(amount || 0).toFixed(2).replace('.00', '')}€`;
}

const OnSiteStripeCheckout = ({ token, planId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [phone, setPhone] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscountCode, setAppliedDiscountCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [checkingDiscount, setCheckingDiscount] = useState(false);
  const lang = getLang();

  const baseAmount = getPlanAmount(planId);
  const discountedAmount = Number((baseAmount * (1 - DISCOUNT_RATE)).toFixed(2));
  const amountToShow = appliedDiscountCode ? discountedAmount : baseAmount;

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setErr(t('onsite.error.unavailable', lang));
      return;
    }

    setErr('');
    setLoading(true);

    try {
      const res = await createStripeCheckout(token, planId, {
        mode: 'intent',
        phone,
        cardholderName,
        discountCode: appliedDiscountCode || discountCode.trim().toUpperCase(),
      });
      const { clientSecret } = res;

      if (!clientSecret) {
        setErr(t('onsite.error.create', lang));
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setErr(t('onsite.error.cardField', lang));
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName || undefined,
            phone: phone || undefined,
          },
        },
      });

      if (result.error) {
        console.error('Stripe confirmCardPayment error:', result.error);
        if (result.error.code === 'resource_missing' || result.error.message?.includes('No such payment_intent')) {
          setErr('Payment session expired. Please refresh the page and try again.');
        } else {
          setErr(result.error.message || 'Card payment failed. Please try again.');
        }
      } else if (result.paymentIntent?.status === 'succeeded') {
        if (onSuccess) {
          onSuccess(result.paymentIntent);
        } else {
          const piId = result.paymentIntent.id;
          const url = `/success?payment_intent=${encodeURIComponent(piId)}&method=card`;
          window.location.href = url;
        }
      }
    } catch (submitError) {
      console.error(submitError);
      setErr(t('onsite.error.stripe', lang));
    } finally {
      setLoading(false);
    }
  };

  const focusCard = () => {
    const card = elements?.getElement(CardElement);
    if (card && card.focus) card.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="space-y-4 mt-4">
        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          {t('onsite.amountToPay', lang)}
          <div className="mt-1 w-full rounded-none border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
            {formatEuro(amountToShow)}
          </div>
          <p className="mt-2 text-[11px] font-sans normal-case tracking-normal text-slate-500">
            {lang === 'nl'
              ? 'Voer hieronder een geldige code in voor 5% korting.'
              : 'Enter a valid code below for a 5% discount.'}
          </p>
        </label>

        <div className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          Discount code
          <div className="mt-1 flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={handleDiscountInputChange}
              className="min-w-0 flex-1 rounded-none border border-slate-300 bg-white px-3 py-2 text-sm uppercase text-slate-900 outline-none focus:border-sky-500/60"
              placeholder="Enter code"
            />
            <button
              type="button"
              onClick={handleApplyDiscount}
              disabled={checkingDiscount}
              className="shrink-0 rounded-none border border-sky-500/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-300 transition hover:bg-sky-500/10 disabled:opacity-60"
            >
              {checkingDiscount ? 'Checking...' : 'Apply'}
            </button>
          </div>
          {discountMessage && <p className="mt-2 text-[11px] normal-case tracking-normal text-emerald-400">{discountMessage}</p>}
          {discountError && <p className="mt-2 text-[11px] normal-case tracking-normal text-red-400">{discountError}</p>}
        </div>

        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          {t('onsite.cardNumber', lang)}
          <div
            className="mt-1 relative z-50 cursor-text rounded-none border border-slate-300 bg-white px-4 py-3"
            onClick={focusCard}
          >
            <div className="flex items-center gap-3">
              <svg className="h-6 w-8 flex-shrink-0 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.5" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
              </svg>
              <div className="flex-1">
                <CardElement options={cardStyle} />
              </div>
            </div>
          </div>
        </label>

        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          {t('onsite.cardholderName', lang)}
          <input
            type="text"
            id="cardholder-name"
            name="cc-name"
            autoComplete="cc-name"
            value={cardholderName}
            onChange={(event) => setCardholderName(event.target.value)}
            className="mt-1 w-full rounded-none border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500/60"
            placeholder="Name on card"
          />
        </label>

        <label className="block text-xs font-sans uppercase tracking-[0.12em] text-slate-400">
          {t('onsite.phone', lang)}
          <input
            type="tel"
            id="billing-phone"
            name="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-1 w-full rounded-none border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500/60"
            placeholder={t('onsite.phonePlaceholder', lang)}
          />
        </label>
      </div>

      {err && <p className="text-xs text-red-400">{err}</p>}

      <div className="mt-6 border-t border-slate-700 pt-4">
        <p className="mb-3 text-center text-xs font-sans text-slate-400">We accept payments with the following cards</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <img src={visaLogo} alt="Visa" className="h-6 w-10 object-contain" />
          <img src={mastercardLogo} alt="Mastercard" className="h-6 w-10 object-contain" />
          <img src={dinersLogo} alt="Diners Club" className="h-6 w-12 object-contain" />
          <img src={unionPayLogo} alt="UnionPay" className="h-6 w-12 object-contain" />
          <img src={maestroLogo} alt="Maestro" className="h-6 w-12 object-contain" />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-6 w-full rounded-2xl bg-sky-500 py-3 text-sm font-sans font-semibold uppercase tracking-[0.18em] text-black transition-all duration-200 hover:-translate-y-[1px] hover:bg-sky-400 disabled:opacity-60"
      >
        {loading ? t('onsite.submit.processing', lang) : t('onsite.submit.pay', lang)}
      </button>
    </form>
  );
};

export default OnSiteStripeCheckout;
