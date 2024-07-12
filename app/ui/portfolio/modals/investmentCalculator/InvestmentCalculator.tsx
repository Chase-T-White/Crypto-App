import { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InvestmentInputRow from "./InvestmentInputRow";
import InvestmentCalcCoinSelect from "./InvestmentCalcCoinSelect";
import InvestmentCalcSelect from "./InvestmentCalcSelect";
import InvestmentCalcDateInputs from "./InestmentCalcDateInputs";
import { selectCoinsList } from "@/lib/features/coins/coinsSlice";

const InvestmentCalculator = ({
  setIsShowInvestmentCalculator,
}: {
  setIsShowInvestmentCalculator: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [isShowCoinList, setIsShowCoinList] = useState(false);
  const [typeCostAveraging, setTypeCostAveraging] = useState("value");
  const coinsList = useSelector(selectCoinsList);

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
        <InvestmentCalcCoinSelect
          {...{
            coinsList,
            setSelectedCoin,
            setIsShowCoinList,
            selectedCoin,
            isShowCoinList,
          }}
        />
        <div>
          <InvestmentCalcSelect
            {...{ typeCostAveraging, setTypeCostAveraging }}
          />
          <InvestmentCalcDateInputs />
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
