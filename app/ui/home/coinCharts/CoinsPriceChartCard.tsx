import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";

const CoinsPriceChartCard = () => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);

  console.log(dataStatus);

  // const { prices, total_volumes: totalVolume } = coinData[0];

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      {/* <Suspense fallback={<CoinsChartCardSkeleton />}> */}
      {dataStatus === "loading" || dataStatus === "idle" ? (
        <CoinsChartCardSkeleton />
      ) : (
        <div className="grow p-6 bg-dark-purple-600 rounded-xl">
          <div>
            <p className="mb-6 text-lg text-darkTheme-white-200">
              Bitcoin (BTC)
            </p>
            <h3 className="mb-4 text-3xl font-bold">$807.243 bln</h3>
            <p className="text-darkTheme-white-200">September 29, 2023</p>
          </div>
          <div>chart stuff</div>
        </div>
      )}
      {/* </Suspense> */}
    </ErrorBoundary>
  );
};

export default CoinsPriceChartCard;
