import React from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import CoinsVolumnChart from "./CoinsVolumnChart";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";
import { capitalizeFirstLetter, formatLargeNumber } from "@/utils/formatText";
import { displayVolumePeriod } from "@/utils/chartFunctions";

const CoinsStackedVolumeChartCard = ({
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
              <h3 className="mb-4 text-3xl font-bold">
                Volume {displayVolumePeriod(timeScale)}
              </h3>
              <p className="text-darkTheme-white-200">{todaysDate}</p>
            </div>
            <div className="relative max-h-[216px] mb-6">
              <CoinsVolumnChart coinData={coinData} timeScale={timeScale} />
            </div>
            <div className="w-full flex gap-6">
              <div className="flex align-center">
                <span className="inline-block w-6 h-6 mr-2 bg-[#7878FA] rounded"></span>
                {capitalizeFirstLetter(coinData[0].id)}{" "}
                {formatLargeNumber(
                  coinData[0].total_volumes[
                    coinData[0].total_volumes.length - 1
                  ][1]
                )}
              </div>
              {coinData.length === 2 && (
                <div className="flex align-center">
                  <span className="inline-block w-6 h-6 mr-2 bg-[#D878FA] rounded"></span>
                  {capitalizeFirstLetter(coinData[1].id)}{" "}
                  {formatLargeNumber(
                    coinData[1].total_volumes[
                      coinData[1].total_volumes.length - 1
                    ][1]
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default CoinsStackedVolumeChartCard;
