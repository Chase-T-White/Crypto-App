const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

const bgColor = "bg-dark-purple-800";

export function CarouselCoinButtonSkeleton() {
  return (
    <li
      className={`w-[calc(20%-6px)] max-w-[253.5px] h-[78px] flex shrink-0 items-center gap-4 p-4 bg-dark-purple-700 rounded-md`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-[32px] h-[32px] ${bgColor} rounded-full`}></div>
      </div>
      <div className="flex flex-col gap-1">
        <h5 className={`w-[160px] h-[16px] ${bgColor}`}></h5>
        <p className={`w-[164px] h-[18px] ${bgColor}`}></p>
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
    <div className={`${shimmer} grow p-6 bg-dark-purple-600 rounded-xl`}>
      <div>
        <p className={`w-40 h-6 mb-6 ${bgColor}`}></p>
        <h3 className={`w-40 h-7 mb-4 ${bgColor}`}></h3>
        <p className={`w-40 h-6 mb-6 ${bgColor}`}></p>
      </div>
      <div className="h-52 ${bgColor}"></div>
    </div>
  );
}
