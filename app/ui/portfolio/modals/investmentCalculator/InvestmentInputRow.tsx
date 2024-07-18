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

  const handleOnChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInvestmentCalcValues({
      ...investmentCalcValues,
      [inputType]: Number(target.value),
    });
    if (
      (Number(target.value) < 1 || Number(target.value) > maxInput) &&
      !isInputTypeErrors[inputType]
    ) {
      setIsInputTypeErrors({ ...isInputTypeErrors, [inputType]: true });
    } else if (isInputTypeErrors[inputType]) {
      setIsInputTypeErrors({
        ...isInputTypeErrors,
        [inputType]: false,
      });
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-4 border-b border-b-dark-purple-300 dark:border-b-white/10`}
    >
      <div className="grow sm:grow-0 flex items-center justify-between gap-4">
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
          className="grow bg-transparent text-left sm:text-right text-lg font-medium"
          defaultValue={0}
          min={1}
          max={maxInput}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default InvestmentInputRow;
