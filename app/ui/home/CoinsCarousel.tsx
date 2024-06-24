import React from "react";
import CoinButton from "./CoinButton";
import { useSelector } from "react-redux";
import { selectCoinIds } from "@/lib/features/charts/chartSlice";
import { coinsFetchStatus } from "@/lib/features/coins/coinsSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinCarouselSkeleton } from "../skeletons";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const CoinsCarousel = ({
  setCoinFetchById,
  coins,
}: {
  setCoinFetchById: (coinId: string, symbol: string) => void;
  coins: Coins[];
}) => {
  const coinIds = useSelector(selectCoinIds);
  const coinsStatus = useSelector(coinsFetchStatus);
  return (
    <div className="relative mb-10">
      <ErrorBoundary fallback={<p>Something went wrong...</p>}>
        {coinsStatus === "loading" || coinsStatus === "idle" ? (
          <CoinCarouselSkeleton />
        ) : (
          <>
            <div className="relative w-full h-[78px] overflow-x-hidden">
              <ul className="absolute flex gap-2">
                {coins.map((coin) => {
                  const active = coinIds.includes(coin.id);
                  return (
                    <CoinButton
                      key={coin.id}
                      {...{ setCoinFetchById, coin, active }}
                    />
                  );
                })}
              </ul>
            </div>
            <button className="absolute w-[48px] aspect-square rounded-full active-button flex items-center justify-center top-1/2 -translate-y-1/2 -left-10">
              <FiChevronLeft className="w-[1.75rem] h-[3.5rem]" />
            </button>
            <button className="absolute w-[48px] aspect-square rounded-full active-button flex items-center justify-center top-1/2 -translate-y-1/2 -right-10">
              <FiChevronRight className="w-[1.75rem] h-[3.5rem]" />
            </button>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default CoinsCarousel;
