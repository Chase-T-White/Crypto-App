import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getStorageCurrency,
  updateStorageCurrency,
} from "@/utils/localStorageFunctions";
import { RootState } from "../store";
import getSymbolFromCurrency from "currency-symbol-map";

const { currency, currencySymbol } = getStorageCurrency()[0];

export const fetchCurrenciesList = createAsyncThunk(
  "coins/fetchCurrenciesList",
  async () => {
    const response = await axios(
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
    );

    return response.data.sort();
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currenciesList: [],
    currenciesListStatus: "idle",
    currenciesListError: null,
    selectedCurrency: currency,
    currencySymbol: currencySymbol,
  } as any,
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
      state.currencySymbol = getSymbolFromCurrency(
        action.payload.toUpperCase()
      );
      updateStorageCurrency(action.payload);
    },
    setCurrencySymbol: (state, action) => {
      state.currencySymbol = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrenciesList.pending, (state) => {
        state.currenciesListStatus = "loading";
      })
      .addCase(fetchCurrenciesList.fulfilled, (state, action) => {
        state.currenciesListStatus = "succeeded";
        state.currenciesList.push(...action.payload);
      })
      .addCase(fetchCurrenciesList.rejected, (state, action) => {
        state.currenciesListStatus = "failed";
        state.currenciesListError = action.error.message;
      });
  },
});

export const { setCurrency, setCurrencySymbol } = currencySlice.actions;
export default currencySlice.reducer;

export const selectCurrenciesList = (state: RootState) =>
  state.currency.currenciesList;
export const selectCurrenciesListStatus = (state: RootState) =>
  state.currency.currenciesListStatus;
export const selectCurrency = (state: RootState) =>
  state.currency.selectedCurrency;
export const selectCurrencySymbol = (state: RootState) =>
  state.currency.currencySymbol;
