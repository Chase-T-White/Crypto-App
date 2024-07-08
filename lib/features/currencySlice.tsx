import { createSlice } from "@reduxjs/toolkit";
import { getStorageCurrency } from "@/utils/localStorageFunctions";
import getSymbolFromCurrency from "currency-symbol-map";
import { selectedCurrency } from "./coins/coinsSlice";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    selectedCurrency: getStorageCurrency(),
    currencySymbol: getSymbolFromCurrency(selectedCurrency.toUpperCase()),
  },
  reducers: {
    setCurrency: (_, action) => action.payload,
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
