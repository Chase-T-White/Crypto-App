import React from "react";
import Image from "next/image";

const CoinCardLeft = ({
  current_price,
  price_change_percentage_24h,
  market_cap,
  total_volume,
  circulating_supply,
  max_supply,
}: {
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number;
}) => {
  const volumeOverMarketCap = Math.round((total_volume / market_cap) * 100);
  const circulatingSupplyPercentage = Number(
    ((circulating_supply / max_supply) * 100).toFixed(2)
  );

  return (
    <div className="grow py-6 px-4">
      <div className="w-full grid grid-cols-2 auto-rows-auto gap-5">
        <div className="px-2.5  py-3 border border-[#2D2D51] rounded-lg">
          <p className="font-medium text-lg">
            ${current_price.toLocaleString()}
          </p>
          <p>Current Price</p>
        </div>
        <div className="px-2.5 py-3 border border-[#2D2D51] rounded-lg">
          <div
            className={`flex items-center gap-2 ${
              price_change_percentage_24h > 0
                ? "text-birches-200 dark:text-birches-100"
                : "text-red"
            }`}
          >
            <div>
              <Image
                src={`/images/${
                  price_change_percentage_24h > 0
                    ? "upIcon.svg"
                    : "downIcon.svg"
                }`}
                alt="percentage change icon"
                width={10}
                height={10}
              />
            </div>
            <p className="font-medium text-lg">
              {price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
          <p>24h%</p>
        </div>
        <div className="px-2.5  py-3 border border-[#2D2D51] rounded-lg">
          <div className="flex items-center gap-5">
            <p className="font-medium text-lg text-birches-200 dark:text-birches-100">
              {volumeOverMarketCap > 0 &&
              String(volumeOverMarketCap) !== "Infinity"
                ? volumeOverMarketCap
                : 0}
              %
            </p>
            <div
              style={{ backgroundColor: "#01F1E388" }}
              className="grow h-[6px] relative rounded overflow-hidden"
            >
              {total_volume && market_cap && (
                <div
                  style={{
                    backgroundColor: "#01F1E3",
                    left: `${volumeOverMarketCap - 100}%`,
                  }}
                  className={`w-full h-full absolute top-0 rounded`}
                ></div>
              )}
            </div>
          </div>
          <p>Volume vs Market Cap</p>
        </div>
        <div className="px-2.5  py-3 border border-[#2D2D51] rounded-lg">
          <div
            className={`flex items-center gap-2 text-birches-200 dark:text-birches-100`}
          >
            <div>
              <Image
                src={`/images/upIcon.svg`}
                alt="percentage change icon"
                width={10}
                height={10}
              />
            </div>
            <p className="font-medium text-lg">
              {circulatingSupplyPercentage > 0 &&
              String(circulatingSupplyPercentage) !== "Infinity"
                ? circulatingSupplyPercentage
                : 0}
              %
            </p>
          </div>
          <p>Circ Supply vs Max Supply</p>
        </div>
      </div>
    </div>
  );
};

export default CoinCardLeft;
