import React from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";
import CoinsPriceChart from "./CoinsPriceChart";
import { capitalizeFirstLetter } from "@/utils/formatText";

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
          <div className="relative max-h-[216px] mb-6">
            <CoinsPriceChart coinData={coinData} />
          </div>
          <div className="flex gap-6">
            <div className="flex align-center">
              <span className="inline-block w-6 h-6 mr-2 bg-[#7878FA] rounded"></span>
              {coinData[0].id} ${coinData[0].prices[0][1].toFixed(2)} mln
            </div>
            {coinData.length === 2 && (
              <div className="flex align-center">
                <span className="inline-block w-6 h-6 mr-2 bg-[#D878FA] rounded"></span>
                {coinData[1].id} ${coinData[1].prices[0][1].toFixed(2)} mln
              </div>
            )}
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default CoinsStackedPriceChartCard;
