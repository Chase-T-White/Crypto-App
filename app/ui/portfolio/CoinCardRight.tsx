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

  return (
    <div>
      {/* image, name, symbol */}
      <div className="mb-8">
        <div>
          <Image src={image} alt={`${name} logo`} width={32} height={32} />
        </div>
        {name} ({symbol.toUpperCase()})
      </div>
      {/* Total owned coin valuation */}
      <div>
        <p>Total Value</p>
        <p>
          ${number_of_coins * current_price} USD{" "}
          <span
            className={`${percentageROI > 0 ? "text-birches-100" : "text-red"}`}
          >
            {percentageROI > 0 ? (
              <TbTriangleFilled />
            ) : (
              <TbTriangleInvertedFilled />
            )}{" "}
            {percentageROI}%
          </span>
        </p>
        <p>Purchased {date_purchased}</p>
      </div>
    </div>
  );
};

export default CoinCardRight;
