import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { useSelector } from "react-redux";
import { BsQuestionCircle } from "react-icons/bs";
import InvestmentInputRow from "./InvestmentInputRow";

const InvestmentCalculator = ({
  setIsShowInvestmentCalculator,
}: {
  setIsShowInvestmentCalculator: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [isShowCoinList, setIsShowCoinList] = useState(false);
  const [typeCostAveraging, setTypeCostAveraging] = useState("value");

  return (
    <article className="max-w-[890px] w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 p-12 bg-[#13121A] border border-[#2D2D51] rounded-lg">
      <header className="flex items-center justify-between mb-8 font-medium text-2xl">
        Investment Calculator
        <IoMdCloseCircleOutline
          className="cursor-pointer"
          onClick={() => setIsShowInvestmentCalculator(false)}
        />
      </header>
      <div>
        <div className="flex gap-8 mb-8">
          {/* selected coin name */}
          <div className="max-w-[170px] w-full p-[12.5] font-bold bg-[#191932] rounded-lg">
            {selectedCoin}
          </div>
          {/* coin list with input search */}
          <div className="relative flex justify-between">
            Select coin
            <GoTriangleDown />
            {isShowCoinList}
          </div>
        </div>
        <div>
          <div className="flex gap-4 mb-4">
            <button
              className={`grow py-3 ${
                typeCostAveraging === "value" ? "active-button" : "bg-[#232336]"
              } rounded-lg`}
              onClick={() => setTypeCostAveraging("value")}
              disabled={typeCostAveraging === "value"}
            >
              Value Cost Averaging
            </button>
            <button
              className={`grow py-3 ${
                typeCostAveraging === "dollar"
                  ? "active-button"
                  : "bg-[#232336]"
              } rounded-lg`}
              onClick={() => setTypeCostAveraging("dollar")}
              disabled={typeCostAveraging === "dollar"}
            >
              Dollar Cost Averaging
            </button>
          </div>
          <div className="flex justify-between mb-4">
            {/* date inputs */}
            <div className="flex gap-4">
              <div className="flex p-2 bg-[#191932] rounded-lg">
                <input type="datetime-local" name="" id="" />
                <button>
                  <BsQuestionCircle />
                </button>
              </div>
              <div className="flex p-2 bg-[#191932] rounded-lg">
                <input type="datetime-local" name="" id="" />
                <button>
                  <BsQuestionCircle />
                </button>
              </div>
            </div>
            <div>
              <button>
                {/* No idea what this button is for */}
                Q-ty
              </button>
            </div>
          </div>
          <div className="mb-8 px-8 py-6 bg-[#1E1932] rounded-xl">
            {/* input field body */}
            <InvestmentInputRow rowDetail={"Contribution interval, days"} />
            <InvestmentInputRow rowDetail={"Initial investment, $"} />
            <InvestmentInputRow rowDetail={"Grow rate per interval, %"} />
            <InvestmentInputRow
              rowDetail={"Total amount spent on investments, $"}
            />
            <InvestmentInputRow rowDetail={"Coins value, $"} isLast={true} />
          </div>
        </div>
        <div className="w-full mb-8 p-3 text-center active-button rounded-lg">
          <button>Calculate (VCA)</button>
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
