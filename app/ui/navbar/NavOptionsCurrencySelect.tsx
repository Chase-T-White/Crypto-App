import { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { AppDispatch } from "@/lib/store";
import {
  selectCurrenciesList,
  selectCurrency,
  selectCurrencySymbol,
  fetchCurrenciesList,
  setCurrency,
} from "@/lib/features/currencySlice";
import { getStorageCurrency } from "@/utils/localStorageFunctions";

const NavOptionsCurrencySelect = () => {
  const [isShowList, setIsShowList] = useState(false);
  const currencyList = useSelector(selectCurrenciesList);
  const currentCurrency = useSelector(selectCurrency);
  const currencySymbol = useSelector(selectCurrencySymbol);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currencyList.length === 0) {
      const currency = getStorageCurrency();
      dispatch(setCurrency(currency));
      dispatch(fetchCurrenciesList());
    }
    // eslint-ignore-next-line react-hooks/exhaustive-deps
  }, []);

  const Row = ({ index, style }: { index: number; style: any }) => (
    <button
      style={style}
      className="w-full py-2 px-4 cursor-pointer hover:bg-[#2D2D51]"
      value={currencyList[index].toUpperCase()}
      onClick={(e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        setIsShowList(false);
        dispatch(setCurrency(target.value));
      }}
    >
      {currencyList[index].toUpperCase()}
    </button>
  );

  return (
    <div
      className="relative max-w-[108px] bg-light-purple-200/20 dark:bg-dark-purple-700 rounded-md md:rounded-xl border border-white/5 cursor-pointer"
      tabIndex={0}
      onClick={() => setIsShowList(!isShowList)}
    >
      <div className="flex items-center gap-3 py-1.5 xsm:py-3.5 px-2 xsm:px-4">
        <div>
          <span className="hidden xsm:inline mr-2">{currencySymbol}</span>
          {currentCurrency}
        </div>
        <GoTriangleDown className="shink-0" />
      </div>
      {isShowList && (
        <div className="w-full absolute z-50 bg-light-purple-200 dark:bg-dark-purple-900">
          <List
            width={""}
            height={200}
            itemCount={currencyList.length}
            itemSize={35}
            className="w-full border border-[#2D2D51] rounded-md"
          >
            {Row}
          </List>
        </div>
      )}
    </div>
  );
};

export default NavOptionsCurrencySelect;
