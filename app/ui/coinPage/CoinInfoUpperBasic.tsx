import React from "react";
import Image from "next/image";
import {
  TbStack2Filled,
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";
import CoinLink from "./CoinLink";
import { formatPrice, coinPageDateDisplay } from "@/utils/formatText";

const CoinInfoUpperBasic = ({
  coinImg,
  name,
  symbol,
  homeLinks,
  allTimeHigh,
  allTimeHighDate,
  allTimeLow,
  allTimeLowDate,
  currentPrice,
  priceChangePercent,
}: {
  coinImg: string;
  name: string;
  symbol: string;
  homeLinks: string[];
  allTimeHigh: number;
  allTimeHighDate: string;
  allTimeLow: number;
  allTimeLowDate: string;
  currentPrice: number;
  priceChangePercent: number;
}) => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4">
        <div className="bg-[#1E1932] rounded-xl px-[64px] py-[75px]">
          <div className="flex justify-center">
            <div className="mb-6 p-4 rounded-md bg-[#2C2C4A]">
              <Image
                src={coinImg}
                alt={`${name} logo`}
                width={32}
                height={32}
              />
            </div>
          </div>
          <div className="text-3xl">
            {name} ({symbol.toUpperCase()})
          </div>
        </div>
        <CoinLink link={homeLinks[0]} />
      </div>
      <div>
        <div className="bg-[#1E1932] rounded-xl py-10 px-14">
          <div className="mb-6">
            <div className="flex gap-4 text-5xl font-bold">
              ${formatPrice(Number(currentPrice.toFixed(2)))}{" "}
              <span
                className={`flex items-center gap-2 text-lg ${
                  priceChangePercent > 0
                    ? "text-birches-200 dark:text-birches-100"
                    : "text-red"
                }`}
              >
                <Image
                  src={`/images/${
                    priceChangePercent > 0 ? "upIcon.svg" : "downIcon.svg"
                  }`}
                  alt="percentage change icon"
                  width={9}
                  height={9}
                />
                {priceChangePercent.toFixed(2)}%
              </span>
            </div>
            {/* Add in logic after portfolio has been created */}
            {/* {inPortfolio && (
                <div>
                  Profit: <span>{portfolioProfit}</span>
                </div>
              )} */}
          </div>
          <div className="flex justify-center mb-6">
            <TbStack2Filled className="text-2xl" />
          </div>
          <div>
            <div className="flex mb-6">
              <div className="mr-4 pt-2">
                <TbTriangleFilled className="text-sm text-birches-100" />
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  All Time High:{" "}
                  <span className="text-lg font-medium pl-4">
                    ${formatPrice(Number(allTimeHigh))}
                  </span>
                </p>
                <div className="text-sm text-[#B9B9BA]">
                  <p>{coinPageDateDisplay(allTimeHighDate)}</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4 pt-2">
                <TbTriangleInvertedFilled className="text-sm text-red" />
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  All Time Low:{" "}
                  <span className="text-lg font-medium pl-4">
                    ${formatPrice(Number(allTimeLow))}
                  </span>
                </p>
                <div className="text-sm text-[#B9B9BA]">
                  <p>{coinPageDateDisplay(allTimeLowDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInfoUpperBasic;
