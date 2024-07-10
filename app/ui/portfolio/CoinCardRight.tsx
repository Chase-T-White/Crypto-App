import Image from "next/image";
import {
  TbTriangleFilled,
  TbTriangleInvertedFilled,
  TbTrash,
} from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  selectCurrency,
  selectCurrencySymbol,
} from "@/lib/features/currencySlice";

const CoinCardRight = ({
  image,
  name,
  symbol,
  current_price,
  number_of_coins,
  purchase_price_of_coin,
  date_purchased,
  setIsRemoveAsset,
  setRemoveAssetId,
}: {
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  number_of_coins: number;
  purchase_price_of_coin: number;
  date_purchased: string;
  setIsRemoveAsset: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveAssetId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const currency = useSelector(selectCurrency);
  const currencySymbol = useSelector(selectCurrencySymbol);

  const percentageROI =
    ((number_of_coins * current_price) /
      (number_of_coins * purchase_price_of_coin)) *
      100 -
    100;

  const dateArr = date_purchased.split("-");
  const dateDisplayFormat = `${dateArr[1]}.${dateArr[0]}.${dateArr[2]}`;

  const handleClick = () => {
    setRemoveAssetId(name.toLowerCase());
    setIsRemoveAsset(true);
  };

  return (
    <div className="relative grow base:max-w-[380px] py-6 px-4 bg-light-purple-300/50 dark:bg-dark-blue-700">
      <TbTrash
        className="absolute right-2 top-2 cursor-pointer"
        title="Remove Coin"
        onClick={handleClick}
      />
      <div className="flex items-center gap-2 mb-8 font-bold text-2xl">
        <div>
          <Image src={image} alt={`${name} logo`} width={32} height={32} />
        </div>
        {name} ({symbol.toUpperCase()})
      </div>
      <div>
        <p className="mb-2">Total Value</p>
        <p className="flex gap-4 mb-2 font-bold text-lg xsm:text-3xl">
          {currencySymbol}
          {(number_of_coins * current_price).toLocaleString()} {currency}{" "}
          <span
            className={`inline-block flex items-center gap-1.5 text-base ${
              percentageROI > 0
                ? "text-birches-200 dark:text-birches-100"
                : "text-red"
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
        <p className="text-sm text-dark-text-400 dark:text-light-text-200">
          Purchased {dateDisplayFormat}
        </p>
      </div>
    </div>
  );
};

export default CoinCardRight;
