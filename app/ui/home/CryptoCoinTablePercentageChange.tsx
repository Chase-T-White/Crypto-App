import Image from "next/image";

const CryptoCoinTablePercentageChange = ({
  percentageChange,
}: {
  percentageChange: number;
}) => {
  return (
    <td
      className={`text-sm ${
        percentageChange > 0
          ? "text-birches-200 dark:text-birches-100"
          : "text-red"
      } bg-white dark:bg-dark-purple-700`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={`/images/${
            percentageChange > 0 ? "upIcon.svg" : "downIcon.svg"
          }`}
          alt="percentage change icon"
          width={8}
          height={8}
        />
        {percentageChange.toFixed(2)}%
      </div>
    </td>
  );
};

export default CryptoCoinTablePercentageChange;
