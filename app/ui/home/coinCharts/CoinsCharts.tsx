import React from "react";
import CoinsPriceChartCard from "./CoinsPriceChartCard";
import CoinsVolumnChartCard from "./CoinsVolumnChartCard";
import CoinsStackedPriceChartCard from "./CoinsStackedPriceChartCard";
import CoinsStackedVolumeChartCard from "./CoinsStackedVolumeChartCard";
import { currentDate } from "@/utils/formatText";

const CoinsCharts = ({
  timeScale,
  setCoinFetchByTimeScale,
  isCompare,
}: {
  timeScale: number;
  setCoinFetchByTimeScale: (timeScale: number) => void;
  isCompare: boolean;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    if (timeScale !== Number(target.value)) {
      setCoinFetchByTimeScale(Number(target.value));
    }
  };

  const todaysDate = currentDate();

  return (
    <div>
      <div className="h-[404px] flex gap-8 mb-14">
        {!isCompare ? (
          <>
            <CoinsPriceChartCard todaysDate={todaysDate} />
            <CoinsVolumnChartCard
              timeScale={timeScale}
              todaysDate={todaysDate}
            />
          </>
        ) : (
          <>
            <CoinsStackedPriceChartCard
              todaysDate={todaysDate}
              timeScale={timeScale}
            />
            <CoinsStackedVolumeChartCard
              timeScale={timeScale}
              todaysDate={todaysDate}
            />
          </>
        )}
      </div>
      <ul className="w-max flex gap-2 p-1 text-sm text-darkTheme-white-500 bg-dark-purple-700 rounded-md">
        <button
          value={1}
          className={`px-5 py-2 rounded-md ${
            timeScale === 1 ? "active-button" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          1D
        </button>
        <button
          value={7}
          className={`px-5 py-2 rounded-md ${
            timeScale === 7 ? "active-button" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          7D
        </button>
        <button
          value={14}
          className={`px-5 py-2 rounded-md ${
            timeScale === 14 ? "active-button" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          14D
        </button>
        <button
          value={31}
          className={`px-5 py-2 rounded-md ${
            timeScale === 31 ? "active-button" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          1M
        </button>
        <button
          value={182}
          className={`px-5 py-2 rounded-md ${
            timeScale === 182 ? "active-button" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          6M
        </button>
        <button
          value={365}
          className={`px-5 py-2 rounded-md ${
            timeScale === 365 ? "active-button" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          1Y
        </button>
      </ul>
    </div>
  );
};

export default CoinsCharts;
