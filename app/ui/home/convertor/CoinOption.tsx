import React from "react";

const CoinOption = ({
  coin,
  selected,
  selectedCoins,
  setSelectedCoins,
  isFirst,
  setAmountToSell,
  setAmountToBuy,
  isSwapConversion,
}: {
  coin: Coins;
  selected: boolean;
  selectedCoins: Coins[];
  setSelectedCoins: React.Dispatch<React.SetStateAction<Coins[]>>;
  isFirst: boolean;
  setAmountToSell: React.Dispatch<React.SetStateAction<number>>;
  setAmountToBuy: React.Dispatch<React.SetStateAction<number>>;
  isSwapConversion: boolean;
}) => {
  const { name, symbol } = coin;

  const handleClick = (coin: Coins) => {
    if (isFirst) {
      setSelectedCoins([coin, selectedCoins[1]]);
    } else {
      setSelectedCoins([selectedCoins[0], coin]);
    }
  };

  return (
    <option
      value="name"
      selected={selected}
      disabled={selected}
      onClick={() => handleClick(coin)}
    >
      {name} ({symbol.toUpperCase()})
    </option>
  );
};

export default CoinOption;
