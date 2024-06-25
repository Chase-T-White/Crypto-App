import React from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";
import CoinsPriceChart from "./CoinsPriceChart";

const CoinsPriceChartCard = () => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);

  console.log(coinData);

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      {dataStatus === "loading" || dataStatus === "idle" ? (
        <CoinsChartCardSkeleton />
      ) : (
        <div className="basis-1/2 p-6 bg-dark-purple-600 rounded-xl">
          <div>
            <p className="mb-6 text-lg text-darkTheme-white-200">
              {coinData[0].id} {coinData[0].symbol.toUpperCase()}
            </p>
            <h3 className="mb-4 text-3xl font-bold">
              ${coinData[0].prices[0][1].toFixed(2)} mln
            </h3>
            <p className="text-darkTheme-white-200">September 29, 2023</p>
          </div>
          <div className="relative max-h-[216px]">
            <CoinsPriceChart coinData={coinData} />
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default CoinsPriceChartCard;
