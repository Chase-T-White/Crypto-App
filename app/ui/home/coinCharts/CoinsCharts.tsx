import React from "react";
import CoinsPriceChartCard from "./CoinsPriceChartCard";
import CoinsVolumnChartCard from "./CoinsVolumnChartCard";

const CoinsCharts = () => {
  return (
    <div>
      <div className="flex gap-8 mb-14">
        <CoinsPriceChartCard />
        <CoinsVolumnChartCard />
      </div>
      <ul className="w-max flex gap-2 p-1 text-sm text-darkTheme-white-500 bg-dark-purple-500 rounded-md">
        <li className="px-5 py-2 text-darkTheme-white-100 bg-birches rounded-md">
          1D
        </li>
        <li className="px-5 py-2 rounded-md">7D</li>
        <li className="px-5 py-2 rounded-md">14D</li>
        <li className="px-5 py-2 rounded-md">1M</li>
        <li className="px-5 py-2 rounded-md">6M</li>
        <li className="px-5 py-2 rounded-md">1Y</li>
        <li className="px-5 py-2 rounded-md">5Y</li>
      </ul>
    </div>
  );
};

export default CoinsCharts;
