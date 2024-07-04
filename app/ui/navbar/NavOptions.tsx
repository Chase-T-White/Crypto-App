"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ThemeButton } from "./buttons";
import { fetchCoinsList } from "@/lib/features/coins/coinsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

const NavOptions = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCoinsList());
  });

  return (
    <div className="flex gap-4">
      <div className="flex gap-3 py-3.5 px-4 bg-lightTheme-bg-purple-200 dark:bg-dark-purple-700 rounded-md border border-[#ffffff0d]">
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
          placeholder="Search..."
          className="bg-transparent"
        />
      </div>
      <div className="flex gap-3 py-3.5 px-4 bg-lightTheme-bg-purple-200 dark:bg-dark-purple-700 rounded-md border border-[#ffffff0d]">
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
        className="flex items-center justify-center p-3.5 bg-lightTheme-bg-purple-200 dark:bg-dark-purple-700 rounded-md border border-[#ffffff0d]"
        title="Toggle theme"
      >
        <ThemeButton />
      </div>
    </div>
  );
};

export default NavOptions;
