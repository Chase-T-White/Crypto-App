export function formatLargeNumber(largeNumber: number) {
  const numberString = String(largeNumber.toFixed(0));
  let formatedNumber;

  const shortendNumber = (sliceEnd: number) => {
    const stringArray = numberString.slice(0, sliceEnd).split("");
    stringArray.splice(-2, 0, ".");
    const arrayToString = stringArray.join("");
    return arrayToString;
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
  const formatedPrice = price.toLocaleString("en-US");
  return formatedPrice;
}

export function capitalizeFirstLetter(word: string) {
  const capitalizedWord = word[0].toUpperCase() + word.slice(1);
  return capitalizedWord;
}

export function currentDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let formatMonth = months[month];

  let dateString = `${formatMonth} ${day}, ${year}`;

  return dateString;
}

export function coinPageDateDisplay(date: string) {
  const dateObject = new Date(date);

  const dateArr = dateObject.toString().split(" ");

  const dateDisplay = `${dateArr[0]}, ${dateArr[2]} ${dateArr[1]} ${dateArr[3]} ${dateArr[4]} GMT`;

  return dateDisplay;
}

export function setDateMinMax() {
  const todaysDate = new Date();

  // mm-dd-yyyy
  const dateArr = todaysDate.toLocaleDateString().split("/");
  const maxDate = `${dateArr[2]}-${
    dateArr[0].length === 1 ? `0${dateArr[0]}` : dateArr[0]
  }-${dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1]}`;
  const minDate = `${Number(dateArr[2]) - 1}-${
    dateArr[0].length === 1 ? `0${dateArr[0]}` : dateArr[0]
  }-${dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1]}`;

  return { minDate, maxDate };
}
