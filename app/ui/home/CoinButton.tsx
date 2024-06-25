import React from "react";
import Image from "next/image";
import { formatPrice } from "@/utils/formatText";

const CoinButton = ({
  setCoinFetchById,
  coin,
  active,
}: {
  setCoinFetchById: (coinId: string, symbol: string) => void;
  coin: Coins;
  active: boolean;
}) => {
  const {
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_1h_in_currency: priceChange_1h,
  } = coin;
  return (
    <li
      className={`max-w-[253.5px] h-[78px] flex basis-[20%] shrink-0 items-center gap-4 p-4 ${
        active ? "active-button" : "bg-dark-purple-700"
      } rounded-md hover:cursor-pointer`}
      onClick={() => setCoinFetchById(coin.id, coin.symbol)}
    >
      <div className="flex items-center gap-4 font-medium">
        <Image src={image} alt="Bitcoin" width={32} height={32} />
      </div>
      <div className="flex flex-col gap-1">
        <h5 className="font-medium">
          {name} ({symbol.toUpperCase()})
        </h5>
        <p className="flex text-sm text-darkTheme-white-200">
          <span className="inline-block mr-2">
            {formatPrice(current_price)} USD
          </span>
          <span
            className={`inline-block flex items-center gap-2 ${
              priceChange_1h > 0
                ? "text-birches-200 dark:text-birches-100"
                : "text-red"
            }`}
          >
            <Image
              src={`/images/${
                priceChange_1h > 0 ? "upIcon.svg" : "downIcon.svg"
              }`}
              alt="percentage change icon"
              width={8}
              height={8}
            />
            {priceChange_1h.toFixed(2)}%
          </span>
        </p>
      </div>
    </li>
  );
};

export default CoinButton;
