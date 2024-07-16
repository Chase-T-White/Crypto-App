export function investmentInvervalCoinPrices(
  pricesArray: number[],
  startDate: string,
  endDate: string,
  interval: number
) {
  // get the number of days between startDate and endDate then slice priceArray to fit that time period
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const timeDifference = endTime - startTime;
  const daysBetween = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

  const timeSlicedPriceArr = pricesArray.slice(0, daysBetween);

  // filter timeSlicedPriceArr to only include days that land on the investment interval
  const intervalCoins = timeSlicedPriceArr.filter(
    (_: number, i: number) => i % interval === 0
  );

  return intervalCoins;
}

export function amountInvested(
  typeCostAveraging: string,
  investment: number,
  growRate: number,
  intervalCoins: number[]
) {
  let totalInvested = investment;
  let growthArr = [investment] as number[];
  let actualGrowthArr = [investment] as number[];

  if (typeCostAveraging === "value" && investment) {
    for (let i = 1; i < intervalCoins.length; i++) {
      const plannedNewValue = growthArr[i - 1] * (growRate / 100 + 1);
      const actualRate = intervalCoins[i] / intervalCoins[i - 1];
      const newValue = growthArr[i - 1] * actualRate;
      totalInvested += plannedNewValue - newValue;
      growthArr.push(plannedNewValue);
      actualGrowthArr.push(newValue);
    }
  } else {
    for (let i = 1; i < intervalCoins?.length; i++) {
      const actualGrow = intervalCoins[i] / intervalCoins[i - 1];
      const newValue = growthArr[i - 1] * actualGrow + growRate;
      totalInvested += growRate;
      growthArr.push(newValue);
    }
  }

  return {
    totalInvested: Math.floor(totalInvested),
    coinValue: Math.floor(growthArr.slice(-1)[0]),
  };
}
