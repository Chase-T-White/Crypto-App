import { useState } from "react";
import CoinLink from "./CoinLink";

const CoinInfoLowerSection = ({
  coinInfo,
  blockchainLinks,
}: {
  coinInfo: string;
  blockchainLinks: string[];
}) => {
  const [isShowMoreText, setIsShowMoreText] = useState(false);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-[60px]">
      <div className="max-w-[678px]">
        <h2 className="text-lg font-medium mb-6">Description</h2>
        <p className="text-sm xsm:text-base">
          {isShowMoreText ? coinInfo : coinInfo.substring(0, 500)}{" "}
          <button
            className="text-[#6060FF]"
            onClick={() => setIsShowMoreText(!isShowMoreText)}
          >
            {isShowMoreText ? "show less" : "...read more"}
          </button>
        </p>
      </div>
      <div className="grow shrink-0">
        <ul className="w-full flex flex-col gap-6">
          {blockchainLinks.map((link: string, i) => {
            if (link === "" || i > 2) {
              return;
            }

            return <CoinLink key={link} link={link} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default CoinInfoLowerSection;
