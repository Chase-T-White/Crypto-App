import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import CoinsVolumnChart from "./CoinsVolumnChart";
import { CoinsChartCardSkeleton } from "../../skeletons";
import { capitalizeFirstLetter, formatLargeNumber } from "@/utils/formatText";
import { displayVolumePeriod } from "@/utils/chartFunctions";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";

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
    <div className="relative basis-1/2 p-2.5 xsm:p-6 bg-white dark:bg-dark-purple-800 rounded-xl overflow-hidden">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {dataStatus === "loading" || dataStatus === "idle" || !coinData[0] ? (
          <CoinsChartCardSkeleton />
        ) : (
          <div>
            <div>
              <h3 className="mb-1 xsm:mb-4 text-lg xsm:text-3xl font-bold">
                Volume {displayVolumePeriod(timeScale)}
              </h3>
              <p className="text-xsm xsm:text-base dark:text-light-text-300">
                {todaysDate}
              </p>
            </div>
            <div className="relative max-h-[216px] mb-2 xsm:mb-6">
              <CoinsVolumnChart coinData={coinData} timeScale={timeScale} />
            </div>
            <div className="flex gap-3 sm:gap-6">
              <div className="flex align-center text-xsm sm:text-base">
                <span className="inline-block w-4 sm:w-6 h-4 sm:h-6 mr-2 bg-[#7474F299] rounded"></span>
                {capitalizeFirstLetter(coinData[0].id)}{" "}
                {formatLargeNumber(
                  coinData[0].total_volumes[
                    coinData[0].total_volumes.length - 1
                  ][1]
                )}
              </div>
              {coinData.length === 2 && (
                <div className="flex align-center text-xsm sm:text-base">
                  <span className="inline-block w-4 sm:w-6 h-4 sm:h-6 mr-2 bg-[#D878FA99] rounded"></span>
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
