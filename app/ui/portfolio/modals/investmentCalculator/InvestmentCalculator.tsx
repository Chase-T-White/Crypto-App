import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InvestmentCalcCoinSelect from "./InvestmentCalcCoinSelect";
import InvestmentCalcSelect from "./InvestmentCalcSelect";
import InvestmentCalcDateInputs from "./InestmentCalcDateInputs";
import InvestmentInputRow from "./InvestmentInputRow";
import InvestmentCalcRow from "./InvestmentCalcRow";
import { getInvestmentDataDays } from "@/utils/formatText";
import {
  investmentInvervalCoinPrices,
  amountInvested,
} from "@/utils/investmentFunctions";
import { selectCoinsList } from "@/lib/features/coins/coinsSlice";
import {
  selectCurrency,
  selectCurrencySymbol,
} from "@/lib/features/currencySlice";

const InvestmentCalculator = ({
  setIsShowInvestmentCalculator,
}: {
  setIsShowInvestmentCalculator: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [isShowCoinList, setIsShowCoinList] = useState(false);
  const [typeCostAveraging, setTypeCostAveraging] = useState("value");
  const [investmentCalcValues, setInvestmentCalcValues] = useState({
    startDate: "",
    endDate: "",
    interval: 0,
    investment: 0,
    growRate: 0,
  });
  const [isInputTypeErrors, setIsInputTypeErrors] = useState({
    interval: false,
    investment: false,
    growRate: false,
  });
  const [investmentCalculatedValues, setInvestmentCalculatedValues] = useState({
    totalInvested: 0,
    coinValue: 0,
  });
  const coinsList = useSelector(selectCoinsList);
  const currency = useSelector(selectCurrency);
  const currencySymbol = useSelector(selectCurrencySymbol);

  const calculateInvestments = async () => {
    const days = getInvestmentDataDays(investmentCalcValues.startDate);
    try {
      const response = await axios(
        `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
      );

      const data = response?.data;
      const pricesArray = data.prices.map(
        (priceData: number[]) => priceData[1]
      );

      if (pricesArray.length > 0) {
        const intervalCoins = investmentInvervalCoinPrices(
          pricesArray,
          investmentCalcValues.startDate,
          investmentCalcValues.endDate,
          investmentCalcValues.interval
        );
        const { totalInvested, coinValue } = amountInvested(
          typeCostAveraging,
          investmentCalcValues.investment,
          investmentCalcValues.growRate,
          intervalCoins
        );
        setInvestmentCalculatedValues({ totalInvested, coinValue });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="max-w-[890px] w-full absolute top-[56%] sm:top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 px-2 py-3 sm:px-8 sm:py-8 bg-white dark:bg-dark-purple-900 border border-[#2D2D51] rounded-lg">
      <header className="flex items-center justify-between mb-8 font-medium text-2xl">
        Investment Calculator
        <IoMdCloseCircleOutline
          className="cursor-pointer"
          onClick={() => setIsShowInvestmentCalculator(false)}
        />
      </header>
      <div>
        <InvestmentCalcCoinSelect
          {...{
            coinsList,
            setSelectedCoin,
            setIsShowCoinList,
            selectedCoin,
            isShowCoinList,
          }}
        />
        <div>
          <InvestmentCalcSelect
            {...{ typeCostAveraging, setTypeCostAveraging }}
          />
          <InvestmentCalcDateInputs
            {...{ investmentCalcValues, setInvestmentCalcValues }}
          />
          <div className="mb-8 px-3 sm:px-8 py-4 bg-light-purple-100 dark:bg-dark-purple-800 rounded-xl">
            {/* input field body */}
            <InvestmentInputRow
              rowDetail={"Contribution interval, days"}
              text={"The number of days between each investment"}
              inputType={"interval"}
              investmentCalcValues={investmentCalcValues}
              setInvestmentCalcValues={setInvestmentCalcValues}
              setIsInputTypeErrors={setIsInputTypeErrors}
              isInputTypeErrors={isInputTypeErrors}
            />
            <InvestmentInputRow
              rowDetail={`Initial investment, ${currencySymbol}`}
              text={
                "The amount of money you invest at the beginning of the period"
              }
              inputType={"investment"}
              investmentCalcValues={investmentCalcValues}
              setInvestmentCalcValues={setInvestmentCalcValues}
              setIsInputTypeErrors={setIsInputTypeErrors}
              isInputTypeErrors={isInputTypeErrors}
            />
            {typeCostAveraging === "value" ? (
              <InvestmentInputRow
                rowDetail={"Grow rate per interval, %"}
                text={
                  "The rate at which your investment grows, during one interval. If market growth more than this rate, you will add less money to your investment"
                }
                inputType={"growRate"}
                investmentCalcValues={investmentCalcValues}
                setInvestmentCalcValues={setInvestmentCalcValues}
                setIsInputTypeErrors={setIsInputTypeErrors}
                isInputTypeErrors={isInputTypeErrors}
              />
            ) : (
              <InvestmentInputRow
                rowDetail={`Funds added per interval, ${currencySymbol}`}
                text={
                  "The rate at which your investment grows, during one interval. If market growth more than this rate, you will add less money to your investment"
                }
                inputType={"growRate"}
                investmentCalcValues={investmentCalcValues}
                setInvestmentCalcValues={setInvestmentCalcValues}
                setIsInputTypeErrors={setIsInputTypeErrors}
                isInputTypeErrors={isInputTypeErrors}
              />
            )}
            <InvestmentCalcRow
              rowDetail={`Total amount spent on investments, ${currencySymbol}`}
              text={
                "The total amount of money you've spent on investments. Negative value means that you returned your investment completely, and have received returns above it"
              }
              calcType={"totalInvested"}
              investmentCalculatedValues={investmentCalculatedValues}
            />
            <InvestmentCalcRow
              rowDetail={`Coins value, ${currencySymbol}`}
              isLast={true}
              text={
                "The value of all your coins at the end of the investments period"
              }
              calcType={"coinValue"}
              investmentCalculatedValues={investmentCalculatedValues}
            />
          </div>
        </div>
        <div className="w-full mb-8 text-center active-button rounded-lg">
          <button
            className="w-full p-3"
            disabled={
              !selectedCoin ||
              !investmentCalcValues.startDate ||
              !investmentCalcValues.endDate ||
              !investmentCalcValues.interval ||
              !investmentCalcValues.investment ||
              !investmentCalcValues.growRate ||
              isInputTypeErrors.interval ||
              isInputTypeErrors.investment ||
              isInputTypeErrors.growRate
            }
            onClick={calculateInvestments}
          >
            Calculate ({typeCostAveraging === "value" ? "VCA" : "DCA"})
          </button>
        </div>
      </div>
      <footer className="text-sm sm:text-base">
        {typeCostAveraging === "value"
          ? "Value-cost averaging (VCA) -- is an investment strategy focuses on the value of the investment rather than the number of coins purchased. In VCA, investors aim to invest a consistent amount of money at regular intervals, but instead of buying a fixed quantity of assets each time."
          : "Dollar-cost averaging (DCA) -- is to reduce the impact of market volatility on the average cost of acquiring the investment. By consistently investing over time, investors may be able to lower their average cost per coin and potentially benefit from long-term market appreciation."}
      </footer>
    </article>
  );
};

export default InvestmentCalculator;
