const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const bgColor = "bg-dark-purple-800";

export function CarouselCoinButtonSkeleton() {
  return (
    <li
      className={`relative w-full max-w-[253.5px] h-[78px] basis-[20%] bg-dark-purple-700 rounded-md overflow-hidden`}
    >
      <div className={`${shimmer} flex shrink-0 items-center gap-4 p-4`}>
        <div className="flex items-center gap-4">
          <div className={`w-[32px] h-[32px] ${bgColor} rounded-full`}></div>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className={`w-[160px] h-[16px] ${bgColor}`}></h5>
          <p className={`w-[164px] h-[18px] ${bgColor}`}></p>
        </div>
      </div>
    </li>
  );
}

export function CoinCarouselSkeleton() {
  return (
    <ul className="absolute flex gap-2">
      <CarouselCoinButtonSkeleton />
      <CarouselCoinButtonSkeleton />
      <CarouselCoinButtonSkeleton />
      <CarouselCoinButtonSkeleton />
      <CarouselCoinButtonSkeleton />
    </ul>
  );
}

export function CoinsChartCardSkeleton() {
  return (
    <div className={`${shimmer}`}>
      <div>
        <p className={`w-40 h-6 mb-6 ${bgColor}`}></p>
        <h3 className={`w-40 h-7 mb-4 ${bgColor}`}></h3>
        <p className={`w-40 h-6 mb-6 ${bgColor}`}></p>
      </div>
      <div className={`h-52 ${bgColor}`}></div>
    </div>
  );
}

export function CoinsTableRowSkeleton() {
  return (
    <li className="relative h-[77px] px-5 py-[22.5px] rounded-xl bg-white dark:bg-dark-purple-700 overflow-hidden">
      <div className={`${shimmer} w-full h-[77px]`}>
        <div className="h-[28px] bg-dark-purple-400 rounded-full"></div>
      </div>
    </li>
  );
}

export function CoinsTableRowSectionSkeleton() {
  return (
    <ul className="w-full flex flex-col gap-2">
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
      <CoinsTableRowSkeleton />
    </ul>
  );
}

export function CoinsConvertorCardSkeleton() {
  return <div>Loading...</div>;
}

export function CoinsConvertorSectionSkeleton() {
  return (
    <div>
      <CoinsConvertorCardSkeleton />
      <CoinsConvertorCardSkeleton />
    </div>
  );
}

export function CoinsConvertorChartSkeleton() {
  return (
    <div
      className={`h-[293px] ${shimmer} bg-dark-purple-600 rounded-2xl`}
    ></div>
  );
}

export function CoinsPageSkeleton() {
  return (
    <div>
      {/* upper section */}
      <div className="flex gap-[60px] mb-20">
        {/* left side */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden">
              <div
                className={`w-[305px] h-[265px] rounded-xl ${shimmer} ${bgColor}`}
              ></div>
            </div>
            <div className="relative overflow-hidden">
              <div
                className={`w-[305px] h-[52px] rounded-xl ${shimmer} ${bgColor}`}
              ></div>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div
              className={`w-[355px] h-[333px] rounded-xl ${shimmer} ${bgColor}`}
            ></div>
          </div>
        </div>
        {/* right side */}
        <div className="relative overflow-hidden">
          <div
            className={`w-[544px] h-[420px] rounded-xl ${shimmer} ${bgColor}`}
          ></div>
        </div>
      </div>
      {/* lower section */}
      <div className="flex gap-[60px] mb-[72px]">
        <div className="w-[692px] h-[250px]"></div>
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden">
            <div
              className={`w-[544px] h-[52px] rounded-xl ${shimmer} ${bgColor}`}
            ></div>
          </div>
          <div className="relative overflow-hidden">
            <div
              className={`w-[544px] h-[52px] rounded-xl ${shimmer} ${bgColor}`}
            ></div>
          </div>
          <div className="relative overflow-hidden">
            <div
              className={`w-[544px] h-[52px] rounded-xl ${shimmer} ${bgColor}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioCardSkeleton() {
  return <div>portfolio card skeleton</div>;
}

export function PortfolioCoinsSectionSkeleton() {
  return (
    <ul>
      <PortfolioCardSkeleton />
      <PortfolioCardSkeleton />
    </ul>
  );
}
