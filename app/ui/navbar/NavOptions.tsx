"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { PiMagnifyingGlass } from "react-icons/pi";
import { ThemeButton } from "./buttons";
import NavOptionsCurrencySelect from "./NavOptionsCurrencySelect";
import {
  fetchCoinsList,
  selectCoinsList,
} from "@/lib/features/coins/coinsSlice";
import { AppDispatch } from "@/lib/store";

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
    <div className="relative sm:grow max-w-[545px] flex gap-2 lg:gap-4">
      <div className="sm:relative sm:grow max-w-[360px] bg-light-purple-200/20 dark:bg-dark-purple-700 rounded-md md:rounded-xl border border-white/5">
        <div
          className="flex gap-3 py-1.5 xsm:py-3.5 px-2 xsm:px-4"
          tabIndex={0}
          onClick={() => setIsShowList(!isShowList)}
        >
          <PiMagnifyingGlass className="w-5 h-5" />
          <input
            type="text"
            name="search"
            id="search"
            value={inputValue}
            placeholder="Search..."
            className="hidden sm:inline-block bg-transparent"
            onChange={handleOnChange}
            onBlur={() => {
              setIsShowList(false);
              setInputValue("");
            }}
          />
        </div>
        {isShowList && (
          <div className="w-full absolute z-50 bg-light-purple-200 dark:bg-dark-purple-900">
            <div className="sm:hidden py-1.5 px-2 border border-[#2D2D51] rounded-t-md">
              <input
                type="text"
                name="search"
                id="search"
                value={inputValue}
                placeholder="Search..."
                autoFocus
                className="bg-transparent"
                onChange={handleOnChange}
                onBlur={() => {
                  setIsShowList(false);
                  setInputValue("");
                }}
              />
            </div>
            <List
              width={""}
              height={200}
              itemCount={filteredCoinsList.length}
              itemSize={35}
              className="w-full border border-t-0 sm:border-t border-[#2D2D51] rounded-b-md sm:rounded-md"
            >
              {Row}
            </List>
          </div>
        )}
      </div>
      <NavOptionsCurrencySelect />
      <div
        className="flex items-center justify-center bg-light-purple-200/20 dark:bg-dark-purple-700 rounded-md md:rounded-xl border border-white/5"
        title="Toggle theme"
      >
        <ThemeButton />
      </div>
    </div>
  );
};

export default NavOptions;
