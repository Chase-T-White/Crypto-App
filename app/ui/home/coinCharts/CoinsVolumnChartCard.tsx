import React from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import CoinsVolumnChart from "./CoinsVolumnChart";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";

const CoinsVolumnChartCard = ({ timeScale }: { timeScale: number }) => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      {dataStatus === "loading" || dataStatus === "idle" ? (
        <CoinsChartCardSkeleton />
      ) : (
        <div className="basis-1/2 p-6 bg-dark-purple-400 rounded-xl">
          <div>
            <p className="mb-6 text-lg text-darkTheme-white-200">Volumn 24h</p>
            <h3 className="mb-4 text-3xl font-bold">$807.243 bln</h3>
            <p className="text-darkTheme-white-200">September 29, 2023</p>
          </div>
          <div className="relative max-h-[216px]">
            <CoinsVolumnChart
              volumeData={coinData[0].total_volumes}
              timeScale={timeScale}
            />
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default CoinsVolumnChartCard;
