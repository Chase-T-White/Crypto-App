"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSort } from "react-icons/fa";
import CryptoCoinTableRow from "./CryptoCoinTableRow";
import { CoinsTableRowSectionSkeleton } from "../../skeletons";
import { selectCurrency } from "@/lib/features/currencySlice";
import {
  fetchCoins,
  selectAllCoins,
  clearCoinsList,
} from "@/lib/features/coins/coinsSlice";
import { AppDispatch } from "@/lib/store";
import { coinTableSort } from "@/utils/extraFunctions";

const CryptoCoinTable = () => {
  const coins = useSelector(selectAllCoins);
  const currency = useSelector(selectCurrency);
  const dispatch = useDispatch<AppDispatch>();

  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortRotation, setSortRotation] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const previousCurrencyRef = useRef(currency);
  const previousPageNumberRef = useRef(pageNumber);

  // fetch new data when currency changes
  useEffect(() => {
    const previousCurrency = previousCurrencyRef.current;
    if (
      (currency !== "" && previousCurrency !== "") ||
      currency !== previousCurrency
    ) {
      dispatch(clearCoinsList());
      dispatch(fetchCoins(1));
      previousCurrencyRef.current = currency;
      if (pageNumber !== 1) {
        previousPageNumberRef.current = 1;
        setPageNumber(1);
      }
    }
    // eslint-ignore-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // fetch initial render data and fetch new data when the user scrolls to bottom of coin table
  useEffect(() => {
    const previousPageNumber = previousPageNumberRef.current;

    if (pageNumber !== previousPageNumber) {
      dispatch(fetchCoins(pageNumber));
      previousPageNumberRef.current = pageNumber;
    }
    // eslint-ignore-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const changeSort = (category: string) => {
    if (sortRotation === "" || category !== sortCategory) {
      setSortRotation("asc");
    } else if (sortRotation === "asc") {
      setSortRotation("desc");
    } else {
      setSortRotation("");
    }

    setSortCategory(category);
  };

  return (
    <InfiniteScroll
      dataLength={coins.length}
      next={() => setPageNumber(pageNumber + 1)}
      hasMore={hasMore}
      loader={<CoinsTableRowSectionSkeleton />}
      scrollThreshold={0.5}
      className="w-full max-h-[900px] lg:max-h-none"
      endMessage={<p style={{ textAlign: "center" }}>No more coins</p>}
    >
      <table className="w-full min-w-[1000px] table-auto border-separate border-spacing-y-2 overflow-auto">
        <thead className="px-5 py-4 mb-2 text-sm text-lightTheme-blue-300 dark:text-darkTheme-white-200">
          <tr>
            <th className="ps-5">#</th>
            <th className="cursor-pointer" onClick={() => changeSort("name")}>
              <div className="flex items-center gap-2">
                Name <FaSort />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() => changeSort("current_price")}
            >
              <div className="flex items-center gap-2">
                Price <FaSort />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                changeSort("price_change_percentage_1h_in_currency")
              }
            >
              <div className="flex items-center gap-2">
                1h% <FaSort />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                changeSort("price_change_percentage_24h_in_currency")
              }
            >
              <div className="flex items-center gap-2">
                24h% <FaSort />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                changeSort("price_change_percentage_7d_in_currency")
              }
            >
              <div className="flex items-center gap-2">
                7d% <FaSort />
              </div>
            </th>
            <th>24h volume / Market Cap</th>
            <th>Circulating / Total supply</th>
            <th className="pe-5">Last 7d</th>
          </tr>
        </thead>
        <tbody>
          {[...coins]
            .sort((a, b): any => {
              return coinTableSort(a, b, sortRotation, sortCategory);
            })
            .map((coin: Coins, i: number) => {
              return (
                <CryptoCoinTableRow
                  key={coin.id}
                  coin={coin}
                  listNumber={i + 1}
                />
              );
            })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default CryptoCoinTable;
