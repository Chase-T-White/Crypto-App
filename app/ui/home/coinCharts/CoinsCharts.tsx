import React from "react";
import CoinsPriceChartCard from "./CoinsPriceChartCard";
import CoinsVolumnChartCard from "./CoinsVolumnChartCard";

const CoinsCharts = ({
  timeScale,
  setTimeScale,
}: {
  timeScale: string;
  setTimeScale: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    setTimeScale(target.value);
  };

  return (
    <div>
      <div className="h-[404px] flex gap-8 mb-14">
        <CoinsPriceChartCard />
        <CoinsVolumnChartCard timeScale={timeScale} />
      </div>
      <ul className="w-max flex gap-2 p-1 text-sm text-darkTheme-white-500 bg-dark-purple-500 rounded-md">
        <button
          value={"1day"}
          className="px-5 py-2 text-darkTheme-white-100 bg-birches rounded-md"
          onClick={(e) => handleClick(e)}
        >
          1D
        </button>
        <button
          value={"7days"}
          className="px-5 py-2 rounded-md"
          onClick={(e) => handleClick(e)}
        >
          7D
        </button>
        <button
          value={"14days"}
          className="px-5 py-2 rounded-md"
          onClick={(e) => handleClick(e)}
        >
          14D
        </button>
        <button
          value={"1month"}
          className="px-5 py-2 rounded-md"
          onClick={(e) => handleClick(e)}
        >
          1M
        </button>
        <button
          value={"6months"}
          className="px-5 py-2 rounded-md"
          onClick={(e) => handleClick(e)}
        >
          6M
        </button>
        <button
          value={"1year"}
          className="px-5 py-2 rounded-md"
          onClick={(e) => handleClick(e)}
        >
          1Y
        </button>
      </ul>
    </div>
  );
};

export default CoinsCharts;
