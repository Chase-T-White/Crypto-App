"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SevenDayPriceChart from "./SevenDayPriceChart";
import { getAverageColor } from "@/utils/getAverageColor";

const CryptoCoinTableRow = ({
  name,
  image,
  symbol,
  current_price,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  sparkline_in_7d,
}) => {
  const [logoColor, setLogoColor] = useState(null);

  useEffect(() => {
    const fetchLogoColor = async () => {
      try {
        const data = await getAverageColor(image);
        console.log(data);
        setLogoColor(data.hex);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchLogoColor();
  }, [image]);

  console.log(logoColor);

  if (logoColor === null) {
    return;
  }

  return (
    <tr className="px-5 py-[22.5px] rounded-xl">
      <td className="ps-5 font-medium text-darkTheme-white-200 bg-dark-purple-700 rounded-l-xl">
        1
      </td>
      <td className="bg-dark-purple-700">
        <div className="flex items-center gap-4 font-medium">
          <Image src={image} alt="Crypto logo" width={32} height={32} />
          {name} ({symbol})
        </div>
      </td>
      <td className="font-medium bg-dark-purple-700">${current_price}</td>
      <td className="text-sm text-birches bg-dark-purple-700">
        {price_change_percentage_1h_in_currency.toFixed(2)}%
      </td>
      <td className="text-sm text-birches bg-dark-purple-700">
        {price_change_percentage_24h_in_currency.toFixed(2)}%
      </td>
      <td className="text-sm text-birches bg-dark-purple-700">
        {price_change_percentage_7d_in_currency.toFixed(2)}%
      </td>
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
            $3.75B
          </div>
          <div className="flex items-center gap-1 text-xsm">
            <span className="inline-block w-[6px] h-[6px] bg-gradient-sky-blue rounded"></span>
            $8.24B
          </div>
        </div>
        <div>chart</div>
      </td>
      <td className="pe-5 bg-dark-purple-700 rounded-r-xl">
        <SevenDayPriceChart
          prices={sparkline_in_7d.price}
          logoColor={logoColor}
        />
      </td>
    </tr>
  );
};

export default CryptoCoinTableRow;
