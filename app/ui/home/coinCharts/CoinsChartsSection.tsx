import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCoins } from "@/lib/features/coins/coinsSlice";
import CoinsCarousel from "../CoinsCarousel";
import { selectAllCoinData } from "@/lib/features/charts/chartSlice";
import { clearCoin, removeCoinById } from "@/lib/features/charts/chartSlice";
import { fetchCoinData } from "@/lib/features/charts/chartSlice";
import { AppDispatch } from "@/lib/store";
import CoinsCharts from "./CoinsCharts";
import { IoMdClose } from "react-icons/io";
import { capitalizeFirstLetter } from "@/utils/formatText";
import { time } from "console";

const CoinsChartsSection = () => {
  const coins = useSelector(selectAllCoins);
  const coinData = useSelector(selectAllCoinData);
  const [isCompare, setIsCompare] = useState(false);
  const [coinDataError, setCoinDataError] = useState(false);
  const [timeScale, setTimeScale] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCoinData({ coinId: "bitcoin", symbol: "btc", days: 1 }));
  }, [dispatch]);

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

  const setCoinFetchByTimeScale = (timeScale: number) => {
    // No compare data fetch
    const coinId = coinData[0].id.toLowerCase();
    const symbol = coinData[0].symbol;

    dispatch(clearCoin());
    dispatch(fetchCoinData({ coinId, symbol, days: timeScale }));

    if (isCompare) {
      const coinId2 = coinData[1].id.toLowerCase();
      const symbol2 = coinData[1].symbol;

      dispatch(
        fetchCoinData({ coinId: coinId2, symbol: symbol2, days: timeScale })
      );
    }
  };

  return (
    <section className="mb-[72px]">
      <div className="flex justify-between items-end mb-6 text-darkTheme-white-200 text-sm">
        Select the currency to view statistics
        <button
          className={`flex items-center gap-2.5 py-3.5 px-[26px] border border-solid border-transparent bg-dark-purple-400 rounded-md`}
          onClick={() => {
            if (coinData.length === 2) {
              dispatch(removeCoinById(coinData[1].id));
            }
            setIsCompare(!isCompare);
          }}
        >
          {!isCompare ? (
            <>
              <Image
                src="/images/Compare.svg"
                alt="Compare icon"
                width={20}
                height={20}
              />
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
        <CoinsCarousel {...{ setCoinFetchById, coins, coinDataError }} />
        <CoinsCharts
          {...{ timeScale, setTimeScale, setCoinFetchByTimeScale, isCompare }}
        />
      </article>
    </section>
  );
};

export default CoinsChartsSection;
