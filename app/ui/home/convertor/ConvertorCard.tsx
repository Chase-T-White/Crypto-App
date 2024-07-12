import Image from "next/image";
import { useSelector } from "react-redux";
import CoinOption from "./CoinOption";
import { CoinsConvertorCardSkeleton } from "../../skeletons";
import { formatPrice } from "@/utils/formatText";
import { selectCurrencySymbol } from "@/lib/features/currencySlice";

const ConvertorCard = ({
  coinsStatus,
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
  coinsStatus: string;
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
  const currencySymbol = useSelector(selectCurrencySymbol);
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
    <div className={`bg-white ${bgColor} basis-1/2 p-3 sm:p-6 rounded-2xl`}>
      {coinsStatus === "idle" || coinsStatus === "loading" ? (
        <CoinsConvertorCardSkeleton />
      ) : (
        <>
          <p className="mb-10 text-sm text-dark-text-600 dark:text-white/80">
            {isFirst ? "You Buy" : "You Sell"}
          </p>
          <div>
            <div className="flex pb-6 border-b-[1px] border-dark-purple-600 dark:border-white">
              <div className="basis-2/3 xsm:basis-1/2 flex items-center">
                <div className="shrink-0 inline-block mr-2">
                  <Image src={image} alt="Crypto logo" width={24} height={24} />
                </div>
                <select
                  name="coins"
                  className="min-w-[calc(100%-32px)] w-0 bg-transparent text-base xsm:text-lg cursor-pointer"
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
              <div className="basis-1/3 xsm:basis-1/2 flex text-lg">
                <input
                  className="min-w-full w-0 max-w bg-transparent text-right"
                  type="number"
                  name="quantity"
                  min={1}
                  max={999999}
                  value={
                    isFirst ? amountToSell.toFixed(3) : amountToBuy.toFixed(3)
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="p-2 text-sm text-dark-text-200/80 dark:text-white/80">
              1 ({symbol.toUpperCase()}) = {currencySymbol}
              {formatPrice(current_price)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConvertorCard;
