import React from "react";
import CoinButton from "./CoinButton";
import { useSelector } from "react-redux";
import { selectCoinIds } from "@/lib/features/charts/chartSlice";

const CoinsCarousel = ({
  setCoinFetchById,
  coins,
}: {
  setCoinFetchById: (coinId: string, symbol: string) => void;
  coins: Coins[];
}) => {
  const coinIds = useSelector(selectCoinIds);

  return (
    <div className="relative h-[78px] mb-10 overflow-x-hidden">
      <ul className="absolute flex gap-2">
        {coins.map((coin) => {
          const active = coinIds.includes(coin.id);
          return (
            <CoinButton key={coin.id} {...{ setCoinFetchById, coin, active }} />
          );
        })}
      </ul>
      <button></button>
      <button></button>
    </div>
  );
};

export default CoinsCarousel;
