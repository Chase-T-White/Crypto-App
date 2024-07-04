import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCoinsList } from "@/lib/features/coins/coinsSlice";
import { fetchNewPortfolioCoin } from "@/lib/features/portfolio/portfolioSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { v4 } from "uuid";

const NewAssetModal = ({
  setIsAddAsset,
}: {
  setIsAddAsset: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState("");
  const coinsList = useSelector(selectCoinsList);
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <article className="absolute top-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 p-12 bg-[#a5a5a5] rounded-lg">
      <header className="flex items-center justify-between text-lg font-medium mb-6">
        Select coins
        <button onClick={() => setIsAddAsset(false)}>
          <IoMdCloseCircleOutline />
        </button>
      </header>
      <div className="flex gap-8">
        <div>{/* coin name and symbol */}</div>
        <div>
          <div>
            <select
              name=""
              id=""
              onChange={(e) => setSelectedCoin(e.target.value)}
            >
              <option defaultValue={""}>Select Coin</option>
              {coinsList.map((coin: string) => {
                return (
                  <option key={v4()} value={coin}>
                    {coin}
                  </option>
                );
              })}
            </select>
            <div>
              <input
                type="number"
                min={1}
                max={9999}
                placeholder="Amount Purchased"
                onChange={(e) => setPurchasedAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <input
                type="date"
                value="Date Purchased"
                onChange={(e) => setPurchasedDate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button onClick={() => setIsAddAsset(false)}>Cancel</button>
            <button
              onClick={handleClick}
              disabled={!selectedCoin && !purchasedAmount && !purchasedDate}
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
