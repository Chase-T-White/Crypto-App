const CoinOption = ({
  coin,
  selected,
  selectedCoins,
  setSelectedCoins,
  isFirst,
  setAmountToSell,
  setAmountToBuy,
}: {
  coin: Coins;
  selected: boolean;
  selectedCoins: Coins[];
  setSelectedCoins: React.Dispatch<React.SetStateAction<Coins[]>>;
  isFirst: boolean;
  setAmountToSell: React.Dispatch<React.SetStateAction<number>>;
  setAmountToBuy: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { name, symbol } = coin;

  const handleClick = (coin: Coins) => {
    if (isFirst) {
      setSelectedCoins([coin, selectedCoins[1]]);
      setAmountToSell(1);
      setAmountToBuy(coin.current_price / selectedCoins[1].current_price);
    } else {
      setSelectedCoins([selectedCoins[0], coin]);
      setAmountToBuy(1);
      setAmountToSell(selectedCoins[0].current_price / coin.current_price);
    }
  };

  return (
    <option value={name} disabled={selected} onClick={() => handleClick(coin)}>
      {name} ({symbol.toUpperCase()})
    </option>
  );
};

export default CoinOption;
