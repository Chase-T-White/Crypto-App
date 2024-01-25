"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSort } from "react-icons/fa";
import CryptoCoinTableRow from "./CryptoCoinTableRow";
import { RootState } from "@reduxjs/toolkit/query";

const CryptoCoinTable = () => {
  const { coins } = useSelector((state: RootState) => state.coins);
  const [renderCoins, setRenderCoins] = useState(coins.slice(0, 5));
  const [infiniteScrollCount, setInfiniteScrollCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sortRotation, setSortRotation] = useState(0);
  const [sortCategory, setSortCategory] = useState("");

  console.log(coins);

  const addMoreData = () => {
    if (infiniteScrollCount === 4) {
      setHasMore(false);
      return;
    }
    const sliceStart = infiniteScrollCount * 10;
    const sliceEnd = 11 + sliceStart;
    const nextData = coins.slice(sliceStart, sliceEnd);

    setRenderCoins(renderCoins.concat(nextData));
    setInfiniteScrollCount(infiniteScrollCount + 1);
  };

  const handleRotation = (category: string) => {
    setSortCategory(category);
    if (sortRotation === 0) {
      setSortRotation(1);
      return;
    } else if (sortRotation === 1) {
      setSortRotation(-1);
      return;
    }
    setSortRotation(0);
  };

  return (
    <InfiniteScroll
      dataLength={renderCoins.length}
      next={addMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      className="w-full"
    >
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead className="px-5 py-4 mb-2 text-sm text-darkTheme-white-200">
          <tr>
            <th className="ps-5">#</th>
            <th
              className="cursor-pointer"
              onClick={() => handleRotation("name")}
            >
              <div className="flex items-center gap-2">
                Name <FaSort className="text-white" />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() => handleRotation("current_price")}
            >
              <div className="flex items-center gap-2">
                Price <FaSort className="text-white" />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                handleRotation("price_change_percentage_1h_in_currency")
              }
            >
              <div className="flex items-center gap-2">
                1h% <FaSort className="text-white" />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                handleRotation("price_change_percentage_24h_in_currency")
              }
            >
              <div className="flex items-center gap-2">
                24h% <FaSort className="text-white" />
              </div>
            </th>
            <th
              className="cursor-pointer"
              onClick={() =>
                handleRotation("price_change_percentage_7d_in_currency")
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
              if (sortRotation === 1) {
                return b[sortCategory] - a[sortCategory];
              } else if (sortRotation === -1) {
                return a[sortCategory] - b[sortCategory];
              }
              return a - b;
            })
            .map((coin: Coins, i: number) => {
              return (
                <CryptoCoinTableRow
                  key={nanoid()}
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
