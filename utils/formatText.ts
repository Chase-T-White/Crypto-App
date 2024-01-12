export function formatLargeNumber(largeNumber: number) {
  const numberString = String(largeNumber);
  let formatedNumber;

  const shortendNumber = (sliceEnd: number) => {
    return numberString.slice(sliceEnd).split("").splice(-2, 0, ".").join("");
  };

  if (numberString.length > 9) {
    const sliceEnd = numberString.length - 7;
    const shortend = shortendNumber(sliceEnd);
    formatedNumber = shortend.concat(" ", "B");
    return formatedNumber;
  } else if (numberString.length > 6) {
    const sliceEnd = numberString.length - 4;
    const shortend = shortendNumber(sliceEnd);
    formatedNumber = shortend.concat(" ", "M");
    return formatedNumber;
  } else if (numberString.length > 3) {
    const sliceEnd = numberString.length - 1;
    const shortend = shortendNumber(sliceEnd);
    formatedNumber = shortend.concat(" ", "T");
    return formatedNumber;
  }

  return formatedNumber;
}

export function formatPrice(price: number) {
  const formatedPrice = price.toFixed(0).toLocaleString("en-US");
  return formatedPrice;
}
