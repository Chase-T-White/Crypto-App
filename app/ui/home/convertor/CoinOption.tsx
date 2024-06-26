import React from "react";

const CoinOption = ({
  coin,
  selected,
  setSelectedCoin,
}: {
  coin: Coins;
  selected: boolean;
  setSelectedCoin: React.Dispatch<React.SetStateAction<Coins>>;
}) => {
  const { name, symbol } = coin;
  return (
    <option
      value="name"
      selected={selected}
      disabled={selected}
      onClick={() => setSelectedCoin(coin)}
    >
      <div className="flex items-center gap-2">
        <p>
          {name} ({symbol.toUpperCase()})
        </p>
      </div>
    </option>
  );
};

export default CoinOption;
