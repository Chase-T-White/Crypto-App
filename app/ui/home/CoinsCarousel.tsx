import React, { useState } from "react";
import CoinButton from "./CoinButton";
import { useSelector } from "react-redux";
import { selectCoinIds } from "@/lib/features/charts/chartSlice";
import { coinsFetchStatus } from "@/lib/features/coins/coinsSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinCarouselSkeleton } from "../skeletons";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { capitalizeFirstLetter } from "@/utils/formatText";

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
  const coinIds = useSelector(selectCoinIds);
  const coinsStatus = useSelector(coinsFetchStatus);

  let groupedCoinDisplay = [];

  for (let i = 0; i < coins.length; i += 5) {
    let groupedCoins = [];
    for (let j = 0; j < 5; j++) {
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
            <div className="relative h-[78px]">
              {coinDataError && (
                <span className="absolute -top-[100%] translate-y-1/2 left-1/2 -translate-x-1/2 text-red">
                  Only two coins can be compared at a time. First unselect a
                  coin.
                </span>
              )}
              <div className="w-full overflow-x-hidden">
                <ul className="absolute w-full flex gap-2">
                  {groupedCoinDisplay[carouselIndex].map((coin, i) => {
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
                className="absolute w-[48px] aspect-square rounded-full active-button flex items-center justify-center top-1/2 -translate-y-1/2 -left-10"
                onClick={() => setCarouselIndex(carouselIndex - 1)}
              >
                <FiChevronLeft className="w-[1.75rem] h-[3.5rem]" />
              </button>
            )}
            {carouselIndex < groupedCoinDisplay.length - 1 && (
              <button
                className="absolute w-[48px] aspect-square rounded-full active-button flex items-center justify-center top-1/2 -translate-y-1/2 -right-10"
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
