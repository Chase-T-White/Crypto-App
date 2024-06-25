"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSort } from "react-icons/fa";
import CryptoCoinTableRow from "./CryptoCoinTableRow";
import { fetchCoins, selectAllCoins } from "@/lib/features/coins/coinsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { CoinsTableRowSectionSkeleton } from "../../skeletons";

const CryptoCoinTable = () => {
  const coins = useSelector(selectAllCoins);
  const dispatch = useDispatch<AppDispatch>();
  const coinsStatus = useSelector((state: RootState) => state.coins.status);

  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortRotation, setSortRotation] = useState("");
  const [sortCategory, setSortCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCoins(pageNumber));
  }, [dispatch, pageNumber]);

  const changeSort = (category: string) => {
    setSortRotation(
      sortRotation === "" || category !== sortCategory
        ? "asc"
        : sortRotation === "asc"
        ? "desc"
        : ""
    );

    setSortCategory(category);
  };

  return (
    <InfiniteScroll
      dataLength={coins.length}
      next={() => setPageNumber(pageNumber + 1)}
      hasMore={hasMore}
      loader={<CoinsTableRowSectionSkeleton />}
      scrollThreshold={0.95}
      className="w-full"
      endMessage={<p style={{ textAlign: "center" }}>No more coins</p>}
    >
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead className="px-5 py-4 mb-2 text-sm text-lightTheme-blue-300 dark:text-darkTheme-white-200">
          <tr>
            <th className="ps-5">#</th>
            <th className="cursor-pointer" onClick={() => changeSort("name")}>
              <div className="flex items-center gap-2">
                Name <FaSort className="text-white" />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() => changeSort("current_price")}
            >
              <div className="flex items-center gap-2">
                Price <FaSort className="text-white" />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                changeSort("price_change_percentage_1h_in_currency")
              }
            >
              <div className="flex items-center gap-2">
                1h% <FaSort className="text-white" />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                changeSort("price_change_percentage_24h_in_currency")
              }
            >
              <div className="flex items-center gap-2">
                24h% <FaSort className="text-white" />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                changeSort("price_change_percentage_7d_in_currency")
              }
            >
              <div className="flex items-center gap-2">
                7d% <FaSort className="text-white" />
              </div>
            </th>
            <th>24h volume / Market Cap</th>
            <th>Circulating / Total supply</th>
            <th className="pe-5">Last 7d</th>
          </tr>
        </thead>
        <tbody>
          {[...coins]
            .sort((a: any, b: any) => {
              if (sortRotation === "asc") {
                if (typeof a[sortCategory] === "number") {
                  return a[sortCategory] > b[sortCategory] ? 1 : -1;
                }
                return a[sortCategory]
                  .toString()
                  .localeCompare(b[sortCategory]);
              } else if (sortRotation === "desc") {
                if (typeof a[sortCategory] === "number") {
                  return a[sortCategory] > b[sortCategory] ? -1 : 1;
                }
                return b[sortCategory]
                  .toString()
                  .localeCompare(a[sortCategory]);
              } else {
                return a - b;
              }
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
