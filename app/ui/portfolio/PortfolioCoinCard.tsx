import CoinCardRight from "./CoinCardRight";
import CoinCardLeft from "./CoinCardLeft";

const PortfolioCoinCard = ({
  coin,
  setIsRemoveAsset,
  setRemoveAssetId,
}: {
  coin: PortfolioCoins;
  setIsRemoveAsset: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveAssetId: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
    <div className="w-full flex flex-col base:flex-row rounded-lg border-2 border-dark-blue-700 overflow-hidden">
      <CoinCardRight
        {...{
          image,
          name,
          symbol,
          current_price,
          number_of_coins,
          purchase_price_of_coin,
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
