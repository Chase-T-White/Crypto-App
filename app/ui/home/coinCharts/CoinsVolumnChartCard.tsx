import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import CoinsVolumnChart from "./CoinsVolumnChart";
import { CoinsChartCardSkeleton } from "../../skeletons";
import { displayVolumePeriod } from "@/utils/chartFunctions";
import { formatLargeNumber } from "@/utils/formatText";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";

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
    <div className="relative basis-1/2 p-6 bg-white dark:bg-dark-purple-800 rounded-xl overflow-hidden">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {dataStatus === "idle" || dataStatus === "loading" || !coinData[0] ? (
          <CoinsChartCardSkeleton />
        ) : (
          <div>
            <div className="flex justify-between items-start xsm:flex-col">
              <p className="mb-6 xsm:text-lg text-dark-text-500 dark:text-light-text-200">
                Volume {displayVolumePeriod(timeScale)}
              </p>
              <div>
                <h3 className="mb-1 xsm:mb-4 text-lg xsm:text-3xl font-bold">
                  {formatLargeNumber(
                    coinData[0]?.total_volumes[
                      coinData[0]?.total_volumes.length - 1
                    ][1]
                  )}{" "}
                  bln
                </h3>
                <p className="text-xsm xsm:text-base dark:text-light-text-300">
                  {todaysDate}
                </p>
              </div>
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
