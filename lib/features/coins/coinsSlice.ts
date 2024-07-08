import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";

const initialState = {
  coins: [],
  status: "idle",
  error: null,
  coinsList: [],
  coinsListStatus: "idle",
  coinsListError: null,
  currenciesList: [],
  currenciesListStatus: "idle",
  currenciesListError: null,
} as any;

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async (pageNumber: number, { getState }) => {
    const state = getState() as RootState;
    const selectedCurrency = state.currency;
    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=10&page=${pageNumber}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    return response.data;
  }
);

export const fetchCoinsList = createAsyncThunk(
  "coins/fetchCoinsList",
  async () => {
    const response = await axios("https://api.coingecko.com/api/v3/coins/list");

    const coinsList = response.data.map((coin: any) => {
      return coin.name;
    });

    return coinsList;
  }
);

export const fetchCurrenciesList = createAsyncThunk(
  "coins/fetchCurrenciesList",
  async () => {
    const response = await axios(
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
    );

    return response.data;
  }
);

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins.push(...action.payload);
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCoinsList.pending, (state) => {
        state.coinsListStatus = "loading";
      })
      .addCase(fetchCoinsList.fulfilled, (state, action) => {
        state.coinsListStatus = "succeeded";
        state.coinsList.push(...action.payload);
      })
      .addCase(fetchCoinsList.rejected, (state, action) => {
        state.coinsListStatus = "failed";
        state.coinsListError = action.error.message;
      })
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

export default coinsSlice.reducer;

export const selectAllCoins = (state: RootState) => state.coins.coins;
export const coinsFetchStatus = (state: RootState) => state.coins.status;

export const selectCoinById = (state: RootState, coinId: string) => {
  state.coins.coins.find((coin: Coins) => coin.id === coinId);
};

export const selectCoinsList = (state: RootState) => state.coins.coinsList;
export const selectCurrenciesList = (state: RootState) =>
  state.coins.currenciesList;
export const selectedCurrency = (state: RootState) =>
  state.coins.selectedCurrency;
