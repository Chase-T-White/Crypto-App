import Image from "next/image";
import { useSelector } from "react-redux";
import { formatPrice } from "@/utils/formatText";
import { selectCurrency } from "@/lib/features/currencySlice";

const CoinButton = ({
  setCoinFetchById,
  coin,
  active,
}: {
  setCoinFetchById: (coinId: string, symbol: string) => void;
  coin: Coins;
  active: boolean;
}) => {
  const currency = useSelector(selectCurrency);
  const {
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_1h_in_currency: priceChange_1h,
  } = coin;
  return (
    <li
      className={`h-[78px] flex basis-1/2 md:basis-[33%] lg:basis-[24%] xl:basis-[19%] shrink-0 items-center gap-1 xsm:gap-4 p-2 xsm:p-4 ${
        active ? "active-button" : "bg-white dark:bg-dark-purple-700"
      } rounded-md hover:cursor-pointer`}
      onClick={() => setCoinFetchById(coin.id, coin.symbol)}
    >
      <div className="w-6 xsm:w-8 h-6 xsm:h-8 flex items-center gap-4 font-medium">
        <Image src={image} alt="Bitcoin" width={32} height={32} />
      </div>
      <div className="w-full flex xsm:flex-col items-center xsm:items-start justify-between gap-1">
        <h5 className="text-sm xsm:text-base font-medium">
          <span className="hidden xsm:inline">{name}</span> (
          {symbol.toUpperCase()})
        </h5>
        <p className="flex flex-col xsm:flex-row gap-1 xsm:gap-2 text-sm dark:text-[#E8E8E8]">
          <span className="text-xsm xsm:text-base inline-block">
            {formatPrice(current_price)} {currency}
          </span>
          <span
            className={`text-xsm xsm:text-base inline-block flex items-center gap-2 ${
              priceChange_1h > 0
                ? "text-birches-200 dark:text-birches-100"
                : "text-red"
            }`}
          >
            <Image
              src={`/images/${
                priceChange_1h > 0 ? "upIcon.svg" : "downIcon.svg"
              }`}
              alt="percentage change icon"
              width={8}
              height={8}
            />
            {priceChange_1h.toFixed(2)}%
          </span>
        </p>
      </div>
    </li>
  );
};

export default CoinButton;
