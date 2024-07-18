// Portfolio Coins Storage

export function checkStorage() {
  if (typeof window !== undefined) {
    const coins = window.localStorage.getItem("coins");
    return coins !== null ? JSON.parse(coins) : "";
  } else {
    return "";
  }
}

export function updateStorage(updatedCoins: any) {
  return window.localStorage.setItem("coins", JSON.stringify(updatedCoins));
}

// Currency Storage

export function getStorageCurrency() {
  if (typeof window !== undefined) {
    const currency = window.localStorage.getItem("currencyData");
    return currency !== null ? currency : "USD";
  } else {
    return "USD";
  }
}

export function updateStorageCurrency(updateCurrency: string) {
  return window.localStorage.setItem("currencyData", updateCurrency);
}

// Theme Storage

export function getTheme() {
  if (typeof window !== undefined) {
    const theme = window.localStorage.getItem("theme");
    return theme !== null ? theme : "light";
  } else {
    return "light";
  }
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
