import React from "react";
import PortfolioCoinCard from "./PortfolioCoinCard";

const PortfolioCoinsList = ({
  portfolioCoins,
}: {
  portfolioCoins: PortfolioCoins[];
}) => {
  return (
    <>
      {portfolioCoins.length === 0 ? (
        <p>No coins to display</p>
      ) : (
        // <ul>
        //   {portfolioCoins.map((coin: PortfolioCoins) => {
        //     return <PortfolioCoinCard key={coin.name} coin={coin} />;
        //   })}
        // </ul>
        <p>coin list</p>
      )}
    </>
  );
};

export default PortfolioCoinsList;
