import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { useSelector } from "react-redux";

const InvestmentCalculator = ({
  setIsShowInvestmentCalculator,
}: {
  setIsShowInvestmentCalculator: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [isShowCoinList, setIsShowCoinList] = useState(false);

  return (
    <article className="px-12 py-[51.5px] bg-[#13121A] border border-[#2D2D51] rounded-lg">
      <header className="flex justify-between">
        Investment Calculator
        <IoMdCloseCircleOutline
          onClick={() => setIsShowInvestmentCalculator(false)}
        />
      </header>
      <div>
        <div>
          {/* selected coin name */}
          <div></div>
          {/* coin list with input search */}
          <div className="relative flex justify-between">
            Select coin
            <GoTriangleDown />
            {isShowCoinList}
          </div>
        </div>
      </div>
      <footer>
        Bitcoin is the first successful internet money based on peer-to-peer
        technology; whereby no central bank or authority is involved in the
        transaction and production of the Bitcoin currency. It was created by an
        anonymous individual/group under the name, Satoshi Nakamoto.
      </footer>
    </article>
  );
};

export default InvestmentCalculator;
