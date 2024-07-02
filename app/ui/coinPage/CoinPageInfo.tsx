import React from "react";
import CoinInfoUpperSection from "./CoinInfoUpperSection";
import CoinInfoLowerSection from "./CoinInfoLowerSection";

const CoinPageInfo = ({ coin }: { coin: any }) => {
  const {
    image: { large: coinImg },
    name,
    symbol,
    links: { homepage: homeLinks },
    links: { blockchain_site: blockchainLinks },
    description: { en: coinInfo },
    market_data: {
      current_price: { usd: currentPrice },
    },
    market_data: { price_change_percentage_24h: priceChangePercent },
    market_data: {
      ath: { usd: allTimeHigh },
    },
    market_data: {
      ath_date: { usd: allTimeHighDate },
    },
    market_data: {
      atl: { usd: allTimeLow },
    },
    market_data: {
      atl_date: { usd: allTimeLowDate },
    },
    market_data: {
      market_cap: { usd: marketCap },
    },
    market_data: {
      fully_diluted_valuation: { usd: dilutedValuation },
    },
    market_data: { total_supply },
    market_data: { circulating_supply },
    market_data: {
      total_volume: { usd: totalVolume },
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
