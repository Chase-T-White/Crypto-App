import React from "react";
import PortfolioCoinCard from "./PortfolioCoinCard";
import { v4 } from "uuid";

const PortfolioCoinsList = ({
  portfolioCoins,
  setIsRemoveAsset,
  setRemoveAssetId,
}: {
  portfolioCoins: PortfolioCoins[];
  setIsRemoveAsset: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveAssetId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      {portfolioCoins.length === 0 ? (
        <p>No coins to display</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {portfolioCoins.map((coin: PortfolioCoins) => {
            return (
              <PortfolioCoinCard
                key={v4()}
                coin={coin}
                setIsRemoveAsset={setIsRemoveAsset}
                setRemoveAssetId={setRemoveAssetId}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default PortfolioCoinsList;
