import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import CoinsPriceChart from "./CoinsPriceChart";
import { CoinsChartCardSkeleton } from "../../skeletons";
import { displayVolumePeriod } from "@/utils/chartFunctions";
import { formatPrice } from "@/utils/formatText";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import { selectCurrencySymbol } from "@/lib/features/currencySlice";

const CoinsStackedPriceChartCard = ({
  todaysDate,
  timeScale,
}: {
  todaysDate: string;
  timeScale: number;
}) => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);
  const currencySymbol = useSelector(selectCurrencySymbol);

  return (
    <div className="relative basis-1/2 p-2.5 xsm:p-6 bg-white dark:bg-dark-blue-700 rounded-xl overflow-hidden">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {dataStatus === "loading" || dataStatus === "idle" || !coinData[0] ? (
          <CoinsChartCardSkeleton />
        ) : (
          <div>
            <div>
              <h3 className="mb-1 xsm:mb-4 text-lg xsm:text-3xl font-bold">
                Price {displayVolumePeriod(timeScale)}
              </h3>
              <p className="text-xsm xsm:text-base dark:text-light-text-300">
                {todaysDate}
              </p>
            </div>
            <div className="relative max-h-[216px] mb-2 xsm:mb-6">
              <CoinsPriceChart coinData={coinData} />
            </div>
            <div className="flex gap-3 sm:gap-6">
              <div className="flex align-center text-xsm sm:text-base">
                <span className="inline-block w-4 sm:w-6 h-4 sm:h-6 mr-2 bg-[#7474F299] rounded"></span>
                {coinData[0].id} {currencySymbol}
                {formatPrice(
                  coinData[0].prices[coinData[0].prices.length - 1][1]
                )}{" "}
              </div>
              {coinData.length === 2 && (
                <div className="flex align-center text-xsm sm:text-base">
                  <span className="inline-block w-4 sm:w-6 h-4 sm:h-6 mr-2 bg-[#D878FA99] rounded"></span>
                  {coinData[1].id} {currencySymbol}
                  {formatPrice(
                    coinData[1].prices[coinData[1].prices.length - 1][1]
                  )}{" "}
                </div>
              )}
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default CoinsStackedPriceChartCard;
