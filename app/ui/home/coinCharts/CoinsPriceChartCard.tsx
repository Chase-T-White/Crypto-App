import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import CoinsPriceChart from "./CoinsPriceChart";
import { CoinsChartCardSkeleton } from "../../skeletons";
import { formatPrice } from "@/utils/formatText";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import { selectCurrencySymbol } from "@/lib/features/currencySlice";

const CoinsPriceChartCard = ({ todaysDate }: { todaysDate: string }) => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);
  const currencySymbol = useSelector(selectCurrencySymbol);

  return (
    <div className="relative basis-1/2 p-4 xsm:p-6 bg-white dark:bg-dark-blue-700 rounded-xl overflow-hidden">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {dataStatus === "idle" || dataStatus === "loading" ? (
          <CoinsChartCardSkeleton />
        ) : (
          <div>
            <div className="flex justify-between items-start xsm:flex-col">
              <p className="mb-6 xsm:text-lg text-dark-text-500 dark:text-light-text-200">
                {coinData[0].id} {coinData[0].symbol.toUpperCase()}
              </p>
              <div>
                <h3 className="mb-1 xsm:mb-4 text-lg xsm:text-3xl font-bold">
                  {currencySymbol}
                  {formatPrice(
                    coinData[0].prices[coinData[0].prices.length - 1][1]
                  )}{" "}
                  mln
                </h3>
                <p className="text-xsm xsm:text-base dark:text-light-text-300">
                  {todaysDate}
                </p>
              </div>
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
