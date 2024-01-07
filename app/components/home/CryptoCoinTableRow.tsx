import React from "react";
import Image from "next/image";

const CryptoCoinTableRow = () => {
  return (
    <tr className="px-5 py-[22.5px] rounded-xl">
      <td className="ps-5 font-medium text-darkTheme-white-200 bg-dark-purple-700 rounded-l-xl">
        1
      </td>
      <td className="bg-dark-purple-700">
        <div className="flex items-center gap-4 font-medium">
          <Image
            src="/images/Bitcoin.svg"
            alt="Crypto logo"
            width={32}
            height={32}
          />
          Bitcoin (BTC)
        </div>
      </td>
      <td className="font-medium bg-dark-purple-700">$29,850</td>
      <td className="text-sm text-birches bg-dark-purple-700">^ 2.35%</td>
      <td className="text-sm text-birches bg-dark-purple-700">^ 11.04%</td>
      <td className="text-sm text-birches bg-dark-purple-700">^ 8.41%</td>
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
      <td className="pe-5 bg-dark-purple-700 rounded-r-xl">7 day chart</td>
    </tr>
  );
};

export default CryptoCoinTableRow;
