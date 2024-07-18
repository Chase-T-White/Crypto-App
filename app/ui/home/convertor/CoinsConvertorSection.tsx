import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { PiArrowsLeftRight } from "react-icons/pi";
import ConvertorCard from "./ConvertorCard";
import CoinConvertorChartSection from "./CoinConvertorChartSection";
import { CoinsConvertorSectionSkeleton } from "../../skeletons";
import {
  selectAllCoins,
  coinsFetchStatus,
} from "@/lib/features/coins/coinsSlice";
import { selectCurrency } from "@/lib/features/currencySlice";

const CoinsConvertorSection = () => {
  const [amountToSell, setAmountToSell] = useState(1);
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [selectedCoins, setSelectedCoins] = useState<Coins[]>([]);
  const coins = useSelector(selectAllCoins);
  const coinsStatus = useSelector(coinsFetchStatus);
  const currency = useSelector(selectCurrency);
  const date = new Date();

  useEffect(() => {
    if (coins.length !== 0) {
      setAmountToBuy(
        (amountToSell * coins[0].current_price) / coins[1].current_price
      );
      setSelectedCoins([coins[0], coins[1]]);
    }
  }, [coins, currency]);

  return (
    <section className="mb-[72px]">
      <div className="mb-6 base:mb-[72px]">
        <div className="mb-6">
          <p className="text-lg mb-2">Online currency convertor</p>
          <p className="text-dark-text-400/80 dark:text-[#9E9E9E]">
            {date.toLocaleString()}
          </p>
        </div>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <div className="relative flex flex-col base:flex-row gap-3 base:gap-6">
            {/* convertor cards */}
            {coinsStatus === "idle" ||
            coinsStatus === "loading" ||
            coins.length === 0 ||
            selectedCoins.length === 0 ? (
              <CoinsConvertorSectionSkeleton />
            ) : (
              <>
                <ConvertorCard
                  bgColor={"dark:bg-dark-blue-700"}
                  coins={coins}
                  isFirst={true}
                  amountToSell={amountToSell}
                  setAmountToSell={setAmountToSell}
                  amountToBuy={amountToBuy}
                  setAmountToBuy={setAmountToBuy}
                  selectedCoins={selectedCoins}
                  setSelectedCoins={setSelectedCoins}
                />
                <ConvertorCard
                  bgColor={"dark:bg-dark-purple-800"}
                  coins={coins}
                  isFirst={false}
                  amountToSell={amountToSell}
                  setAmountToSell={setAmountToSell}
                  amountToBuy={amountToBuy}
                  setAmountToBuy={setAmountToBuy}
                  selectedCoins={selectedCoins}
                  setSelectedCoins={setSelectedCoins}
                />
              </>
            )}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-90 base:rotate-0 inline-block w-12 aspect-square flex items-center justify-center bg-dark-purple-600 dark:bg-white rounded-full">
              <PiArrowsLeftRight className="text-2xl text-white dark:text-[#000]" />
            </div>
          </div>
        </ErrorBoundary>
      </div>
      <CoinConvertorChartSection selectedCoins={selectedCoins} />
    </section>
  );
};

export default CoinsConvertorSection;
