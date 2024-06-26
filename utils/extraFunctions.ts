export function coinTableSort(
  a: any,
  b: any,
  sortRotation: string,
  sortCategory: string
) {
  if (sortRotation === "asc") {
    if (typeof a[sortCategory] === "number") {
      return a[sortCategory] > b[sortCategory] ? 1 : -1;
    }
    return a[sortCategory].toString().localeCompare(b[sortCategory]);
  } else if (sortRotation === "desc") {
    if (typeof a[sortCategory] === "number") {
      return a[sortCategory] > b[sortCategory] ? -1 : 1;
    }
    return b[sortCategory].toString().localeCompare(a[sortCategory]);
  } else {
    return a - b;
  }
}
