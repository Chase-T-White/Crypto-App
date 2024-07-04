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

export function clearStorage() {
  window.localStorage.clear();
  return;
}
