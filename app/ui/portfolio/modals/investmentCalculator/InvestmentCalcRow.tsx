import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "@/lib/features/currencySlice";
import InfoPopup from "./InfoPopup";

const InvestmentCalcRow = ({
  rowDetail,
  text,
  isLast = false,
  calcType,
  investmentCalculatedValues,
}: {
  rowDetail: string;
  text: string;
  isLast?: boolean;
  calcType: string;
  investmentCalculatedValues: any;
}) => {
  const currencySymbol = useSelector(selectCurrencySymbol);
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-4 ${
        !isLast
          ? "border-b border-b-dark-purple-300 dark:border-b-white/10"
          : ""
      }`}
    >
      <div className="grow sm:grow-0 flex items-center justify-between gap-4">
        <p>{rowDetail}</p>
        <InfoPopup text={text} />
      </div>
      <div>
        <p>
          {investmentCalculatedValues[calcType] === 0
            ? `${currencySymbol}`
            : investmentCalculatedValues[calcType]}
        </p>
      </div>
    </div>
  );
};

export default InvestmentCalcRow;
