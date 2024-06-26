import { useState } from "react";
import CoinOption from "./CoinOption";
import { formatPrice } from "@/utils/formatText";
import Image from "next/image";

const ConvertorCard = ({
  bgColor,
  isSwapConversion,
  coins,
  isFirst,
  amountToSell,
  setAmountToSell,
  amoutToBuy,
  setAmountToBuy,
}: {
  bgColor: string;
  isSwapConversion: boolean;
  coins: Coins[];
  isFirst: boolean;
  amountToSell: number;
  setAmountToSell: React.Dispatch<React.SetStateAction<number>>;
  amoutToBuy: number;
  setAmountToBuy: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState(
    isFirst ? coins[0] : coins[1]
  );

  const { name, symbol, image, current_price } = selectedCoin;

  const handleChange = (e) => {};

  return (
    <div className={`${bgColor} basis-1/2 p-6 rounded-2xl`}>
      <p className="mb-10 text-sm text-[#FFFFFFCC]">
        {isSwapConversion ? "You Buy" : "You Sell"}
      </p>
      <div>
        <div className="flex pb-6 border-b-[1px] border-white">
          <div className="flex items-center">
            <div className="inline-block mr-2">
              <Image src={image} alt="Crypto logo" width={24} height={24} />
            </div>
            <select name="coins" className="bg-transparent text-lg">
              {coins.map((coin: Coins) => {
                return (
                  <CoinOption
                    key={coin.id}
                    coin={coin}
                    selected={name === coin.name}
                    setSelectedCoin={setSelectedCoin}
                  />
                );
              })}
            </select>
          </div>
          <div className="flex text-lg">
            <input
              className="bg-transparent"
              type="number"
              name="quantity"
              min={1}
              max={9999}
              // onChange={(e) => setQuantityToConvert(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="p-2 text-sm text-[#FFFFFFCC]">
          1 ({symbol.toUpperCase()}) = ${formatPrice(current_price)}
        </div>
      </div>
    </div>
  );
};

export default ConvertorCard;
