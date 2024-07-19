import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useResizeDetector } from "react-resize-detector";
import CoinButton from "./CoinButton";
import { CoinCarouselSkeleton } from "../skeletons";
import { capitalizeFirstLetter } from "@/utils/formatText";
import { selectCoinIds } from "@/lib/features/charts/chartSlice";
import { coinsFetchStatus } from "@/lib/features/coins/coinsSlice";

const CoinsCarousel = ({
  setCoinFetchById,
  coins,
  coinDataError,
}: {
  setCoinFetchById: (coinId: string, symbol: string) => void;
  coins: Coins[];
  coinDataError: boolean;
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [coinsPerGroup, setCoinsPerGroup] = useState(5);
  const coinIds = useSelector(selectCoinIds);
  const coinsStatus = useSelector(coinsFetchStatus);

  const onResize = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth > 1280) {
      if (coinsPerGroup === 5) return;
      setCoinsPerGroup(5);
    } else if (windowWidth > 1024) {
      if (coinsPerGroup === 4) return;
      setCoinsPerGroup(4);
    } else if (windowWidth > 768) {
      if (coinsPerGroup === 3) return;
      setCoinsPerGroup(3);
    } else {
      if (coinsPerGroup === 2) return;
      setCoinsPerGroup(2);
    }
  }, [coinsPerGroup]);

  const { ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: "debounce",
    refreshRate: 1000,
    onResize,
  });

  let groupedCoinDisplay = [];
  for (let i = 0; i < coins.length; i += coinsPerGroup) {
    let groupedCoins = [];
    for (let j = 0; j < coinsPerGroup && i + j < coins.length; j++) {
      groupedCoins.push(coins[i + j]);
    }
    groupedCoinDisplay.push(groupedCoins);
  }

  return (
    <div className="relative h-[78px] mb-10">
      <ErrorBoundary fallback={<p>Something went wrong...</p>}>
        {coinsStatus === "loading" || coinsStatus === "idle" ? (
          <CoinCarouselSkeleton />
        ) : (
          <>
            <div className="relative h-full">
              {coinDataError && (
                <span className="absolute -top-[100%] translate-y-1/2 left-1/2 -translate-x-1/2 text-red">
                  Only two coins can be compared at a time. First unselect a
                  coin.
                </span>
              )}
              <div className="w-full h-full overflow-x-hidden" ref={ref}>
                <ul className="absolute w-full flex gap-2 overflow-x-hidden">
                  {groupedCoinDisplay[carouselIndex].map((coin, _) => {
                    const active = coinIds.includes(
                      capitalizeFirstLetter(coin.id)
                    );
                    return (
                      <CoinButton
                        key={coin.id}
                        {...{ setCoinFetchById, coin, active }}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
            {carouselIndex > 0 && (
              <button
                className="absolute min-w-[48px] aspect-square rounded-full active-button flex items-center justify-center top-1/2 -translate-y-1/2 -left-[24px]"
                onClick={() => setCarouselIndex(carouselIndex - 1)}
              >
                <FiChevronLeft className="w-[1.75rem] h-[3.5rem]" />
              </button>
            )}
            {carouselIndex < groupedCoinDisplay.length - 1 && (
              <button
                className="absolute min-w-[48px] aspect-square rounded-full active-button flex items-center justify-center top-1/2 -translate-y-1/2 -right-[24px]"
                onClick={() => setCarouselIndex(carouselIndex + 1)}
              >
                <FiChevronRight className="w-[1.75rem] h-[3.5rem]" />
              </button>
            )}
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default CoinsCarousel;
