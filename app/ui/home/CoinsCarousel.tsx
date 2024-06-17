import React from "react";
import Image from "next/image";
import CoinButton from "./CoinButton";

const CoinsCarousel = ({
  viewCoin,
  setViewCoin,
  coins,
}: {
  viewCoin: string;
  setViewCoin: React.Dispatch<React.SetStateAction<string>>;
  coins: Coins[];
}) => {
  return (
    <ul className="flex gap-2 mb-10 overflow-hidden">
      {coins.map((coin) => {
        return (
          <CoinButton key={coin.id} {...{ viewCoin, setViewCoin, coin }} />
        );
      })}
      {/* <li className="grow flex gap-4 max-w-[260px] p-4 bg-dark-purple-700 rounded-md">
        <Image src="/images/Bitcoin.svg" alt="Bitcoin" width={32} height={32} />
        <div className="flex flex-col gap-1">
          <h5 className="font-medium">Bitcoin (BTC)</h5>
          <p className="text-sm text-darkTheme-white-200">
            27,445.55 USD <span className="text-birches">^ 2.35%</span>
          </p>
        </div>
      </li> */}
    </ul>
  );
};

export default CoinsCarousel;
