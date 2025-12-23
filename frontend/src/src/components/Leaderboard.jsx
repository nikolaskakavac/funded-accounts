import user1 from '../../assets/avatars/user1.jpg?as=webp&width=80';
import user2 from '../../assets/avatars/user2.jpg?as=webp&width=80';
import user3 from '../../assets/avatars/user3.jpg?as=webp&width=80';
import user4 from '../../assets/avatars/user4.jpg?as=webp&width=80';
import user5 from '../../assets/avatars/user5.jpg?as=webp&width=80';
import user6 from '../../assets/avatars/user6.jpg?as=webp&width=80';
import user7 from '../../assets/avatars/user7.jpg?as=webp&width=80';

const mockLeaders = [
  { rank: 1, email: 'mar***@gmail.com', profit: 248_730, avatar: user1 },
  { rank: 2, email: 'ana***@outlook.com', profit: 191_420, avatar: user2 },
  { rank: 3, email: 'nik***@proton.me', profit: 136_980, avatar: user3 },
  { rank: 4, email: 'dav***@gmail.com', profit: 74_260, avatar: user4 },
  { rank: 5, email: 'lea***@yahoo.com', profit: 52_890, avatar: user5 },
  { rank: 6, email: 'pet***@gmail.com', profit: 39_440, avatar: user6 },
  { rank: 7, email: 'ivo***@outlook.com', profit: 27_310, avatar: user7 },
];

const Leaderboard = () => {
  const badgeByRank = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🔥';
  };

  const rowSizeByRank = (rank) =>
    rank === 1
      ? 'py-4 sm:py-5'
      : rank === 2
      ? 'py-3.5 sm:py-4.5'
      : rank === 3
      ? 'py-3.5 sm:py-4'
      : 'py-3 sm:py-3.5';

  const avatarSizeByRank = (rank) =>
    rank === 1 ? 'h-12 w-12' : rank === 2 ? 'h-11 w-11' : rank === 3 ? 'h-10 w-10' : 'h-9 w-9';

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
    <section className="mt-16 px-4 sm:px-0">
      <div className="relative mx-auto max-w-md sm:max-w-2xl">
        <div className="relative rounded-[28px] p-5 sm:p-6 bg-gradient-to-b from-black/95 via-emerald-950/70 to-black/95 border border-emerald-700/70 shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <p className="font-display text-[12px] sm:text-[14px] uppercase tracking-[0.26em] text-emerald-400/90">
              Leaderboard
            </p>
            <h2 className="mt-2 font-display text-[24px] sm:text-[32px] lg:text-[36px] font-extrabold tracking-[0.18em] uppercase text-emerald-300">
              Top performeri
            </h2>
            <p className="mt-3 font-sans text-[14px] sm:text-[16px] text-emerald-100/80">
              Najuspešniji traderi na funded nalozima po ukupnom profitu.
            </p>
          </div>

          {/* List */}
          <div className="space-y-3 sm:space-y-4">
            {mockLeaders.map((item, index) => (
              <div
                key={item.rank}
                className={
                  'flex items-center justify-between gap-3 sm:gap-4 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-black/90 to-emerald-900/40 px-4 sm:px-6 border border-emerald-800/80 shadow-sm hover:shadow-emerald-500/20 transition-shadow ' +
                  rowSizeByRank(item.rank)
                }
              >
                {/* Left side */}
                <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/80 font-sans text-[13px] sm:text-[14px] font-semibold text-emerald-200 flex-shrink-0">
                    #{item.rank}
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.avatar}
                        alt={`Trader ${item.rank}`}
                        width={80}
                        height={80}
                        loading="lazy"
                        className={
                          avatarSizeByRank(item.rank) +
                          ' rounded-full object-cover border-2 border-emerald-300/60 shadow-lg'
                        }
                        decoding="async"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 text-[14px] sm:text-[16px] drop-shadow-md p-0.5">
                        {badgeByRank(item.rank)}
                      </span>
                    </div>

                    <div className="font-sans text-emerald-50 min-w-0 flex-1">
                      <div className="text-[14px] sm:text-[16px] truncate font-medium">{item.email}</div>
                      <div className="text-[11px] sm:text-[13px] text-emerald-300/80 mt-0.5">
                        Profit share trader
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: profit */}
                <div className="text-right flex-shrink-0 ml-4">
                  <div
                    className={
                      'font-display font-bold text-emerald-400 drop-shadow-md ' + profitTextSizeByRank(item.rank)
                    }
                  >
                    €{formattedProfits[index]}
                  </div>
                  <div className="mt-1 font-sans text-[13px] sm:text-[15px] text-emerald-200/80 font-medium">
                    ukupno od početka
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="mt-6 text-center font-sans text-[12px] sm:text-[14px] text-emerald-100/60 leading-relaxed">
            Prikazane cifre su primeri performansi na demo i live funded nalozima.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
