import React, { useState } from "react";
import { PiArrowsLeftRight } from "react-icons/pi";
import ConvertorCard from "./ConvertorCard";

const CoinsConvertorSection = () => {
  const [isSwapConversion, setIsSwapConversion] = useState(false);
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
          <ConvertorCard />
          <div></div>
          <button
            className="absolute top-1/2 translate-y-1/2 left-1/2 translate-x-1/2 inline-block w-12 aspect-square flex items-center justify-center bg-white rounded-full"
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
