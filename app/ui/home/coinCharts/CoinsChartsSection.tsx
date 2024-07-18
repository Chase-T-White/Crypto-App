import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { IoMdClose } from "react-icons/io";
import { MdOutlineStackedLineChart } from "react-icons/md";
import CoinsCharts from "./CoinsCharts";
import CoinsCarousel from "../CoinsCarousel";
import { capitalizeFirstLetter } from "@/utils/formatText";
import { AppDispatch } from "@/lib/store";
import { selectCurrency } from "@/lib/features/currencySlice";
import {
  clearCoin,
  removeCoinById,
  selectAllCoinData,
  fetchCoinData,
} from "@/lib/features/charts/chartSlice";
import { selectAllCoins } from "@/lib/features/coins/coinsSlice";

const CoinsChartsSection = () => {
  const coins = useSelector(selectAllCoins);
  const coinData = useSelector(selectAllCoinData);
  const currency = useSelector(selectCurrency);
  const [isCompare, setIsCompare] = useState(false);
  const [coinDataError, setCoinDataError] = useState(false);
  const [timeScale, setTimeScale] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const previousTimeScaleRef = useRef(timeScale);
  const previousCurrencyRef = useRef(currency);
  const isFirstRender = useRef(true);

  // inital render data fetch
  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(fetchCoinData({ coinId: "bitcoin", symbol: "btc", days: 1 }));
      isFirstRender.current = false;
    }
  }, [dispatch]);

  // data fetch when timescale changes
  useEffect(() => {
    const previousTimeScale = previousTimeScaleRef.current;
    if (timeScale !== previousTimeScale) {
      previousTimeScaleRef.current = timeScale;
      const coinDataClone = [...coinData];
      dispatch(clearCoin());
      coinDataClone.forEach((coin: Coins) => {
        dispatch(
          fetchCoinData({
            coinId: coin.id.toLowerCase(),
            symbol: coin.symbol,
            days: timeScale,
          })
        );
      });
    }
    // eslint-ignore-next-line react-hooks/exhaustive-deps
  }, [timeScale]);

  // data fetch when currency changes
  useEffect(() => {
    const previousCurrency = previousCurrencyRef.current;
    if (
      (currency !== "" && previousCurrency === "") ||
      currency !== previousCurrency
    ) {
      previousCurrencyRef.current = currency;
      const coinDataClone = [...coinData];
      dispatch(clearCoin());
      coinDataClone.forEach((coin: Coins) => {
        dispatch(
          fetchCoinData({
            coinId: coin.id.toLowerCase(),
            symbol: coin.symbol,
            days: timeScale,
          })
        );
      });
    }
    // eslint-ignore-next-line react-hooks/exhaustive-deps
  }, [currency]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCoinDataError(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [coinDataError]);

  const setCoinFetchById = (coinId: string, symbol: string) => {
    const coinFound = Boolean(
      coinData.find((coin: Coins) => coin.id === capitalizeFirstLetter(coinId))
    );

    // Single coin selection. Remove and add coin if selected coin isn't already selected
    if (!isCompare) {
      if (coinFound) {
        return;
      } else {
        dispatch(clearCoin());
        dispatch(fetchCoinData({ coinId, symbol, days: timeScale }));
      }
      return;
    }

    // 2 Coin selection. Remove Coin if already selected and isn't the only coin or add a coin if only 1 is selected
    if (isCompare) {
      if (coinFound && coinData.length === 2) {
        dispatch(removeCoinById(coinId));
      } else if (coinData.length === 2) {
        setCoinDataError(true);
        return;
      } else if (coinFound) {
        return;
      } else {
        dispatch(fetchCoinData({ coinId, symbol, days: timeScale }));
      }
    }
  };

  const setCoinFetchByTimeScale = (newTimeScale: number) => {
    // No compare data fetch
    const coinId = coinData[0].id.toLowerCase();
    const symbol = coinData[0].symbol;

    dispatch(clearCoin());
    dispatch(fetchCoinData({ coinId, symbol, days: newTimeScale }));

    if (isCompare) {
      const coinId2 = coinData[1].id.toLowerCase();
      const symbol2 = coinData[1].symbol;

      dispatch(
        fetchCoinData({ coinId: coinId2, symbol: symbol2, days: newTimeScale })
      );
    }
    setTimeScale(newTimeScale);
  };

  return (
    <section className="mb-[72px]">
      <div className="flex justify-between items-start mb-6 text-darkTheme-white-200 text-sm">
        Select a currency to view statistics
        <button
          className={`flex items-center gap-2.5 py-3.5 px-[26px] border border-solid border-transparent bg-white dark:bg-dark-purple-500 rounded-md`}
          onClick={() => {
            if (coinData.length === 2) {
              dispatch(removeCoinById(coinData[1].id));
            }
            setIsCompare(!isCompare);
          }}
        >
          {!isCompare ? (
            <>
              <MdOutlineStackedLineChart className="w-[20px] h-[20px]" />
              Compare
            </>
          ) : (
            <>
              <IoMdClose className="w-[20px] h-[20px]" /> Exit comparison
            </>
          )}
        </button>
      </div>
      <article>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <CoinsCarousel {...{ setCoinFetchById, coins, coinDataError }} />
          </ErrorBoundary>
          <CoinsCharts {...{ timeScale, setCoinFetchByTimeScale, isCompare }} />
        </ErrorBoundary>
      </article>
    </section>
  );
};

export default CoinsChartsSection;
