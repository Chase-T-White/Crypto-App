import React from "react";
import { useSelector } from "react-redux";
import {
  coinFetchStatus,
  selectAllCoinData,
} from "@/lib/features/charts/chartSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsChartCardSkeleton } from "../../skeletons";
import CoinsPriceChart from "./CoinsPriceChart";
import { displayVolumePeriod } from "@/utils/chartFunctions";
import { formatPrice } from "@/utils/formatText";

const CoinsStackedPriceChartCard = ({
  todaysDate,
  timeScale,
}: {
  todaysDate: string;
  timeScale: number;
}) => {
  const coinData = useSelector(selectAllCoinData);
  const dataStatus = useSelector(coinFetchStatus);

  return (
    <div className="relative basis-1/2 p-6 bg-dark-purple-600 rounded-xl overflow-hidden">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {dataStatus === "loading" || dataStatus === "idle" ? (
          <CoinsChartCardSkeleton />
        ) : (
          <div>
            <div>
              <h3 className="mb-4 text-3xl font-bold">
                Price {displayVolumePeriod(timeScale)}
              </h3>
              <p className="text-darkTheme-white-200">{todaysDate}</p>
            </div>
            <div className="relative max-h-[216px] mb-6">
              <CoinsPriceChart coinData={coinData} />
            </div>
            <div className="flex gap-6">
              <div className="flex align-center">
                <span className="inline-block w-6 h-6 mr-2 bg-[#7878FA] rounded"></span>
                {coinData[0].id} $
                {formatPrice(
                  coinData[0].prices[coinData[0].prices.length - 1][1]
                )}{" "}
                mln
              </div>
              {coinData.length === 2 && (
                <div className="flex align-center">
                  <span className="inline-block w-6 h-6 mr-2 bg-[#D878FA] rounded"></span>
                  {coinData[1].id} $
                  {formatPrice(
                    coinData[1].prices[coinData[1].prices.length - 1][1]
                  )}{" "}
                  mln
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
