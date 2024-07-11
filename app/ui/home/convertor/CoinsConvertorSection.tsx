import { useEffect, useState } from "react";
import { PiArrowsLeftRight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import ConvertorCard from "./ConvertorCard";
import CoinConvertorChartSection from "./CoinConvertorChartSection";
import { CoinsConvertorSectionSkeleton } from "../../skeletons";
import {
  selectAllCoins,
  coinsFetchStatus,
} from "@/lib/features/coins/coinsSlice";

const CoinsConvertorSection = () => {
  const [amountToSell, setAmountToSell] = useState(1);
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [selectedCoins, setSelectedCoins] = useState<Coins[]>([]);
  const coins = useSelector(selectAllCoins);
  const coinsStatus = useSelector(coinsFetchStatus);
  const date = new Date();

  useEffect(() => {
    setAmountToBuy(
      (amountToSell * coins[0].current_price) / coins[1].current_price
    );
    setSelectedCoins([coins[0], coins[1]]);
  }, [amountToSell, coins]);

  return (
    <section className="mb-[72px]">
      <div className="mb-[72px]">
        <div className="mb-6">
          <p className="text-lg mb-2">Online currency convertor</p>
          <p className="text-[#9E9E9E]">{date.toLocaleString()}</p>
        </div>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <div className="relative flex gap-6">
            {/* convertor cards */}
            {coinsStatus === "idle" ||
            coinsStatus === "loading" ||
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
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 inline-block w-12 aspect-square flex items-center justify-center bg-white rounded-full">
              <PiArrowsLeftRight className="text-2xl text-[#000]" />
            </div>
          </div>
        </ErrorBoundary>
      </div>
      <CoinConvertorChartSection selectedCoins={selectedCoins} />
    </section>
  );
};

export default CoinsConvertorSection;
