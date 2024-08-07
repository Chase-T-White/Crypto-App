import InfoPopup from "./InfoPopup";
import {
  setDateMinMax,
  setYesterdayDate,
  setMinEndDate,
} from "@/utils/formatText";

const InestmentCalcDateInputs = ({
  investmentCalcValues,
  setInvestmentCalcValues,
}: {
  investmentCalcValues: InvestmentCalcValues;
  setInvestmentCalcValues: React.Dispatch<
    React.SetStateAction<InvestmentCalcValues>
  >;
}) => {
  const { minDate, maxDate } = setDateMinMax();
  const yesterdayDate = setYesterdayDate();
  const minEndDate = investmentCalcValues.startDate
    ? setMinEndDate(investmentCalcValues.startDate)
    : "";

  return (
    <div className="flex justify-between mb-4 text-birches-100">
      {/* date inputs */}
      <div className="grow flex flex-col sm:flex-row gap-4">
        <div className="grow sm:max-w-max flex gap-4 p-2 bg-light-purple-100 dark:bg-dark-blue-700 rounded-lg">
          {/* start date cannot be more than 365 days on free plan or be set later than end date */}
          <input
            className="grow text-birches-200 dark:text-birches-100 bg-transparent cursor-pointer"
            type="date"
            min={minDate}
            max={yesterdayDate}
            onChange={(e) =>
              setInvestmentCalcValues({
                ...investmentCalcValues,
                startDate: e.target.value,
              })
            }
          />
          <InfoPopup text={"Start date and time of investments"} />
        </div>
        <div className="grow sm:max-w-max flex gap-4 p-2 bg-light-purple-100 dark:bg-dark-blue-700 rounded-lg">
          {/* end date cannot be in the future or set before start date */}
          <input
            className="grow text-birches-200 dark:text-birches-100 bg-transparent cursor-pointer"
            type="date"
            min={minEndDate}
            max={maxDate}
            disabled={investmentCalcValues.startDate.length !== 10}
            onChange={(e) =>
              setInvestmentCalcValues({
                ...investmentCalcValues,
                endDate: e.target.value,
              })
            }
          />
          <InfoPopup text={"End date and time of investments"} />
        </div>
      </div>
      <div className="hidden sm:block px-6 py-2 text-birches-200 dark:text-birches-100 bg-light-purple-100 dark:bg-dark-blue-700 rounded-lg">
        Q-ty
      </div>
    </div>
  );
};

export default InestmentCalcDateInputs;
