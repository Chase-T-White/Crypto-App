import React from "react";
import { FiPlus } from "react-icons/fi";

const CoinExtendedDetail = ({
  text,
  detail,
}: {
  text: string;
  detail: number;
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <span className="inline-block mr-3 flex items-center justify-center w-6 aspect-square rounded-full bg-[#6161D680]">
          <FiPlus />
        </span>{" "}
        {text}
      </div>
      <div className="text-lg font-medium">{detail.toLocaleString()}</div>
    </div>
  );
};

export default CoinExtendedDetail;
