const InvestmentCalcSelect = ({
  typeCostAveraging,
  setTypeCostAveraging,
}: {
  typeCostAveraging: string;
  setTypeCostAveraging: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-1 sm:gap-4 mb-4 text-sm sm:text-base">
      <button
        className={`grow py-3 ${
          typeCostAveraging === "value"
            ? "active-button"
            : "bg-light-purple-400 dark:bg-dark-purple-500"
        } rounded-lg`}
        onClick={() => setTypeCostAveraging("value")}
        disabled={typeCostAveraging === "value"}
      >
        Value Cost Averaging
      </button>
      <button
        className={`grow py-3 ${
          typeCostAveraging === "dollar"
            ? "active-button"
            : "bg-light-purple-400 dark:bg-dark-purple-500"
        } rounded-lg`}
        onClick={() => setTypeCostAveraging("dollar")}
        disabled={typeCostAveraging === "dollar"}
      >
        Dollar Cost Averaging
      </button>
    </div>
  );
};

export default InvestmentCalcSelect;
