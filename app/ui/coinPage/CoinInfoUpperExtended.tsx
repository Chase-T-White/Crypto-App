import CoinExtendedDetail from "./CoinExtendedDetail";

const CoinInfoUpperExtended = ({
  marketCap,
  dilutedValuation,
  total_supply,
  circulating_supply,
  totalVolume,
}: {
  marketCap: number;
  dilutedValuation: number;
  total_supply: number;
  circulating_supply: number;
  totalVolume: number;
}) => {
  const percentagePoint = Math.ceil((totalVolume / marketCap) * 100);
  const color = "#D4770C";

  return (
    <div className="grow max-w-[692px] xl:max-w-[545px] bg-white dark:bg-dark-purple-800 rounded-xl py-10 px-7 xl:px-14">
      <div className="flex flex-col gap-4 mb-8">
        <CoinExtendedDetail text={"Market Cap"} detail={marketCap} />
        <CoinExtendedDetail
          text={"Fully Diluted Valuation"}
          detail={dilutedValuation}
        />
        <CoinExtendedDetail
          text={"Volume/Market"}
          detail={Number((Number(totalVolume) / Number(marketCap)).toFixed(5))}
        />
        <CoinExtendedDetail text={"Total Volume"} detail={totalVolume} />
        <CoinExtendedDetail
          text={"Circulating Supply"}
          detail={circulating_supply}
        />
        <CoinExtendedDetail text={"Max Supply"} detail={total_supply} />
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <div className="flex justify-between">
          <div
            style={{ color: `${color}` }}
            className="flex items-center gap-1 text-xsm"
          >
            <span
              style={{ backgroundColor: color }}
              className="inline-block w-[6px] h-[6px] rounded"
            ></span>
            {percentagePoint}%
          </div>
          <div
            style={{ color: `${color}66` }}
            className="flex items-center gap-1 text-xsm"
          >
            <span
              style={{ backgroundColor: `${color}66` }}
              className="inline-block w-[6px] h-[6px] bg-gradient-sky-blue rounded"
            ></span>
            {100 - percentagePoint}%
          </div>
        </div>
        <div
          style={{ backgroundColor: `${color}66` }}
          className="h-[6px] relative rounded overflow-hidden"
        >
          {totalVolume && marketCap && (
            <div
              style={{
                backgroundColor: color,
                left: `${percentagePoint - 100}%`,
              }}
              className={`w-full h-full absolute top-0 rounded`}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinInfoUpperExtended;
