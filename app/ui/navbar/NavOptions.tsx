"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeButton } from "./buttons";
import { fetchCoinsList } from "@/lib/features/coins/coinsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { FixedSizeList as List } from "react-window";
import { useSelector } from "react-redux";
import { selectCoinsList } from "@/lib/features/coins/coinsSlice";
import Link from "next/link";

const NavOptions = () => {
  const [isShowList, setIsShowList] = useState(false);
  const [filteredCoinsList, setFilteredCoinsList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const coinsList = useSelector(selectCoinsList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (coinsList.length === 0) {
      dispatch(fetchCoinsList());
    }
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setInputValue(target.value);

    const filterCoinsList = coinsList.filter((coin: string) =>
      coin.toLowerCase().startsWith(target.value.toLowerCase())
    );

    setFilteredCoinsList(filterCoinsList);
  };

  const Row = ({ index, style }: { index: number; style: any }) => (
    <div
      style={style}
      className="w-full py-2 px-4 cursor-pointer hover:bg-[#2D2D51]"
      onClick={() => {
        setIsShowList(false);
        setFilteredCoinsList([]);
        setInputValue("");
      }}
    >
      <Link
        href={`/coin/${filteredCoinsList[index].toLowerCase()}`}
        className="w-full block"
      >
        {filteredCoinsList[index]}
      </Link>
    </div>
  );

  return (
    <div className="grow max-w-[545px] flex gap-4">
      <div className="relative grow max-w-[360px] bg-lightTheme-bg-purple-200 dark:bg-dark-purple-700 rounded-md border border-[#ffffff0d]">
        <div className="flex gap-3 py-3.5 px-4 ">
          <Image
            src="/images/Search.svg"
            alt="Search icon"
            width={20}
            height={20}
          />
          <input
            type="text"
            name="search"
            id="search"
            value={inputValue}
            placeholder="Search..."
            className="bg-transparent"
            onClick={() => setIsShowList(!isShowList)}
            onChange={handleOnChange}
          />
        </div>
        {isShowList && (
          <div className="w-full absolute z-50">
            <List
              height={200}
              itemCount={filteredCoinsList.length}
              itemSize={35}
              className="w-full bg-[#13121A] border border-[#2D2D51] rounded-md"
            >
              {Row}
            </List>
          </div>
        )}
      </div>
      <div className="max-w-[108px] flex gap-3 py-3.5 px-4 bg-lightTheme-bg-purple-200 dark:bg-dark-purple-700 rounded-md border border-[#ffffff0d]">
        <select name="currency" id="currency" className="bg-transparent">
          <option value="usd">USD</option>
          <option value="ot">other options</option>
          <option value="ot">other options</option>
          <option value="ot">other options</option>
          <option value="ot">other options</option>
          <option value="ot">other options</option>
        </select>
      </div>
      <div
        className="flex items-center justify-center bg-lightTheme-bg-purple-200 dark:bg-dark-purple-700 rounded-md border border-[#ffffff0d]"
        title="Toggle theme"
      >
        <ThemeButton />
      </div>
    </div>
  );
};

export default NavOptions;
