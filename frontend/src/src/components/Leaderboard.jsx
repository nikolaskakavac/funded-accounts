import user1 from '../../assets/avatars/user1.jpg';
import user2 from '../../assets/avatars/user2.jpg';
import user3 from '../../assets/avatars/user3.jpg';
import user4 from '../../assets/avatars/user4.jpg';
import user5 from '../../assets/avatars/user5.jpg';
import user6 from '../../assets/avatars/user6.jpg';
import user7 from '../../assets/avatars/user7.jpg';

const mockLeaders = [
  { rank: 1, email: 'mar***@gmail.com', profit: 248_730, avatar: user1 },
  { rank: 2, email: 'ana***@outlook.com', profit: 191_420, avatar: user2 },
  { rank: 3, email: 'nik***@proton.me', profit: 136_980, avatar: user3 },
  { rank: 4, email: 'dav***@gmail.com', profit: 74_260, avatar: user4 },
  { rank: 5, email: 'lea***@yahoo.com', profit: 52_890, avatar: user5 },
  { rank: 6, email: 'pet***@gmail.com', profit: 39_440, avatar: user6 },
  { rank: 7, email: 'ivo***@outlook.com', profit: 27_310, avatar: user7 },
];

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
  rank === 1 ? 'h-11 w-11' : rank === 2 ? 'h-10 w-10' : rank === 3 ? 'h-9 w-9' : 'h-8 w-8';

const profitTextSizeByRank = (rank) =>
  rank === 1
    ? 'text-[18px] sm:text-[20px]'
    : rank === 2
    ? 'text-[17px] sm:text-[19px]'
    : rank === 3
    ? 'text-[16px] sm:text-[18px]'
    : 'text-[14px] sm:text-[16px]';

const Leaderboard = () => {
  return (
    <section className="mt-20">
      <div className="relative mx-auto max-w-4xl">
        {/* glow pozadina */}
        <div className="pointer-events-none absolute -inset-2 rounded-[32px] bg-gradient-to-r from-emerald-500/20 via-emerald-400/5 to-cyan-400/20 blur-3xl opacity-60" />

        <div className="relative rounded-3xl border border-emerald-700/70 bg-gradient-to-b from-black/95 via-emerald-950/70 to-black/95 p-5 sm:p-7 shadow-[0_0_60px_rgba(16,185,129,0.35)] overflow-hidden">
          {/* gornji svetlucavi border */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent opacity-70" />

          {/* Header */}
          <div className="mb-6 text-center">
            <p className="font-display text-[11px] uppercase tracking-[0.26em] text-emerald-400/90">
              Leaderboard
            </p>
            <h2 className="mt-1 font-display text-[22px] sm:text-[30px] lg:text-[34px] font-extrabold tracking-[0.18em] uppercase text-emerald-300">
              Top performeri
            </h2>
            <p className="mt-2 font-sans text-[13px] sm:text-[14px] text-emerald-100/80">
              Najuspešniji traderi na funded nalozima po ukupnom ostvarenomm profitu.
            </p>
          </div>

          {/* List */}
          <div className="space-y-3">
            {mockLeaders.map((item) => (
              <div
                key={item.rank}
                className={
                  'group flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-900/40 via-black/90 to-emerald-900/40 px-4 sm:px-5 border border-emerald-800/80 transition-all duration-200 hover:border-emerald-400/80 hover:-translate-y-[2px] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] ' +
                  rowSizeByRank(item.rank)
                }
              >
                {/* Left: rank + avatar + email */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/80 font-sans text-[12px] font-semibold text-emerald-200">
                    #{item.rank}
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <img
                        src={item.avatar}
                        alt="Trader avatar"
                        className={
                          avatarSizeByRank(item.rank) +
                          ' rounded-full object-cover border border-emerald-300/60 transition-transform duration-200 group-hover:scale-105'
                        }
                      />
                      <span className="absolute -bottom-1 -right-1 text-[13px] drop-shadow">
                        {badgeByRank(item.rank)}
                      </span>
                    </div>

                    <div className="font-sans text-emerald-50">
                      <div className="text-[13px] sm:text-[14px]">{item.email}</div>
                      <div className="text-[11px] text-emerald-300/70">Profit share trader</div>
                    </div>
                  </div>
                </div>

                {/* Right: profit */}
                <div className="text-right">
                  <div
                    className={
                      'font-display font-bold text-emerald-400 ' +
                      profitTextSizeByRank(item.rank)
                    }
                  >
                    €
                    {item.profit.toLocaleString('de-DE', {
                      minimumFractionDigits: 0,
                    })}
                  </div>
                  <div className="mt-0.5 font-sans text-[11px] text-emerald-200/70">
                    ukupno od početka
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="mt-4 text-center font-sans text-[11px] sm:text-[12px] text-emerald-100/60">
            Prikazane cifre su primeri performansa na demo i live funded nalozima i služe isključivo
            u informativne svrhe.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
