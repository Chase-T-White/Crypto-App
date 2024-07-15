import CoinsPriceChartCard from "./CoinsPriceChartCard";
import CoinsVolumnChartCard from "./CoinsVolumnChartCard";
import CoinsStackedPriceChartCard from "./CoinsStackedPriceChartCard";
import CoinsStackedVolumeChartCard from "./CoinsStackedVolumeChartCard";
import TimeScaleButton from "../TimeScaleButton";
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
      <div className="h-[650px] xsm:h-[850px] base:h-[404px] flex flex-col base:flex-row gap-4 base:gap-8 mb-7 xsm:mb-14">
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
      <ul className="w-full xsm:w-max flex justify-between gap-2 p-1 text-sm dark:text-purple-text-200 bg-light-purple-200/40 dark:bg-dark-purple-500 rounded-md">
        <TimeScaleButton
          value={1}
          timeScale={timeScale}
          text={"1D"}
          handleClick={handleClick}
        />
        <TimeScaleButton
          value={7}
          timeScale={timeScale}
          text={"7D"}
          handleClick={handleClick}
        />
        <TimeScaleButton
          value={14}
          timeScale={timeScale}
          text={"14D"}
          handleClick={handleClick}
        />
        <TimeScaleButton
          value={31}
          timeScale={timeScale}
          text={"1M"}
          handleClick={handleClick}
        />
        <TimeScaleButton
          value={182}
          timeScale={timeScale}
          text={"6M"}
          handleClick={handleClick}
        />
        <TimeScaleButton
          value={365}
          timeScale={timeScale}
          text={"1Y"}
          handleClick={handleClick}
        />
      </ul>
    </div>
  );
};

export default CoinsCharts;
