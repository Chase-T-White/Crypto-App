import React from "react";
import CoinCardRight from "./CoinCardRight";
import CoinCardLeft from "./CoinCardLeft";

const PortfolioCoinCard = () => {
  return (
    <div className="w-full flex py-6 px-4 rounded-lg overflow-hidden">
      <CoinCardRight />
      <CoinCardLeft />
    </div>
  );
};

export default PortfolioCoinCard;
