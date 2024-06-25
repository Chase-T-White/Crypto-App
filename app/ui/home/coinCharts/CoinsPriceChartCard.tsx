import React from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";
import CoinsPriceChart from "./CoinsPriceChart";
import { formatPrice } from "@/utils/formatText";

const CoinsPriceChartCard = ({ todaysDate }: { todaysDate: string }) => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);

  console.log(coinData);

  return (
    <div className="relative basis-1/2 p-6 bg-dark-purple-600 rounded-xl overflow-hidden">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {dataStatus === "loading" || dataStatus === "idle" ? (
          <CoinsChartCardSkeleton />
        ) : (
          <div>
            <div>
              <p className="mb-6 text-lg text-darkTheme-white-200">
                {coinData[0].id} {coinData[0].symbol.toUpperCase()}
              </p>
              <h3 className="mb-4 text-3xl font-bold">
                ${formatPrice(coinData[0].prices[0][1])} mln
              </h3>
              <p className="text-darkTheme-white-200">{todaysDate}</p>
            </div>
            <div className="relative max-h-[216px]">
              <CoinsPriceChart coinData={coinData} />
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default CoinsPriceChartCard;
