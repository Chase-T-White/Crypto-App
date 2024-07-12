import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { PiMagnifyingGlass } from "react-icons/pi";
import { GoTriangleDown } from "react-icons/go";

const InvestmentCalcCoinSelect = ({
  coinsList,
  setSelectedCoin,
  setIsShowCoinList,
  selectedCoin,
  isShowCoinList,
}: {
  coinsList: string[];
  setSelectedCoin: React.Dispatch<React.SetStateAction<string>>;
  setIsShowCoinList: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCoin: string;
  isShowCoinList: boolean;
}) => {
  const [filteredCoinsList, setFilteredCoinsList] = useState<string[]>([]);

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
              width={""}
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
  );
};

export default InvestmentCalcCoinSelect;
