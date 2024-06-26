import React, { useState } from "react";
import { PiArrowsLeftRight } from "react-icons/pi";
import ConvertorCard from "./ConvertorCard";
import { useSelector } from "react-redux";
import { selectAllCoins } from "@/lib/features/coins/coinsSlice";

const CoinsConvertorSection = () => {
  const [isSwapConversion, setIsSwapConversion] = useState(false);
  const [amountToSell, setAmountToSell] = useState(1);
  const [amoutToBuy, setAmountToBuy] = useState(1);
  const coins = useSelector(selectAllCoins);
  const date = new Date();

  return (
    <section className="mb-[72px]">
      <div className="mb-[72px]">
        <div className="mb-6">
          <p className="text-white text-lg mb-2">Online currency convertor</p>
          <p className="text-[#9E9E9E]">{date.toLocaleString()}</p>
        </div>
        <div className="relative flex gap-6">
          {/* convertor cards */}
          <ConvertorCard
            bgColor={"bg-dark-purple-600"}
            isSwapConversion={isSwapConversion}
            coins={coins}
            isFirst={true}
            amountToSell={amountToSell}
            setAmountToSell={setAmountToSell}
            amoutToBuy={amoutToBuy}
            setAmountToBuy={setAmountToBuy}
          />
          <ConvertorCard
            bgColor={"bg-dark-purple-800"}
            isSwapConversion={!isSwapConversion}
            coins={coins}
            isFirst={false}
            amountToSell={amountToSell}
            setAmountToSell={setAmountToSell}
            amoutToBuy={amoutToBuy}
            setAmountToBuy={setAmountToBuy}
          />
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
      </div>
      <div>{/* chart section */}</div>
    </section>
  );
};

export default CoinsConvertorSection;
