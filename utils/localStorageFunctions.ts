export function checkStorage() {
  const localStorageCoins = window.localStorage.getItem("coins");

  if (localStorageCoins === null) return;

  let storedCoinsArray = [];

  return storedCoinsArray.push(...JSON.parse(localStorageCoins));
}

export function updateStorage(updatedCoins: any) {
  return window.localStorage.setItem("coins", JSON.stringify(updatedCoins));
}
