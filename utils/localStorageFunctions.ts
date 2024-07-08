// Portfolio Coins Storage

export function checkStorage() {
  const localStorageCoins = window.localStorage.getItem("coins");

  if (localStorageCoins === null) return;

  let storedCoinsArray = [];

  storedCoinsArray.push(...JSON.parse(localStorageCoins));

  return storedCoinsArray;
}

export function updateStorage(updatedCoins: any) {
  return window.localStorage.setItem("coins", JSON.stringify(updatedCoins));
}

// Currency Storage

export function getStorageCurrency() {
  const localStorageCurrency = window.localStorage.getItem("currency");

  if (localStorageCurrency === null) return "usd";

  return JSON.parse(localStorageCurrency);
}

export function updateStorageCurrency(updateCurrency: string) {
  return window.localStorage.setItem(
    "currency",
    JSON.stringify(updateCurrency)
  );
}

// Theme Storage

export function getTheme() {
  const localStorageTheme = window.localStorage.getItem("theme");

  if (localStorageTheme === null) return "dark";

  return JSON.parse(localStorageTheme);
}

export function updateTheme(updatedTheme: string) {
  return window.localStorage.setItem("theme", JSON.stringify(updatedTheme));
}

// Clear Storage

export function clearStorage() {
  window.localStorage.clear();
  return;
}
