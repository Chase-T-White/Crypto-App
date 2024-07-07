import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectCoinsList } from "@/lib/features/coins/coinsSlice";
import { BsQuestionCircle } from "react-icons/bs";
import InvestmentInputRow from "./InvestmentInputRow";
import { FixedSizeList as List } from "react-window";
import { PiMagnifyingGlass } from "react-icons/pi";

const InvestmentCalculator = ({
  setIsShowInvestmentCalculator,
}: {
  setIsShowInvestmentCalculator: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [isShowCoinList, setIsShowCoinList] = useState(false);
  const [typeCostAveraging, setTypeCostAveraging] = useState("value");
  const [filteredCoinsList, setFilteredCoinsList] = useState([]);
  const coinsList = useSelector(selectCoinsList);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    const filterCoinsList = coinsList.filter((coin: string) =>
      coin.toLowerCase().startsWith(target.value.toLowerCase())
    );

    setFilteredCoinsList(filterCoinsList);
  };

  const Row = ({ index, style }: { index: number; style: any }) => (
    <div
      style={style}
      className="py-2 px-4 cursor-pointer hover:bg-[#2D2D51]"
      onClick={() => {
        setSelectedCoin(filteredCoinsList[index]);
        setIsShowCoinList(false);
        setFilteredCoinsList([]);
      }}
    >
      {filteredCoinsList[index]}
    </div>
  );

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
        <div className="flex items-center gap-8 mb-8">
          {/* selected coin name */}
          <div className="max-w-[170px] w-full min-h-[44px] p-2 text-center font-bold bg-[#191932] rounded-lg">
            {selectedCoin}
          </div>
          {/* coin list with input search */}
          <div className="relative w-full">
            <div
              className="w-full flex items-center justify-between p-2 text-[#FFFFFFB2] bg-[#191925] rounded cursor-pointer"
              onClick={() => setIsShowCoinList(!isShowCoinList)}
            >
              Select coin
              <GoTriangleDown />
            </div>
            {isShowCoinList && (
              <div className="absolute w-full">
                <div className="flex items-center gap-3 py-2 px-4 bg-[#13121A] border border-b-0 border-[#2D2D51] rounded-t-md">
                  <PiMagnifyingGlass />
                  <input
                    className="grow bg-transparent"
                    type="search"
                    onChange={handleOnChange}
                  />
                </div>
                <List
                  height={200}
                  itemCount={filteredCoinsList.length}
                  itemSize={35}
                  className="w-full absolute z-50 bg-[#13121A] border border-[#2D2D51] rounded-b-md"
                >
                  {Row}
                </List>
              </div>
            )}
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
          <div className="flex justify-between mb-4 text-birches-100">
            {/* date inputs */}
            <div className="flex gap-4">
              <div className="flex p-2 bg-[#191932] rounded-lg">
                <input type="datetime-local" name="" id="" />
                <button className="text-white">
                  <BsQuestionCircle />
                </button>
              </div>
              <div className="flex p-2 bg-[#191932] rounded-lg">
                <input type="datetime-local" name="" id="" />
                <button className="text-white">
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
