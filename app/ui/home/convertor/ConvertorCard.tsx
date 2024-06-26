import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllCoins } from "@/lib/features/coins/coinsSlice";
import CoinOption from "./CoinOption";

const ConvertorCard = () => {
  const [quantityToConvert, setQuantityToConvert] = useState(1);
  const coins = useSelector(selectAllCoins);

  return (
    <div>
      <p></p>
      <div className="flex">
        <select name="coins" className="bg-transparent">
          {coins.map((coin: Coins) => {
            return <CoinOption key={coin.id} coin={coin} />;
          })}
        </select>
        <div className="flex">
          <input
            className="bg-transparent"
            type="number"
            name="quantity"
            min={1}
            max={9999}
            onChange={(e) => setQuantityToConvert(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default ConvertorCard;
