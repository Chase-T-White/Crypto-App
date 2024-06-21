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

  const setCoinFetchById = (coinId: string, symbol: string) => {
    const coinFound = Boolean(
      coinData.find((coin: Coins) => coin.id === coinId)
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
    const coinId = coinData[0].id;
    const symbol = coinData[0].symbol;

    dispatch(clearCoin());
    dispatch(fetchCoinData({ coinId, symbol, days: timeScale }));
  };

  return (
    <section className="mb-[72px]">
      <div className="flex justify-between items-end mb-6 text-darkTheme-white-200 text-sm">
        Select the currency to view statistics
        <button
          className={`flex items-center gap-2.5 py-3.5 px-[26px] border border-solid ${
            isCompare
              ? "active-button"
              : "border-transparent bg-dark-purple-400"
          } rounded-md`}
          onClick={() => setIsCompare(!isCompare)}
        >
          <Image
            src="/images/Compare.svg"
            alt="Compare icon"
            width={20}
            height={20}
          />
          Compare
        </button>
      </div>
      <article>
        <CoinsCarousel {...{ setCoinFetchById, coins }} />
        <CoinsCharts
          {...{ timeScale, setTimeScale, setCoinFetchByTimeScale }}
        />
      </article>
    </section>
  );
};

export default CoinsChartsSection;
