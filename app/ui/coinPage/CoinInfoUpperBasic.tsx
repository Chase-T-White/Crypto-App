import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
import {
  TbStack2Filled,
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";
import CoinLink from "./CoinLink";
import { formatPrice, coinPageDateDisplay } from "@/utils/formatText";
import { checkStorage } from "@/utils/localStorageFunctions";
import { selectCurrencySymbol } from "@/lib/features/currencySlice";

const CoinInfoUpperBasic = ({
  coinImg,
  name,
  symbol,
  homeLinks,
  allTimeHigh,
  allTimeHighDate,
  allTimeLow,
  allTimeLowDate,
  currentPrice,
  priceChangePercent,
}: {
  coinImg: string;
  name: string;
  symbol: string;
  homeLinks: string[];
  allTimeHigh: number;
  allTimeHighDate: string;
  allTimeLow: number;
  allTimeLowDate: string;
  currentPrice: number;
  priceChangePercent: number;
}) => {
  const [isLoadingHistoricalData, setIsLoadingHistoricalData] = useState(false);
  const [historicalData, setHistoricalData] = useState(null);
  const currencySymbol = useSelector(selectCurrencySymbol);
  const portfolioCoins = checkStorage();
  const { showBoundary } = useErrorBoundary();

  let coinInPortfolio: null | StorageCoins[] = null;
  let portfolioProfit;

  const fetchHistoricalDataInCurrency = async () => {
    if (coinInPortfolio !== null && historicalData !== null) {
      setIsLoadingHistoricalData(true);
      try {
        const response = await axios(
          `https://api.coingecko.com/api/v3/coins/${name.toLowerCase()}/history?date=${
            coinInPortfolio[0].date_purchased
          }?localization=false`
        );

        const historyData = response.data;

        console.log(historyData);
      } catch (error) {
        setIsLoadingHistoricalData(false);
        showBoundary(error);
      }
    }
  };

  if (portfolioCoins && historicalData === null) {
    coinInPortfolio = portfolioCoins.filter(
      (coin: PortfolioCoins) => coin.id === name.toLowerCase()
    );
    fetchHistoricalDataInCurrency();
  }

  return (
    <div className="grow shrink-2 max-w-[692px]">
      <div className="flex flex-col items-center sm:flex-row sm:items-stretch gap-6 justify-between">
        <div className="grow shrink-2 max-w-[350px] sm:max-w-[305px] flex flex-col gap-4">
          <div className="grow shrink-2 flex flex-col items-center justify-center py-4 bg-white dark:bg-dark-purple-800 rounded-xl">
            <div className="flex justify-center">
              <div className="mb-6 p-4 rounded-lg bg-light-purple-200/20 dark:bg-dark-blue-500">
                <Image
                  src={coinImg}
                  alt={`${name} logo`}
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="text-3xl font-bold">
              {name} ({symbol.toUpperCase()})
            </div>
          </div>
          <CoinLink link={homeLinks[0]} />
        </div>
        <div className="max-w-[350px] sm:max-w-full">
          <div className="bg-white dark:bg-dark-purple-800 rounded-xl py-10 px-5 sm:px-14">
            <div className="mb-6">
              <div className="flex gap-4 text-5xl font-bold">
                {currencySymbol}
                {formatPrice(Number(currentPrice.toFixed(2)))}{" "}
                <span
                  className={`flex items-center gap-2 text-lg ${
                    priceChangePercent > 0
                      ? "text-birches-200 dark:text-birches-100"
                      : "text-red"
                  }`}
                >
                  <Image
                    src={`/images/${
                      priceChangePercent > 0 ? "upIcon.svg" : "downIcon.svg"
                    }`}
                    alt="percentage change icon"
                    width={9}
                    height={9}
                  />
                  {priceChangePercent.toFixed(2)}%
                </span>
              </div>
              {/* Add in logic after portfolio has been created */}
              {/* {coinInPortfolio && (
                <div>
                  Profit: <span>{portfolioProfit}</span>
                </div>
              )} */}
            </div>
            <div className="flex justify-center mb-6">
              <TbStack2Filled className="text-2xl" />
            </div>
            <div>
              <div className="flex mb-6">
                <div className="mr-4 pt-2">
                  <TbTriangleFilled className="text-sm text-birches-200 dark:text-birches-100" />
                </div>
                <div className="flex flex-col gap-2">
                  <p>
                    All Time High:{" "}
                    <span className="text-lg font-medium pl-4">
                      {currencySymbol}
                      {formatPrice(Number(allTimeHigh))}
                    </span>
                  </p>
                  <div className="text-sm text-dark-text-400 dark:text-light-text-300">
                    <p>{coinPageDateDisplay(allTimeHighDate)}</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 pt-2">
                  <TbTriangleInvertedFilled className="text-sm text-red" />
                </div>
                <div className="flex flex-col gap-2">
                  <p>
                    All Time Low:{" "}
                    <span className="text-lg font-medium pl-4">
                      {currencySymbol}
                      {formatPrice(Number(allTimeLow))}
                    </span>
                  </p>
                  <div className="text-sm text-dark-text-400 dark:text-light-text-300">
                    <p>{coinPageDateDisplay(allTimeLowDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInfoUpperBasic;
