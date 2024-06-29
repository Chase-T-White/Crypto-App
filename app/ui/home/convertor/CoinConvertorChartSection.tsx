import React, { useState, useEffect } from "react";
import CoinConvertorChart from "./CoinConvertorChart";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsConvertorChartSkeleton } from "../../skeletons";
import axios from "axios";

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
        <div className="relative mb-10 bg-dark-purple-600 rounded-2xl overflow-x-hidden">
          {coinDataFetchStatus === "idle" ||
          coinDataFetchStatus === "loading" ||
          coinsPriceData.length !== 2 ? (
            <CoinsConvertorChartSkeleton />
          ) : (
            <div className="h-[295px] p-6 rounded-lg">
              <p>
                {selectedCoins[0].name} ({selectedCoins[0].symbol.toUpperCase()}
                ) <span>to</span> {selectedCoins[1].name} (
                {selectedCoins[1].symbol.toUpperCase()})
              </p>
              <CoinConvertorChart coinsPriceData={coinsPriceData} />
            </div>
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
      </ErrorBoundary>
    </div>
  );
};

export default CoinConvertorChartSection;
