import InfoPopup from "./InfoPopup";
import { getNumberOfDays } from "@/utils/formatText";

const InvestmentInputRow = ({
  rowDetail,
  text,
  inputType,
  investmentCalcValues,
  setInvestmentCalcValues,
  setIsInputTypeErrors,
  isInputTypeErrors,
}: {
  rowDetail: string;
  text: string;
  inputType: string;
  investmentCalcValues: any;
  setInvestmentCalcValues: React.Dispatch<
    React.SetStateAction<InvestmentCalcValues>
  >;
  setIsInputTypeErrors: React.Dispatch<
    React.SetStateAction<InvestmentInputErrors>
  >;
  isInputTypeErrors: any;
}) => {
  let maxInput = 1;
  switch (inputType) {
    case "interval":
      if (investmentCalcValues.startDate && investmentCalcValues.endDate) {
        maxInput = getNumberOfDays(
          investmentCalcValues.startDate,
          investmentCalcValues.endDate
        );
      } else {
        maxInput = 365;
      }
      break;
    case "investment":
      maxInput = 999999;
      break;
    case "growRate":
      maxInput = 100;
      break;
    default:
      break;
  }
  return (
    <div
      className={`flex items-center justify-between p-4 border-b border-b-[#ffffff22]`}
    >
      <div className="flex items-center gap-4">
        <p>{rowDetail}</p>
        <InfoPopup text={text} />
      </div>
      <div className="relative grow flex">
        {investmentCalcValues[inputType] !== 0 &&
          (investmentCalcValues[inputType] < 1 ||
            investmentCalcValues[inputType] > maxInput) && (
            <p className="absolute right-0 -translate-y-full w-max py-1 px-2 text-[11px] text-white bg-[#848484] rounded">{`Input value must be between 1 and ${maxInput}`}</p>
          )}
        <input
          type="number"
          className="grow bg-transparent text-right text-lg font-medium"
          defaultValue={0}
          min={"1"}
          max={String(maxInput)}
          onChange={(e) => {
            setInvestmentCalcValues({
              ...investmentCalcValues,
              [inputType]: Number(e.target.value),
            });
            if (
              (Number(e.target.value) < 1 ||
                Number(e.target.value) > maxInput) &&
              !isInputTypeErrors[inputType]
            ) {
              setIsInputTypeErrors({ ...isInputTypeErrors, [inputType]: true });
            } else if (isInputTypeErrors[inputType]) {
              setIsInputTypeErrors({
                ...isInputTypeErrors,
                [inputType]: false,
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default InvestmentInputRow;
