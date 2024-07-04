import React from "react";
import Image from "next/image";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

const CoinCardRight = ({
  image,
  name,
  symbol,
  current_price,
  number_of_coins,
  purchase_price_of_coin,
  date_purchased,
}: {
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  number_of_coins: number;
  purchase_price_of_coin: number;
  date_purchased: string;
}) => {
  const percentageROI =
    ((number_of_coins * current_price) /
      (number_of_coins * purchase_price_of_coin)) *
      100 -
    100;

  const dateArr = date_purchased.split("-");
  const dateDisplayFormat = `${dateArr[1]}.${dateArr[0]}.${dateArr[2]}`;

  return (
    <div className="grow max-w-[380px] py-6 px-4 bg-[#191932]">
      {/* image, name, symbol */}
      <div className="flex items-center gap-2 mb-8 font-bold text-2xl">
        <div>
          <Image src={image} alt={`${name} logo`} width={32} height={32} />
        </div>
        {name} ({symbol.toUpperCase()})
      </div>
      {/* Total owned coin valuation */}
      <div>
        <p className="mb-2">Total Value</p>
        <p className="flex gap-4 mb-2 font-bold text-3xl">
          ${(number_of_coins * current_price).toLocaleString()} USD{" "}
          <span
            className={`inline-block flex items-center gap-1.5 text-base ${
              percentageROI > 0 ? "text-birches-100" : "text-red"
            }`}
          >
            {percentageROI > 0 ? (
              <TbTriangleFilled />
            ) : (
              <TbTriangleInvertedFilled />
            )}{" "}
            {percentageROI.toFixed(2)}%
          </span>
        </p>
        <p className="text-sm text-[#D1D1D1]">Purchased {dateDisplayFormat}</p>
      </div>
    </div>
  );
};

export default CoinCardRight;
