"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSort } from "react-icons/fa";
import CryptoCoinTableRow from "./CryptoCoinTableRow";
import { fetchCoins, selectAllCoins } from "@/lib/features/coins/coinsSlice";
import { AppDispatch } from "@/lib/store";
import { coinTableSort } from "@/utils/extraFunctions";
import { CoinsTableRowSectionSkeleton } from "../../skeletons";

const CryptoCoinTable = () => {
  const coins = useSelector(selectAllCoins);
  const dispatch = useDispatch<AppDispatch>();

  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortRotation, setSortRotation] = useState("");
  const [sortCategory, setSortCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCoins(pageNumber));
  }, [dispatch, pageNumber]);

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
