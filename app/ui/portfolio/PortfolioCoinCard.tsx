import React from "react";
import CoinCardRight from "./CoinCardRight";
import CoinCardLeft from "./CoinCardLeft";

const PortfolioCoinCard = ({ coin }: { coin: PortfolioCoins }) => {
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
    portfolio_coin_data: { number_of_coins },
    portfolio_coin_data: { purchase_price_of_coin },
    portfolio_coin_data: { date_purchased },
  } = coin;

  return (
    <div className="w-full flex py-6 px-4 rounded-lg overflow-hidden">
      <CoinCardRight
        {...{
          image,
          name,
          symbol,
          current_price,
          number_of_coins,
          purchase_price_of_coin,
          date_purchased,
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
