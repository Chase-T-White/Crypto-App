import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { AppDispatch } from "@/lib/store";
import { setDateMinMax } from "@/utils/formatText";
import { selectCoinsList } from "@/lib/features/coins/coinsSlice";
import { fetchNewPortfolioCoin } from "@/lib/features/portfolio/portfolioSlice";

const NewAssetModal = ({
  setIsAddAsset,
}: {
  setIsAddAsset: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState("Select Coin");
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState("");
  const [isShowCoinsList, setIsShowCoinsList] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredCoinsList, setFilteredCoinsList] = useState<string[]>([]);
  const coinsList = useSelector(selectCoinsList);
  const dispatch = useDispatch<AppDispatch>();

  const { minDate, maxDate } = setDateMinMax();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setInputValue(target.value);

    const filterCoinsList = coinsList.filter((coin: string) =>
      coin.toLowerCase().startsWith(target.value.toLowerCase())
    );

    setFilteredCoinsList(filterCoinsList);
  };

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
      className="py-2 px-4 cursor-pointer hover:bg-light-purple-200/50 hover:dark:bg-[#2D2D51]"
      onClick={() => {
        setSelectedCoin(filteredCoinsList[index]);
        setIsShowCoinsList(false);
        setInputValue("");
      }}
    >
      {filteredCoinsList[index]}
    </div>
  );

  return (
    <article className="max-w-[890px] w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 p-12 bg-white dark:bg-dark-purple-900 border border-[#2D2D51] rounded-xl">
      <header className="flex items-center justify-between text-lg font-medium mb-6">
        Select coins
        <button onClick={() => setIsAddAsset(false)}>
          <IoMdCloseCircleOutline />
        </button>
      </header>
      <div className="flex md:gap-8">
        <div className="hidden md:flex w-[300px] h-[240px] items-center justify-center text-3xl text-white bg-light-purple-300 dark:bg-dark-blue-700 rounded-lg">
          {selectedCoin !== "Select Coin" && selectedCoin}
        </div>
        <div className="md:max-w-[460px] grow flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-4 text-dark-text-400 dark:text-white/70">
            <div className="relative h-[40px] rounded-lg cursor-pointer bg-light-purple-300/50 dark:bg-[#2b2a33]">
              <div
                className="w-full flex items-center justify-between p-2 rounded-lg"
                onClick={() => setIsShowCoinsList(!isShowCoinsList)}
              >
                {selectedCoin} <GoTriangleDown />
              </div>
              {isShowCoinsList && (
                <div className="w-full absolute z-50 bg-light-purple-200 dark:bg-dark-purple-900">
                  <div className="py-1.5 px-2 border border-[#2D2D51] rounded-t-md">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={inputValue}
                      placeholder="Search..."
                      autoFocus
                      className="bg-transparent"
                      onChange={handleOnChange}
                    />
                  </div>
                  <List
                    width={""}
                    height={200}
                    itemCount={filteredCoinsList.length}
                    itemSize={35}
                    className="w-full border border-t-0 sm:border-t border-[#2D2D51] rounded-b-md"
                  >
                    {Row}
                  </List>
                </div>
              )}
            </div>
            <div>
              <input
                type="number"
                className="w-full p-2 rounded-lg text-dark-text-400 dark:text-white/50 bg-light-purple-300/50 dark:bg-[#2b2a33]"
                min={1}
                max={9999}
                placeholder="Amount Purchased"
                onChange={(e) => setPurchasedAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <input
                type="date"
                className="w-full p-2 rounded-lg bg-light-purple-300/50 dark:bg-[#2b2a33]"
                min={minDate}
                max={maxDate}
                onChange={(e) => setPurchasedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="flex justify-center basis-1/2 p-3 rounded-lg bg-light-purple-200/20 dark:bg-dark-purple-500"
              onClick={() => setIsAddAsset(false)}
            >
              Cancel
            </button>
            <button
              className="flex justify-center basis-1/2 p-3 rounded-lg bg-light-purple-300/50"
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
