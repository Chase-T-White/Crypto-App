import React from "react";
import { BsQuestionCircle } from "react-icons/bs";

const InvestmentInputRow = ({
  rowDetail,
  isLast = false,
}: {
  rowDetail: string;
  isLast?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 ${
        !isLast ? "border-b border-b-[#ffffff22]" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <p>{rowDetail}</p>
        <button>
          <BsQuestionCircle />
        </button>
      </div>
      <input type="number" className="grow bg-transparent text-right" />
    </div>
  );
};

export default InvestmentInputRow;
