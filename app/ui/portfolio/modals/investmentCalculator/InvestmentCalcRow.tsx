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
  return (
    <div
      className={`flex items-center justify-between p-4 ${
        !isLast ? "border-b border-b-[#ffffff22]" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <p>{rowDetail}</p>
        <InfoPopup text={text} />
      </div>
      <div>
        <p>
          {investmentCalculatedValues[calcType] === 0
            ? "$"
            : investmentCalculatedValues[calcType]}
        </p>
      </div>
    </div>
  );
};

export default InvestmentCalcRow;
