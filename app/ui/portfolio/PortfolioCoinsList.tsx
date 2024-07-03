import React, { useState } from "react";
import PortfolioCoinCard from "./PortfolioCoinCard";

const PortfolioCoinsList = ({
  portfolioCoins,
}: {
  portfolioCoins: PortfolioCoins[];
}) => {
  const [isAddAsset, setIsAddAsset] = useState(false);
  const [isShowInvestmentCalculator, setIsShowInvestmentCalculator] =
    useState(false);

  return (
    <>
      {portfolioCoins.length === 0 ? (
        <p>No coins to display</p>
      ) : (
        <ul>
          {portfolioCoins.map((coin: PortfolioCoins) => {
            return <PortfolioCoinCard key={coin.name} />;
          })}
        </ul>
      )}
    </>
  );
};

export default PortfolioCoinsList;
