import PortfolioCoinCard from "./PortfolioCoinCard";

const PortfolioCoinsList = ({
  portfolioCoins,
  setIsRemoveAsset,
  setRemoveAssetId,
}: {
  portfolioCoins: PortfolioCoins[];
  setIsRemoveAsset: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveAssetId: React.Dispatch<
    React.SetStateAction<{ coinId: string; assetId: string }>
  >;
}) => {
  return (
    <>
      {portfolioCoins.length === 0 ? (
        <p>No coins to display</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {portfolioCoins.map((coin: any) => {
            const coinKey = Object.keys(coin)[0];
            const {
              current_price,
              price_change_percentage_24h,
              market_cap,
              total_volume,
              circulating_supply,
              max_supply,
            } = coin[coinKey];
            return coin[coinKey].portfolio_coin_data.map((dataEntry: any) => {
              const dataEntryInfo = {
                ...dataEntry,
                current_price,
                price_change_percentage_24h,
                market_cap,
                total_volume,
                circulating_supply,
                max_supply,
              };
              return (
                <PortfolioCoinCard
                  key={dataEntry.betterId}
                  dataEntryInfo={dataEntryInfo}
                  setIsRemoveAsset={setIsRemoveAsset}
                  setRemoveAssetId={setRemoveAssetId}
                />
              );
            });
          })}
        </ul>
      )}
    </>
  );
};

export default PortfolioCoinsList;
