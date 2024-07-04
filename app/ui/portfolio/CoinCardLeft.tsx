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
  // const diffCurculatingSupply = Number(
  //   (
  //     circulating_supply_at_purchase /
  //     max_supply /
  //     (circulating_supply / max_supply)
  //   ).toFixed(2)
  // );

  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <div className="basis-1/2">
          <p>${current_price}</p>
          <p>Current Price</p>
        </div>
        <div className="basis-1/2">
          <div
            className={`${
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
                width={8}
                height={8}
              />
            </div>
            <p>{price_change_percentage_24h.toFixed(2)}%</p>
          </div>
          <p>24h%</p>
        </div>
        <div className="basis-1/2">
          <div>
            <p>{volumeOverMarketCap}%</p>
            <div
              style={{ backgroundColor: "#01F1E388" }}
              className="h-[6px] relative rounded overflow-hidden"
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
        <div className="basis-1/2">
          <div
            className={`${
              1 > 0 ? "text-birches-200 dark:text-birches-100" : "text-red"
            }`}
          >
            <div>
              <Image
                src={`/images/${1 > 0 ? "upIcon.svg" : "downIcon.svg"}`}
                alt="percentage change icon"
                width={8}
                height={8}
              />
            </div>
            <p>{55}%</p>
          </div>
          <p>Circ Supply vs Max Supply</p>
        </div>
      </div>
    </div>
  );
};

export default CoinCardLeft;
