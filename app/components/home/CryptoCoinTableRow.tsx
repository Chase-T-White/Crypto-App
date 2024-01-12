"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SevenDayPriceChart from "./SevenDayPriceChart";
import CryptoCoinTablePercentageChange from "./CryptoCoinTablePercentageChange";
import { getAverageColor } from "@/utils/getAverageColor";
import { formatLargeNumber, formatPrice } from "@/utils/formatText";

const CryptoCoinTableRow = ({
  name,
  image,
  symbol,
  current_price,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  sparkline_in_7d,
  circulating_supply,
  total_supply,
  listNumber,
}: Coins) => {
  const [logoColor, setLogoColor] = useState(null);

  useEffect(() => {
    const fetchLogoColor = async () => {
      try {
        const data = await getAverageColor(image);
        setLogoColor(data.hex);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchLogoColor();
  }, [image]);

  if (logoColor === null) {
    return;
  }

  return (
    <tr className="px-5 py-[22.5px] rounded-xl">
      <td className="ps-5 font-medium text-darkTheme-white-200 bg-dark-purple-700 rounded-l-xl">
        {listNumber}
      </td>
      <td className="bg-dark-purple-700">
        <div className="flex items-center gap-4 font-medium">
          <Image src={image} alt="Crypto logo" width={32} height={32} />
          {name} ({symbol})
        </div>
      </td>
      <td className="font-medium bg-dark-purple-700">
        ${formatPrice(current_price)}
      </td>
      <CryptoCoinTablePercentageChange
        percentageChange={price_change_percentage_1h_in_currency}
      />
      <CryptoCoinTablePercentageChange
        percentageChange={price_change_percentage_24h_in_currency}
      />
      <CryptoCoinTablePercentageChange
        percentageChange={price_change_percentage_7d_in_currency}
      />
      <td className="bg-dark-purple-700">
        <div className="flex justify-between">
          <div className="flex items-center gap-1 text-xsm text-gradient-bright-lightgreen">
            <span className="inline-block w-[6px] h-[6px] bg-gradient-bright-lightgreen rounded"></span>
            $3.75B
          </div>
          <div className="flex items-center gap-1 text-xsm">
            <span className="inline-block w-[6px] h-[6px] bg-gradient-sky-blue rounded"></span>
            $8.24B
          </div>
        </div>
        <div>chart</div>
      </td>
      <td className="bg-dark-purple-700">
        <div className="flex justify-between">
          <div className="flex items-center gap-1 text-xsm text-gradient-bright-lightgreen">
            <span className="inline-block w-[6px] h-[6px] bg-gradient-bright-lightgreen rounded"></span>
            {formatLargeNumber(circulating_supply)}
          </div>
          <div className="flex items-center gap-1 text-xsm">
            <span className="inline-block w-[6px] h-[6px] bg-gradient-sky-blue rounded"></span>
            {formatLargeNumber(total_supply)}
          </div>
        </div>
        <div>chart</div>
      </td>
      <td className="max-w-[120px] pe-5 bg-dark-purple-700 rounded-r-xl">
        <SevenDayPriceChart
          prices={sparkline_in_7d.price}
          logoColor={logoColor}
        />
      </td>
    </tr>
  );
};

export default CryptoCoinTableRow;
