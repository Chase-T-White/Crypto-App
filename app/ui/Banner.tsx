"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { GiTwoCoins } from "react-icons/gi";
import { RiExchangeFundsLine } from "react-icons/ri";
import { GoTriangleUp } from "react-icons/go";
import { BannerSkeleton } from "./skeletons";
import {
  selectCurrency,
  selectCurrencySymbol,
} from "@/lib/features/currencySlice";
import { formatLargeNumber } from "@/utils/formatText";

const Banner = () => {
  const [bannerDataStatus, setBannerDataStatus] = useState("idle");
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const currency = useSelector(selectCurrency);
  const currencySymbol = useSelector(selectCurrencySymbol);
  const { showBoundary } = useErrorBoundary();

  const fetchBannerData = async () => {
    setBannerDataStatus("loading");

    try {
      const response = await axios(`https://api.coingecko.com/api/v3/global`);

      setBannerData(response.data.data);
      setBannerDataStatus("success");
    } catch (error) {
      setBannerDataStatus("error");
      showBoundary(error);
    }
  };

  useEffect(() => {
    if (bannerData === null) {
      fetchBannerData();
    }
  });

  return (
    <div className="relative flex items-center justify-center py-5 text-xsm font-medium text-light-text-200 bg-dark-purple-600 dark:bg-dark-purple-800 border-b border-white/[0.1]">
      {bannerDataStatus === "idle" || bannerDataStatus === "loading" ? (
        <BannerSkeleton />
      ) : (
        <div className="flex gap-4 sm: sm:gap-8">
          <div className="hidden sm:flex items-center">
            <GiTwoCoins className="mr-[5px]" />
            <p className="mr-2">Coins</p>
            <p>{bannerData?.active_cryptocurrencies?.toLocaleString()}</p>
          </div>
          <div className="hidden sm:flex items-center">
            <RiExchangeFundsLine className="mr-[5px]" />
            <p className="mr-2">Exchange</p>
            <p>{bannerData?.markets?.toLocaleString()}</p>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <GoTriangleUp className="text-birches-100 mr-1" />
            {formatLargeNumber(
              bannerData?.total_market_cap[currency.toLowerCase()]
            )}
          </div>
          <div className="flex items-center gap-[5px]">
            {currencySymbol}
            {formatLargeNumber(
              bannerData?.total_volume[currency.toLowerCase()]
            )}
            <div
              style={{ backgroundColor: `#ffffff88` }}
              className="w-[30px] sm:w-[50px] h-[6px] relative rounded overflow-hidden"
            >
              {bannerData?.total_volume && bannerData?.total_market_cap && (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    left: `${
                      (bannerData?.total_volume[currency.toLowerCase()] /
                        bannerData?.total_market_cap[currency.toLowerCase()]) *
                        100 -
                      100
                    }%`,
                  }}
                  className={`w-full h-full absolute top-0 rounded`}
                ></div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[5px]">
            <div>
              <Image
                src={"/images/Bitcoin.svg"}
                alt="Bitcoin logo"
                width={16}
                height={16}
              />
            </div>
            <p>{bannerData?.market_cap_percentage.btc?.toFixed(0)}%</p>
            <div
              style={{ backgroundColor: `#ffffff88` }}
              className="w-[30px] sm:w-[50px] h-[6px] relative rounded overflow-hidden"
            >
              {bannerData?.market_cap_percentage.btc && (
                <div
                  style={{
                    backgroundColor: "#F7931A",
                    left: `${bannerData?.market_cap_percentage.btc - 100}%`,
                  }}
                  className={`w-full h-full absolute top-0 rounded`}
                ></div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[5px]">
            <div>
              <Image
                src={"/images/Ethereum.svg"}
                alt="Bitcoin logo"
                width={16}
                height={16}
              />
            </div>
            <p>{bannerData?.market_cap_percentage.eth?.toFixed(0)}%</p>
            {/* bar eth percentage out of 100 */}
            <div
              style={{ backgroundColor: `#ffffff88` }}
              className="w-[30px] sm:w-[50px] h-[6px] relative rounded overflow-hidden"
            >
              {bannerData?.market_cap_percentage.btc && (
                <div
                  style={{
                    backgroundColor: "#849DFF",
                    left: `${bannerData?.market_cap_percentage.eth - 100}%`,
                  }}
                  className={`w-full h-full absolute top-0 rounded`}
                ></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
