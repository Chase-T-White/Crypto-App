import getSymbolFromCurrency from "currency-symbol-map";

// Portfolio Coins Storage

export function checkStorage() {
  const localStorageCoins = window.localStorage.getItem("coins");

  if (localStorageCoins === null) return;

  return JSON.parse(localStorageCoins);
}

export function updateStorage(updatedCoins: any) {
  return window.localStorage.setItem("coins", JSON.stringify(updatedCoins));
}

// Currency Storage

export function getStorageCurrency() {
  const localStorageCurrency = window.localStorage.getItem("currencyData");

  if (localStorageCurrency === null)
    return [{ currency: "USD", currencySymbol: getSymbolFromCurrency("USD") }];

  return JSON.parse(localStorageCurrency);
}

export function updateStorageCurrency(updateCurrency: string) {
  const currencySymbol = getSymbolFromCurrency(updateCurrency);

  return window.localStorage.setItem(
    "currencyData",
    JSON.stringify([{ currency: updateCurrency, currencySymbol }])
  );
}

// Theme Storage

export function getTheme() {
  const localStorageTheme = window.localStorage.getItem("theme");

  if (localStorageTheme === null) return "dark";

  return localStorageTheme;
}

export function updateTheme(updatedTheme: string | undefined) {
  if (!updatedTheme) return;
  return window.localStorage.setItem("theme", updatedTheme);
}

// Clear Storage

export function clearStorage() {
  window.localStorage.clear();
  return;
}
