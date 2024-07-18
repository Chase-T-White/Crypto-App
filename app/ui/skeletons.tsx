const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-light-purple-200 before:to-transparent";

const bgColor = "bg-dark-blue-300";

export function BannerSkeleton() {
  return (
    <div className="w-full h-4 flex justify-center gap-4 sm: sm:gap-8">
      <div
        className={`relative overflow-hidden hidden sm:flex w-[90px] h-4 bg-dark-purple-700 rounded-full ${shimmer} ${bgColor}`}
      ></div>
      <div
        className={`relative overflow-hidden hidden sm:flex w-[90px] h-4 bg-dark-purple-700 rounded-full ${shimmer} ${bgColor}`}
      ></div>
      <div
        className={`relative overflow-hidden hidden md:flex w-[90px] h-4 bg-dark-purple-700 rounded-full ${shimmer} ${bgColor}`}
      ></div>
      <div
        className={`relative overflow-hidden w-[90px] h-4 bg-dark-purple-700 rounded-full ${shimmer} ${bgColor}`}
      ></div>
      <div
        className={`relative overflow-hidden w-[90px] h-4 bg-dark-purple-700 rounded-full ${shimmer} ${bgColor}`}
      ></div>
      <div
        className={`relative overflow-hidden w-[90px] h-4 bg-dark-purple-700 rounded-full ${shimmer} ${bgColor}`}
      ></div>
    </div>
  );
}

export function CarouselCoinButtonSkeleton() {
  return (
    <li
      className={`relative w-full max-w-[253.5px] h-[78px] basis-[20%] bg-dark-purple-700 rounded-md overflow-hidden`}
    ></li>
  );
}

export function CoinCarouselSkeleton() {
  return (
    <ul className="flex gap-2">
      <li
        className={`hidden xl:inline relative w-full max-w-[253.5px] h-[78px] basis-1/2 md:basis-[33%] lg:basis-[24%] xl:basis-[19%] ${shimmer} ${bgColor} rounded-md overflow-hidden`}
      ></li>
      <li
        className={`hidden lg:inline relative w-full max-w-[253.5px] h-[78px] basis-1/2 md:basis-[33%] lg:basis-[24%] xl:basis-[19%] ${shimmer} ${bgColor} rounded-md overflow-hidden`}
      ></li>
      <li
        className={`hidden md:inline relative w-full max-w-[253.5px] h-[78px] basis-1/2 md:basis-[33%] lg:basis-[24%] xl:basis-[19%] ${shimmer} ${bgColor} rounded-md overflow-hidden`}
      ></li>
      <li
        className={`relative w-full max-w-[253.5px] h-[78px] basis-1/2 md:basis-[33%] lg:basis-[24%] xl:basis-[19%] ${shimmer} ${bgColor} rounded-md overflow-hidden`}
      ></li>
      <li
        className={`relative w-full max-w-[253.5px] h-[78px] basis-1/2 md:basis-[33%] lg:basis-[24%] xl:basis-[19%] ${shimmer} ${bgColor} rounded-md overflow-hidden`}
      ></li>
    </ul>
  );
}

export function CoinsChartCardSkeleton() {
  return <div className={`${shimmer} ${bgColor}`}></div>;
}

export function CoinsTableRowSkeleton() {
  return (
    <li
      className={`relative h-[77px] px-5 py-[22.5px] rounded-xl ${shimmer} ${bgColor} overflow-hidden`}
    ></li>
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
  return (
    <div
      className={`relative overflow-hidden h-[293px] ${shimmer} ${bgColor} rounded-2xl`}
    ></div>
  );
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
      className={`relative overflow-hidden h-[293px] ${shimmer} ${bgColor} rounded-2xl`}
    ></div>
  );
}

export function CoinsPageSkeleton() {
  return (
    <div>
      {/* upper section */}
      <div className="flex flex-wrap justify-center xl:justify-between gap-6 mb-20">
        {/* left side */}
        <div className="flex flex-col items-center sm:flex-row sm:items-stretch gap-6 justify-between">
          <div className="grow max-w-[350px] sm:max-w-[305px] flex flex-col gap-4">
            <div
              className={`relative overflow-hidden w-[305px] h-[265px] rounded-xl ${shimmer} ${bgColor}`}
            ></div>
            <div
              className={`relative overflow-hidden w-[305px] h-[52px] rounded-xl ${shimmer} ${bgColor}`}
            ></div>
          </div>
          <div
            className={`relative overflow-hidden w-[355px] h-[333px] rounded-xl ${shimmer} ${bgColor}`}
          ></div>
        </div>
        {/* right side */}
        <div
          className={`shrink-0 relative overflow-hidden w-[544px] h-[420px] rounded-xl ${shimmer} ${bgColor}`}
        ></div>
      </div>
      {/* lower section */}
      <div className="w-full flex justify-center flex-wrap md:flex-nowrap gap-[60px]">
        <div className="hidden sm:block w-[692px] h-[250px]"></div>
        <div className="flex flex-col gap-6">
          <div
            className={`relative overflow-hidden w-[350px] sm:w-[544px] h-[52px] rounded-xl ${shimmer} ${bgColor}`}
          ></div>
          <div
            className={`relative overflow-hidden w-[350px] sm:w-[544px] h-[52px] rounded-xl ${shimmer} ${bgColor}`}
          ></div>
          <div
            className={`relative overflow-hidden w-[350px] sm:w-[544px] h-[52px] rounded-xl ${shimmer} ${bgColor}`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioCardSkeleton() {
  return (
    <div
      className={`relative overflow-hidden w-[340px] xsm:w-[450px] md:w-[750px] lg:w-[1000px] h-[400px] md:h-[216px] rounded-xl ${shimmer} ${bgColor}`}
    ></div>
  );
}

export function PortfolioCoinsSectionSkeleton() {
  return (
    <ul className="flex flex-col items-center gap-6">
      <PortfolioCardSkeleton />
      <PortfolioCardSkeleton />
    </ul>
  );
}
