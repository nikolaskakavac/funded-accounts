import Header from '../components/Header';
import Footer from '../components/Footer';
import { t } from '../utils/translations';
import { getLang } from '../utils/lang';

export default function Instruments({ navigate, token, onLogout }) {
  const lang = getLang();

  const mostPopular = [
    'Gold', 'Silver', 'Bitcoin (BTC)', 'Ethereum (ETH)',
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF',
    'AUD/USD', 'NZD/USD', 'US500 (S&P 500)', 'NAS100 (NASDAQ 100)',
    'UK100 (FTSE 100)', 'DE30 (DAX 30)', 'JP225 (Nikkei 225)',
    'Brent Oil', 'WTI Oil', 'Apple (AAPL)', 'Tesla (TSLA)',
    'Amazon (AMZN)', 'Microsoft (MSFT)', 'Meta (META)'
  ];

  const forexPairs = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'NZD/USD', 'USD/CAD',
    'EUR/GBP', 'EUR/JPY', 'GBP/JPY', 'AUD/JPY', 'AUD/NZD', 'NZD/JPY', 'CAD/JPY',
    'EUR/AUD', 'EUR/CAD', 'GBP/AUD', 'GBP/CAD', 'USD/SGD', 'USD/TRY', 'EUR/TRY',
    '…and dozens more'
  ];

  const indices = [
    'US500 (S&P 500)', 'NAS100 (NASDAQ 100)', 'UK100 (FTSE 100)', 'DE30 (DAX 30)',
    'JP225 (Nikkei 225)', 'AU50 (Australia)', 'EU50 (Euro Stoxx 50)', 'CN50 (China)',
    'HK50 (Hong Kong)', 'SP400 (Mid-cap US companies)', '…all major regional indices'
  ];

  const commodities = [
    'Gold', 'Silver', 'Platinum', 'Palladium', 'Copper', 'Oil (Brent & WTI)',
    'Natural Gas', 'Coffee', 'Cotton', 'Wheat', 'Sugar', 'Corn', 'Soybeans',
    '…and other traded commodities'
  ];

  const stocks = [
    'Apple', 'Tesla', 'Amazon', 'Microsoft', 'Meta', 'Google (Alphabet)',
    'Netflix', 'Nike', 'Coca‑Cola', 'Visa', 'JPMorgan Chase', 'ExxonMobil',
    'Shell', 'Novartis', 'LVMH', 'SAP', 'Siemens', 'Intel', 'Nvidia',
    'Twitter/X', 'Boeing', 'Disney', 'PepsiCo', 'Mastercard', 'Pfizer',
    'Oracle', 'Adobe', '…hundreds more US, UK, European companies'
  ];

  const etfs = [
    'Technology ETFs', 'Clean Energy ETFs', 'Healthcare ETFs', 'Financial ETFs',
    'Commodity ETFs', 'Robotics ETFs', 'Biotech ETFs', 'Real Estate ETFs',
    'Emerging Market ETFs', 'AI / Innovation ETFs'
  ];

  const cryptocurrencies = [
    'Bitcoin (BTC)', 'Ethereum (ETH)', 'Litecoin (LTC)', 'Ripple (XRP)',
    'Cardano (ADA)', 'Solana (SOL)', 'Polkadot (DOT)', 'Avalanche (AVAX)',
    'Dogecoin (DOGE)', 'Shiba Inu (SHIB)', 'Chainlink (LINK)', 'Polygon (MATIC)',
    'Stellar (XLM)', 'Tron (TRX)', 'Uniswap (UNI)', 'Bitcoin Cash (BCH)',
    'Ethereum Classic (ETC)', 'Monero (XMR)', 'Dash (DASH)', 'Tezos (XTZ)',
    'VeChain (VET)', '…and dozens more'
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-sky-950 to-black text-slate-50 flex flex-col">
      <Header navigate={navigate} token={token} onLogout={onLogout} showBackLink={true} />
      
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 flex-1">
        {/* Most Popular Section */}
        <section className="mb-10 rounded-3xl border border-sky-800/60 bg-gradient-to-r from-[#02110b] via-black to-[#02110b] p-6 sm:p-8">
          <h2 className="font-display text-[20px] sm:text-[24px] font-extrabold tracking-[0.08em] uppercase text-sky-300 mb-6">
            {t('instruments.mostPopular', lang)}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {mostPopular.map((item) => (
              <div
                key={item}
                className="px-4 py-3 rounded-xl bg-black/60 border border-sky-500/30 text-center font-sans text-[14px] text-sky-100 hover:bg-sky-500/10 hover:border-sky-400 transition-all"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Cryptocurrencies Section */}
        <section className="mb-10 rounded-3xl border border-sky-800/60 bg-black/80 p-6 sm:p-8">
          <h3 className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[0.08em] text-sky-300 mb-3">
            {t('instruments.crypto', lang)}
          </h3>
          <p className="font-sans text-[14px] text-sky-100/90 mb-4">
            {t('instruments.cryptoDesc', lang)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sky-100/70 font-sans text-[13px]">
            {cryptocurrencies.map((crypto) => (
              <div key={crypto} className="flex items-center">
                <span className="mr-2 text-sky-400">•</span> {crypto}
              </div>
            ))}
          </div>
        </section>

        {/* Forex Section */}
        <section className="mb-10 rounded-3xl border border-sky-800/60 bg-black/80 p-6 sm:p-8">
          <h3 className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[0.08em] text-sky-300 mb-3">
            {t('instruments.forex', lang)}
          </h3>
          <p className="font-sans text-[14px] text-sky-100/90 mb-4">
            {t('instruments.forexDesc', lang)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sky-100/70 font-sans text-[13px]">
            {forexPairs.map((pair) => (
              <div key={pair} className="flex items-center">
                <span className="mr-2 text-sky-400">•</span> {pair}
              </div>
            ))}
          </div>
        </section>

        {/* Indices Section */}
        <section className="mb-10 rounded-3xl border border-sky-800/60 bg-black/80 p-6 sm:p-8">
          <h3 className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[0.08em] text-sky-300 mb-3">
            {t('instruments.indices', lang)}
          </h3>
          <p className="font-sans text-[14px] text-sky-100/90 mb-4">
            {t('instruments.indicesDesc', lang)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sky-100/70 font-sans text-[13px]">
            {indices.map((index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 text-sky-400">•</span> {index}
              </div>
            ))}
          </div>
        </section>

        {/* Commodities Section */}
        <section className="mb-10 rounded-3xl border border-sky-800/60 bg-black/80 p-6 sm:p-8">
          <h3 className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[0.08em] text-sky-300 mb-3">
            {t('instruments.commodities', lang)}
          </h3>
          <p className="font-sans text-[14px] text-sky-100/90 mb-4">
            {t('instruments.commoditiesDesc', lang)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sky-100/70 font-sans text-[13px]">
            {commodities.map((item) => (
              <div key={item} className="flex items-center">
                <span className="mr-2 text-sky-400">•</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Stocks Section */}
        <section className="mb-10 rounded-3xl border border-sky-800/60 bg-black/80 p-6 sm:p-8">
          <h3 className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[0.08em] text-sky-300 mb-3">
            {t('instruments.stocks', lang)}
          </h3>
          <p className="font-sans text-[14px] text-sky-100/90 mb-4">
            {t('instruments.stocksDesc', lang)}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sky-100/70 font-sans text-[13px]">
            {stocks.map((stock) => (
              <div key={stock} className="flex items-center">
                <span className="mr-2 text-sky-400">•</span> {stock}
              </div>
            ))}
          </div>
        </section>

        {/* ETFs Section */}
        <section className="mb-10 rounded-3xl border border-sky-800/60 bg-black/80 p-6 sm:p-8">
          <h3 className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[0.08em] text-sky-300 mb-3">
            {t('instruments.etfs', lang)}
          </h3>
          <p className="font-sans text-[14px] text-sky-100/90 mb-4">
            {t('instruments.etfsDesc', lang)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sky-100/70 font-sans text-[13px]">
            {etfs.map((etf) => (
              <div key={etf} className="flex items-center">
                <span className="mr-2 text-sky-400">•</span> {etf}
              </div>
            ))}
          </div>
        </section>

        {/* Futures Section */}
        <section className="mb-10 rounded-3xl border border-sky-800/60 bg-black/80 p-6 sm:p-8">
          <h3 className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[0.08em] text-sky-300 mb-3">
            {t('instruments.futures', lang)}
          </h3>
          <p className="font-sans text-[14px] text-sky-100/90 mb-4">
            {t('instruments.futuresDesc', lang)}
          </p>
          <ul className="space-y-2 text-sky-100/70 font-sans text-[13px]">
            <li className="flex items-center">
              <span className="mr-2 text-sky-400">•</span> Oil futures
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-sky-400">•</span> Stock index futures
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-sky-400">•</span> Commodity futures
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-sky-400">•</span> Currency futures
            </li>
          </ul>
        </section>

        {/* Other Markets Section */}
        <section className="mb-12 rounded-3xl border border-sky-800/60 bg-black/80 p-6 sm:p-8">
          <h3 className="font-display text-[18px] sm:text-[22px] font-extrabold tracking-[0.08em] text-sky-300 mb-3">
            {t('instruments.other', lang)}
          </h3>
          <ul className="space-y-2 text-sky-100/70 font-sans text-[13px]">
            {t('instruments.otherItems', lang).split(';').map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-sky-400 mt-0.5">•</span>
                <span>{item.trim()}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-gradient-to-r from-sky-500/10 via-transparent to-sky-500/10 rounded-3xl border border-sky-500/30 p-8 mb-12">
          <p className="font-sans text-[15px] text-sky-100/90">
            {t('instruments.contact', lang)}
          </p>
        </section>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}


