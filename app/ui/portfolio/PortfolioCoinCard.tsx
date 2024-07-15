import { useSelector } from "react-redux";
import CoinCardRight from "./CoinCardRight";
import CoinCardLeft from "./CoinCardLeft";
import { selectCurrency } from "@/lib/features/currencySlice";

type PriceCoinType = {
  [key: string]: number;
};

type CoinCardType = {
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number;
  betterId: string;
  date_purchased: string;
  id: string;
  image: string;
  name: string;
  number_of_coins: number;
  purchase_price_of_coin: PriceCoinType;
  symbol: string;
};

const PortfolioCoinCard = ({
  dataEntryInfo,
  setIsRemoveAsset,
  setRemoveAssetId,
}: {
  dataEntryInfo: CoinCardType;
  setIsRemoveAsset: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveAssetId: React.Dispatch<
    React.SetStateAction<{ coinId: string; assetId: string }>
  >;
}) => {
  const currency = useSelector(selectCurrency);
  const {
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    circulating_supply,
    max_supply,
    betterId,
    number_of_coins,
    purchase_price_of_coin,
    date_purchased,
  } = dataEntryInfo;

  const purchaseCoinPriceInCurrency =
    purchase_price_of_coin[currency.toLowerCase()];

  return (
    <div className="w-full flex flex-col base:flex-row rounded-lg border-2 border-dark-blue-700 overflow-hidden">
      <CoinCardRight
        {...{
          betterId,
          image,
          name,
          symbol,
          current_price,
          number_of_coins,
          purchaseCoinPriceInCurrency,
          date_purchased,
          setIsRemoveAsset,
          setRemoveAssetId,
        }}
      />
      <CoinCardLeft
        {...{
          current_price,
          price_change_percentage_24h,
          market_cap,
          total_volume,
          circulating_supply,
          max_supply,
        }}
      />
    </div>
  );
};

export default PortfolioCoinCard;
