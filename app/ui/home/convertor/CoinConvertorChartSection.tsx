import { useState, useEffect } from "react";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import CoinConvertorChart from "./CoinConvertorChart";
import TimeScaleButton from "../TimeScaleButton";
import { CoinsConvertorChartSkeleton } from "../../skeletons";

const CoinConvertorChartSection = ({
  selectedCoins,
}: {
  selectedCoins: Coins[];
}) => {
  const [timeScale, setTimeScale] = useState(1);
  const [coinDataFetchStatus, setCoinDataFetchStatus] = useState("idle");
  const [coinsPriceData, setCoinsPriceData] = useState<number[][]>([]);

  const fetchCoinData = async (coins: Coins[]) => {
    setCoinDataFetchStatus("loading");
    let fetchedCoinPriceData = [];
    for (const coin of coins) {
      const response = await axios(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${timeScale}`
      );

      const data = response.data;

      const coinPrices = data.prices.map((price: number[]) => {
        return price[1];
      });

      fetchedCoinPriceData.push(coinPrices.reverse());
    }
    setCoinsPriceData(fetchedCoinPriceData);
    if (coinsPriceData.length === 2) {
      setCoinDataFetchStatus("success");
    } else {
      setCoinDataFetchStatus("error");
    }
  };

  useEffect(() => {
    fetchCoinData(selectedCoins);
    // eslint-ignore-next-line react-hooks/exhaustive-deps
  }, [timeScale, selectedCoins]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    if (timeScale !== Number(target.value)) {
      setTimeScale(Number(target.value));
    }
  };

  return (
    <div>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <div className="relative mb-10 bg-white dark:bg-dark-blue-700 rounded-2xl overflow-x-hidden">
          {coinDataFetchStatus === "idle" ||
          coinDataFetchStatus === "loading" ||
          coinsPriceData.length !== 2 ? (
            <CoinsConvertorChartSkeleton />
          ) : (
            <div className="h-[250px] sm:h-[295px] p-3 sm:p-6 rounded-lg">
              <p className="text-sm sm:text-base">
                {selectedCoins[0].name} ({selectedCoins[0].symbol.toUpperCase()}
                ) <span>to</span> {selectedCoins[1].name} (
                {selectedCoins[1].symbol.toUpperCase()})
              </p>
              <CoinConvertorChart coinsPriceData={coinsPriceData} />
            </div>
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
      </ErrorBoundary>
    </div>
  );
};

export default CoinConvertorChartSection;
