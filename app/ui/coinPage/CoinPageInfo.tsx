import React from "react";
import Image from "next/image";
import { RiLinksFill } from "react-icons/ri";
import { LuCopy } from "react-icons/lu";
import { TbStack2Filled } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";

const CoinPageInfo = ({ coin }: { coin: any }) => {
  const {
    image: { large: coinImg },
    name,
    symbol,
    links: { homepage: homeLinks },
    links: { blockchain_site: blockchainLinks },
    description: { en: coinInfo },
    market_data: {
      current_price: { usd: currentPrice },
    },
    market_data: { price_change_percentage_24h: priceChangePercent },
    market_data: {
      ath: { usd: allTimeHigh },
    },
    market_data: {
      ath_date: { usd: allTimeHighDate },
    },
    market_data: {
      atl: { usd: allTimeLow },
    },
    market_data: {
      atl_date: { usd: allTimeLowDate },
    },
    market_data: {
      market_cap: { usd: marketCap },
    },
    market_data: {
      fully_diluted_valuation: { usd: dilutedValuation },
    },
    market_data: { total_supply },
    market_data: { circulating_supply },
    market_data: {
      total_volume: { usd: totalVolume },
    },
  } = coin;

  return (
    <div className="flex gap-8">
      <div>
        <div>
          <div className="flex flex-col gap-4 bg-[#1E1932] rounded-xl px-[64px] py-[75px]">
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
          <div className="flex items-center justify-center gap-4">
            <RiLinksFill className="inline-block" />
            {homeLinks[0]}
            <LuCopy className="inline-block" />
          </div>
        </div>
        <div className="bg-[#1E1932] rounded-xl py-10 px-14">
          <div>
            <div>
              ${currentPrice} <span>{priceChangePercent}</span>
            </div>
            {/* {inPortfolio && (
              <div>
                Profit: <span>{portfolioProfit}</span>
              </div>
            )} */}
          </div>
          <div className="flex justify-center">
            <TbStack2Filled />
          </div>
          <div>
            <div className="flex">
              <div>all time high up arrow</div>
              <div>
                <p>
                  All Time High: <span>${allTimeHigh}</span>
                </p>
                <p>{allTimeHighDate}</p>
              </div>
            </div>
            <div className="flex">
              <div>all time low down arrow</div>
              <div>
                <p>
                  All Time Low: <span>${allTimeLow}</span>
                </p>
                <p>{allTimeLowDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="flex justify-between">
            <div>
              <FiPlus className="inline-block" /> Market Cap
            </div>
            <div>{marketCap}</div>
          </div>
          <div className="flex justify-between">
            <div>
              <FiPlus className="inline-block" /> Fully Diluted Valuation
            </div>
            <div>{dilutedValuation}</div>
          </div>
          <div className="flex justify-between">
            <div>
              <FiPlus className="inline-block" /> Volume/Market
            </div>
            <div>{Number(totalVolume) / Number(marketCap)}</div>
          </div>
          <div className="flex justify-between">
            <div>
              <FiPlus className="inline-block" /> Total Volume
            </div>
            <div>{totalVolume}</div>
          </div>
          <div className="flex justify-between">
            <div>
              <FiPlus className="inline-block" /> Circulating Supply
            </div>
            <div>{circulating_supply}</div>
          </div>
          <div className="flex justify-between">
            <div>
              <FiPlus className="inline-block" /> Max Supply
            </div>
            <div>{total_supply}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPageInfo;
