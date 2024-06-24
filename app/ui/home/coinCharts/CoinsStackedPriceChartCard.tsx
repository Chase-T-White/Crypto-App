import React from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";
import CoinsPriceChart from "./CoinsPriceChart";

const CoinsStackedPriceChartCard = () => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      {dataStatus === "loading" || dataStatus === "idle" ? (
        <CoinsChartCardSkeleton />
      ) : (
        <div className="basis-1/2 p-6 bg-dark-purple-600 rounded-xl">
          <div>
            <h3 className="mb-4 text-3xl font-bold">Price 24h</h3>
            <p className="text-darkTheme-white-200">September 29, 2023</p>
          </div>
          <div className="relative max-h-[216px]">
            <CoinsPriceChart coinData={coinData} />
          </div>
          <div>
            <div>Coin 1</div>
            <div>Coin 2</div>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default CoinsStackedPriceChartCard;
