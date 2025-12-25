// Avatars removed per request (bez slike)

const mockLeaders = [
  { rank: 1, firstName: 'Damjan', lastName: 'Gotal', email: 'damjan_gotal87@gmail.com', countryFlag: '/img/croatia.png', countryName: 'Croatia', profit: 65_012 },
  { rank: 2, firstName: 'Marko', lastName: 'Stojanović', email: 'stojanovic_m303@gmail.com', countryFlag: '/img/serbia.svg', countryName: 'Serbia', profit: 33_950 },
  { rank: 3, firstName: 'Ivan', lastName: 'Kućina', email: 'kucina.ivan977@gmail.com', countryFlag: '/img/serbia.svg', countryName: 'Serbia', profit: 31_400 },
  { rank: 4, firstName: 'Olga', lastName: 'Panova', email: 'olga.panova.office@gmail.com', countryFlag: '/img/russia.jpg', countryName: 'Russia', profit: 27_632 },
  { rank: 5, firstName: 'Sergey', lastName: 'Dorofeev', email: 'sergey.dorofeev1985@yandex.ru', countryFlag: '/img/russia.jpg', countryName: 'Russia', profit: 27_470 },
  { rank: 6, firstName: 'Bojan', lastName: 'Lukić', email: 'bojan_lukic5@gmail.com', countryFlag: '/img/serbia.svg', countryName: 'Serbia', profit: 27_113 },
  { rank: 7, firstName: 'Andrej', lastName: 'Grbović', email: 'grbovic_andrej55@gmail.com', countryFlag: '/img/serbia.svg', countryName: 'Serbia', profit: 22_000 },
  { rank: 8, firstName: 'Nikola', lastName: 'Milić', email: 'nikola.milicnm@gmail.com', countryFlag: '/img/montenegro.png', countryName: 'Montenegro', profit: 18_371 },
  { rank: 9, firstName: 'Ana', lastName: 'Jojić', email: 'anna.ryabova1979@yandex.ru', countryFlag: '/img/serbia.svg', countryName: 'Serbia', profit: 15_114 },
  { rank: 10, firstName: 'Miroslav', lastName: 'Kosta', email: 'miroslav.kosta.investor@gmail.com', countryFlag: '/img/serbia.svg', countryName: 'Serbia', profit: 12_806 },
];

const Leaderboard = () => {

  const rowSizeByRank = (rank) =>
    rank === 1
      ? 'py-4 sm:py-5'
      : rank === 2
      ? 'py-3.5 sm:py-4.5'
      : rank === 3
      ? 'py-3.5 sm:py-4'
      : 'py-3 sm:py-3.5';

  // Avatars removed; no avatar sizing needed

  const profitTextSizeByRank = (rank) =>
    rank === 1
      ? 'text-[22px] sm:text-[26px]'
      : rank === 2
      ? 'text-[21px] sm:text-[24px]'
      : rank === 3
      ? 'text-[20px] sm:text-[22px]'
      : 'text-[18px] sm:text-[20px]';

  // Pre-compute profit strings za brži render
  const formattedProfits = mockLeaders.map(item => 
    item.profit.toLocaleString('de-DE', { minimumFractionDigits: 0 })
  );

  return (
    <section className="mt-16 px-1 sm:px-4 lg:px-0">
      <div className="relative mx-auto max-w-5xl">
        <div className="relative rounded-[28px] p-3 sm:p-5 lg:p-7 bg-gradient-to-b from-black/95 via-slate-900/80 to-black/95 shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <p className="font-display text-[12px] sm:text-[14px] uppercase tracking-[0.26em] text-green-400/90">
              LEADERBOARD
            </p>
            <h2 className="mt-2 font-display text-[24px] sm:text-[32px] lg:text-[36px] font-extrabold tracking-[0.18em] uppercase text-slate-100">
              TOP 10 KLIJENATA
            </h2>
          </div>

          {/* List */}
          <div className="space-y-3 sm:space-y-4">
            {mockLeaders.map((item, index) => (
              <div
                key={item.rank}
                className={
                  'flex items-center justify-between gap-3 sm:gap-5 rounded-2xl bg-gradient-to-r from-slate-900/60 via-black/90 to-slate-900/60 px-5 sm:px-7 shadow-sm hover:shadow-green-500/20 transition-shadow ' +
                  rowSizeByRank(item.rank)
                }
              >
                {/* Left side */}
                <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-green-500/15 border border-green-400/80 font-sans text-[13px] sm:text-[14px] font-semibold text-green-200 flex-shrink-0">
                    #{item.rank}
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="font-sans text-emerald-50 min-w-0 flex-1">
                      <div className="text-[14px] sm:text-[16px] truncate font-medium flex items-center gap-2">
                        <img src={item.countryFlag} alt={item.countryName} className="h-5 w-6 object-cover rounded-sm" />
                        <span>{item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : item.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: profit */}
                <div className="text-right flex-shrink-0 ml-4">
                  <div
                    className={
                      'font-display font-bold text-green-400 drop-shadow-md ' + profitTextSizeByRank(item.rank)
                    }
                  >
                    {formattedProfits[index]}€
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
  
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
