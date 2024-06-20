import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCoins } from "@/lib/features/coins/coinsSlice";
import CoinsCarousel from "../CoinsCarousel";
import { selectAllCoinData } from "@/lib/features/charts/chartSlice";
import { removeCoin } from "@/lib/features/charts/chartSlice";
import { fetchCoinData } from "@/lib/features/charts/chartSlice";
import { AppDispatch } from "@/lib/store";
import CoinsCharts from "./CoinsCharts";

const CoinsChartsSection = () => {
  const coins = useSelector(selectAllCoins);
  const coinData = useSelector(selectAllCoinData);
  // const [viewCoin, setViewCoin] = useState(["bitcoin"]);
  const [isCompare, setIsCompare] = useState(false);
  const [coinDataError, setCoinDataError] = useState(false);
  const [timeScale, setTimeScale] = useState("1day");
  const dispatch = useDispatch<AppDispatch>();

  console.log(isCompare);

  // dispatch(fetchCoinData(viewCoin));

  useEffect(() => {
    dispatch(fetchCoinData({ coinId: "bitcoin", symbol: "btc" }));
  }, [dispatch]);

  const setCoinFetch = (coinId: string, symbol: string) => {
    const coinFound = Boolean(
      coinData.find((coin: Coins) => coin.id === coinId)
    );

    if (coinFound && coinData.length === 2) {
      dispatch(removeCoin(coinId));
    } else if (coinData.length === 2) {
      setCoinDataError(true);
      return;
    } else if (coinFound) {
      return;
    } else {
      dispatch(fetchCoinData({ coinId, symbol }));
    }
  };

  // useEffect(() => {
  //   // if (coins.length > 0) {
  //   //   setViewCoin(coins[0].id);
  //   // }

  //   setCoinFetch(viewCoin);
  // }, [coins, setViewCoin, setCoinFetch, viewCoin]);

  // useEffect(() => {
  //   if (coinDataError) {
  //     const timeout = setTimeout(() => {
  //       setCoinDataError(false);
  //     }, 3000);

  //     return clearTimeout(timeout);
  //   }
  // }, [coinDataError]);

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
        <CoinsCarousel {...{ setCoinFetch, coins }} />
        <CoinsCharts {...{ timeScale, setTimeScale }} />
      </article>
    </section>
  );
};

export default CoinsChartsSection;
