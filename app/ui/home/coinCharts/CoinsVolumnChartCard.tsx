import React from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import CoinsVolumnChart from "./CoinsVolumnChart";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";
import { displayVolumePeriod } from "@/utils/chartFunctions";
import { formatLargeNumber } from "@/utils/formatText";

const CoinsVolumnChartCard = ({
  timeScale,
  todaysDate,
}: {
  timeScale: number;
  todaysDate: string;
}) => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);

  return (
    <div className="relative basis-1/2 p-6 bg-dark-purple-400 rounded-xl overflow-hidden">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {dataStatus === "loading" || dataStatus === "idle" ? (
          <CoinsChartCardSkeleton />
        ) : (
          <div>
            <div>
              <p className="mb-6 text-lg text-darkTheme-white-200">
                Volume {displayVolumePeriod(timeScale)}
              </p>
              <h3 className="mb-4 text-3xl font-bold">
                {formatLargeNumber(
                  coinData[0].total_volumes[
                    coinData[0].total_volumes.length - 1
                  ][1]
                )}{" "}
                bln
              </h3>
              <p className="text-darkTheme-white-200">{todaysDate}</p>
            </div>
            <div className="relative max-h-[216px]">
              <CoinsVolumnChart coinData={coinData} timeScale={timeScale} />
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default CoinsVolumnChartCard;
