import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCoinsList } from "@/lib/features/coins/coinsSlice";
import { fetchNewPortfolioCoin } from "@/lib/features/portfolio/portfolioSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { v4 } from "uuid";
import { setDateMinMax } from "@/utils/formatText";
import { FixedSizeList as List } from "react-window";
import { GoTriangleDown } from "react-icons/go";

const NewAssetModal = ({
  setIsAddAsset,
}: {
  setIsAddAsset: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState("Select Coin");
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState("");
  const [isShowCoinsList, setIsShowCoinsList] = useState(false);
  const coinsList = useSelector(selectCoinsList);
  const dispatch = useDispatch<AppDispatch>();

  const { minDate, maxDate } = setDateMinMax();

  const handleClick = () => {
    const reverseDate = purchasedDate.split("-").reverse().join("-");

    const newCoinInfo = {
      id: selectedCoin.toLowerCase(),
      number_of_coins: purchasedAmount,
      date_purchased: reverseDate,
    };

    dispatch(fetchNewPortfolioCoin(newCoinInfo));
    setIsAddAsset(false);
  };

  const Row = ({ index, style }: { index: number; style: any }) => (
    <div
      style={style}
      className="py-2 px-4 cursor-pointer hover:bg-[#2D2D51]"
      onClick={() => {
        setSelectedCoin(coinsList[index]);
        setIsShowCoinsList(false);
      }}
    >
      {coinsList[index]}
    </div>
  );

  return (
    <article className="max-w-[890px] w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 p-12 bg-[#13121A] border border-[#2D2D51] rounded-xl">
      <header className="flex items-center justify-between text-lg font-medium mb-6">
        Select coins
        <button onClick={() => setIsAddAsset(false)}>
          <IoMdCloseCircleOutline />
        </button>
      </header>
      <div className="flex gap-8">
        <div className="w-[300px] h-[240px] flex items-center justify-center text-3xl bg-[#191932] rounded-lg">
          {selectedCoin !== "Select Coin" && selectedCoin}
        </div>
        <div className="max-w-[460px] grow flex flex-col justify-between">
          <div className="flex flex-col gap-4 text-[#FFFFFFB2]">
            <div className="relative h-[40px]">
              <div
                className="w-full flex items-center justify-between p-2 rounded-lg"
                onClick={() => setIsShowCoinsList(!isShowCoinsList)}
              >
                {selectedCoin} <GoTriangleDown />
              </div>
              {isShowCoinsList && (
                <List
                  height={200}
                  itemCount={coinsList.length}
                  itemSize={35}
                  className="w-full absolute z-50 bg-[#13121A] border border-[#2D2D51] rounded-md"
                >
                  {Row}
                </List>
              )}
            </div>
            <div>
              <input
                type="number"
                className="w-full p-2 rounded-lg"
                min={1}
                max={9999}
                placeholder="Amount Purchased"
                onChange={(e) => setPurchasedAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <input
                type="date"
                className="w-full p-2 rounded-lg"
                min={minDate}
                max={maxDate}
                onChange={(e) => setPurchasedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="flex justify-center basis-1/2 p-3 rounded-lg bg-[#232336]"
              onClick={() => setIsAddAsset(false)}
            >
              Cancel
            </button>
            <button
              className="flex justify-center basis-1/2 p-3 rounded-lg bg-[#6161D680]"
              onClick={handleClick}
              disabled={
                selectedCoin !== "Select Coin" &&
                !purchasedAmount &&
                !purchasedDate
              }
            >
              Save and Continue
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewAssetModal;
