import CoinInfoUpperBasic from "./CoinInfoUpperBasic";
import CoinInfoUpperExtended from "./CoinInfoUpperExtended";

const CoinInfoUpperSection = ({
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
}: {
  coinImg: string;
  name: string;
  symbol: string;
  homeLinks: string[];
  currentPrice: number;
  priceChangePercent: number;
  allTimeHigh: number;
  allTimeHighDate: string;
  allTimeLow: number;
  allTimeLowDate: string;
  marketCap: number;
  dilutedValuation: number;
  total_supply: number;
  circulating_supply: number;
  totalVolume: number;
}) => {
  return (
    <div className="flex flex-wrap justify-center xl:justify-between gap-6 mb-20">
      <CoinInfoUpperBasic
        {...{
          coinImg,
          name,
          symbol,
          homeLinks,
          allTimeHigh,
          allTimeHighDate,
          allTimeLow,
          allTimeLowDate,
          currentPrice,
          priceChangePercent,
        }}
      />
      <CoinInfoUpperExtended
        {...{
          marketCap,
          dilutedValuation,
          total_supply,
          circulating_supply,
          totalVolume,
        }}
      />
    </div>
  );
};

export default CoinInfoUpperSection;
