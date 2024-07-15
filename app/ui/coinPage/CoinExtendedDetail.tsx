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
      <div className="flex items-center text-sm xsm:text-base">
        <span className="shrink-0 inline-block mr-3 flex items-center justify-center w-4 sm:w-6 aspect-square rounded-full bg-light-purple-300/50 dark:bg-dark-blue-400/50">
          <FiPlus />
        </span>{" "}
        {text}
      </div>
      <div className="text-sm xsm:text-base xsm:text-lg lg:text-base xl:text-lg font-medium">
        {detail.toLocaleString()}
      </div>
    </div>
  );
};

export default CoinExtendedDetail;
