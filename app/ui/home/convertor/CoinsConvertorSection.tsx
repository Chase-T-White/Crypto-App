import React, { useEffect, useState } from "react";
import { PiArrowsLeftRight } from "react-icons/pi";
import ConvertorCard from "./ConvertorCard";
import { useSelector } from "react-redux";
import {
  selectAllCoins,
  coinsFetchStatus,
} from "@/lib/features/coins/coinsSlice";
import { ErrorBoundary } from "react-error-boundary";
import { CoinsConvertorSectionSkeleton } from "../../skeletons";

const CoinsConvertorSection = () => {
  const [isSwapConversion, setIsSwapConversion] = useState(false);
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
  }, []);

  return (
    <section className="mb-[72px]">
      <div className="mb-[72px]">
        <div className="mb-6">
          <p className="text-white text-lg mb-2">Online currency convertor</p>
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
                  bgColor={"bg-dark-purple-600"}
                  isSwapConversion={isSwapConversion}
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
                  bgColor={"bg-dark-purple-800"}
                  isSwapConversion={!isSwapConversion}
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
            <button
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 inline-block w-12 aspect-square flex items-center justify-center bg-white rounded-full"
              title="Click to swap conversion"
            >
              <PiArrowsLeftRight
                className="text-2xl text-red"
                onClick={() => setIsSwapConversion(!isSwapConversion)}
              />
            </button>
          </div>
        </ErrorBoundary>
      </div>
      <div>{/* chart section */}</div>
    </section>
  );
};

export default CoinsConvertorSection;
