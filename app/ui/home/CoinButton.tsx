import React from "react";
import Image from "next/image";
import { formatLargeNumber, formatPrice } from "@/utils/formatText";

const CoinButton = ({
  viewCoin,
  setViewCoin,
  coin,
}: {
  viewCoin: string;
  setViewCoin: React.Dispatch<React.SetStateAction<string>>;
  coin: Coins;
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
      className={`w-[calc(20%-6px)] h-[78px] flex shrink-0 items-center gap-4 max-w-[260px] p-4 bg-dark-purple-700 rounded-md`}
    >
      <div className="flex items-center gap-4 font-medium">
        <Image src={image} alt="Bitcoin" width={32} height={32} />
      </div>
      <div className="flex flex-col gap-1">
        <h5 className="font-medium">
          {name} ({symbol.toUpperCase()})
        </h5>
        <p className="flex text-sm text-darkTheme-white-200">
          <span>$ {formatPrice(current_price)} USD </span>
          <span className="text-birches">^ {priceChange_1h.toFixed(2)}%</span>
        </p>
      </div>
    </li>
  );
};

export default CoinButton;
