import Image from "next/image";
import CoinOption from "./CoinOption";
import { formatPrice } from "@/utils/formatText";

const ConvertorCard = ({
  bgColor,
  coins,
  isFirst,
  amountToSell,
  setAmountToSell,
  amountToBuy,
  setAmountToBuy,
  selectedCoins,
  setSelectedCoins,
}: {
  bgColor: string;
  coins: Coins[];
  isFirst: boolean;
  amountToSell: number;
  setAmountToSell: React.Dispatch<React.SetStateAction<number>>;
  amountToBuy: number;
  setAmountToBuy: React.Dispatch<React.SetStateAction<number>>;
  selectedCoins: Coins[];
  setSelectedCoins: React.Dispatch<React.SetStateAction<Coins[]>>;
}) => {
  const selectedCoin = selectedCoins[Number(!isFirst)];
  const otherCoin = selectedCoins[Number(isFirst)];

  const { name, symbol, image, current_price } = selectedCoin;

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);

    if (isFirst) {
      setAmountToSell(value);
      setAmountToBuy((value * current_price) / otherCoin.current_price);
    } else {
      setAmountToBuy(value);
      setAmountToSell((value * current_price) / otherCoin.current_price);
    }
  };

  return (
    <div className={`bg-white ${bgColor} basis-1/2 p-6 rounded-2xl`}>
      <p className="mb-10 text-sm text-white/80">
        {isFirst ? "You Buy" : "You Sell"}
      </p>
      <div>
        <div className="flex pb-6 border-b-[1px] border-white">
          <div className="flex items-center">
            <div className="inline-block mr-2">
              <Image src={image} alt="Crypto logo" width={24} height={24} />
            </div>
            <select
              name="coins"
              className="bg-transparent text-lg"
              defaultValue={name}
            >
              {coins.map((coin: Coins) => {
                return (
                  <CoinOption
                    key={coin.id}
                    coin={coin}
                    selected={name === coin.name}
                    selectedCoins={selectedCoins}
                    setSelectedCoins={setSelectedCoins}
                    isFirst={isFirst}
                    setAmountToSell={setAmountToSell}
                    setAmountToBuy={setAmountToBuy}
                  />
                );
              })}
            </select>
          </div>
          <div className="flex text-lg">
            <input
              className="bg-transparent text-right"
              type="number"
              name="quantity"
              min={1}
              max={999999}
              value={isFirst ? amountToSell.toFixed(3) : amountToBuy.toFixed(3)}
              onChange={(e) => handleChange(e)}
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
