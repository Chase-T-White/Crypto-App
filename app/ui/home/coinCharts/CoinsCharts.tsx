import React from "react";
import CoinsPriceChartCard from "./CoinsPriceChartCard";
import CoinsVolumnChartCard from "./CoinsVolumnChartCard";

const CoinsCharts = ({
  timeScale,
  setTimeScale,
  setCoinFetchByTimeScale,
}: {
  timeScale: number;
  setTimeScale: React.Dispatch<React.SetStateAction<number>>;
  setCoinFetchByTimeScale: (timeScale: number) => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    if (timeScale !== Number(target.value)) {
      setTimeScale(Number(target.value));
      setCoinFetchByTimeScale(timeScale);
    }
  };

  return (
    <div>
      <div className="h-[404px] flex gap-8 mb-14">
        <CoinsPriceChartCard />
        <CoinsVolumnChartCard timeScale={timeScale} />
      </div>
      <ul className="w-max flex gap-2 p-1 text-sm text-darkTheme-white-500 bg-dark-purple-500 rounded-md">
        <button
          value={1}
          className={`px-5 py-2 rounded-md ${
            timeScale === 1 ? "bg-birches-100" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          1D
        </button>
        <button
          value={7}
          className={`px-5 py-2 rounded-md ${
            timeScale === 7 ? "bg-birches-100" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          7D
        </button>
        <button
          value={14}
          className={`px-5 py-2 rounded-md ${
            timeScale === 14 ? "bg-birches-100" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          14D
        </button>
        <button
          value={31}
          className={`px-5 py-2 rounded-md ${
            timeScale === 31 ? "bg-birches-100" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          1M
        </button>
        <button
          value={182}
          className={`px-5 py-2 rounded-md ${
            timeScale === 182 ? "bg-birches-100" : ""
          }`}
          onClick={(e) => handleClick(e)}
        >
          6M
        </button>
        <button
          value={365}
          className={`px-5 py-2 rounded-md ${
            timeScale === 365 ? "bg-birches-100" : ""
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
