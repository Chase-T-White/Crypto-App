import CoinInfoUpperSection from "./CoinInfoUpperSection";
import CoinInfoLowerSection from "./CoinInfoLowerSection";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/lib/features/currencySlice";

const CoinPageInfo = ({ coin }: { coin: any }) => {
  const currency = useSelector(selectCurrency).toLowerCase();

  const {
    image: { large: coinImg },
    name,
    symbol,
    links: { homepage: homeLinks },
    links: { blockchain_site: blockchainLinks },
    description: { en: coinInfo },
    market_data: {
      current_price: { [currency]: currentPrice },
    },
    market_data: { price_change_percentage_24h: priceChangePercent },
    market_data: {
      ath: { [currency]: allTimeHigh },
    },
    market_data: {
      ath_date: { [currency]: allTimeHighDate },
    },
    market_data: {
      atl: { [currency]: allTimeLow },
    },
    market_data: {
      atl_date: { [currency]: allTimeLowDate },
    },
    market_data: {
      market_cap: { [currency]: marketCap },
    },
    market_data: {
      fully_diluted_valuation: { [currency]: dilutedValuation },
    },
    market_data: { total_supply },
    market_data: { circulating_supply },
    market_data: {
      total_volume: { [currency]: totalVolume },
    },
  } = coin;

  return (
    <>
      <CoinInfoUpperSection
        {...{
          coinImg,
          name,
          symbol,
          homeLinks,
          currentPrice,
          priceChangePercent,
          allTimeHigh,
          allTimeHighDate,
          allTimeLow,
          allTimeLowDate,
          marketCap,
          dilutedValuation,
          total_supply,
          circulating_supply,
          totalVolume,
        }}
      />
      <CoinInfoLowerSection {...{ coinInfo, blockchainLinks }} />
    </>
  );
};

export default CoinPageInfo;
