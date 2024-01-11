import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coins: [],
  status: "idle",
  error: null,
} as any;

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const response = await axios(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
  );
  return response.data;
});

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCoins.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins.push(...action.payload);
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default coinsSlice.reducer;

export const selectAllCoins = (state) => state.coins.coins;

export const selectCoinById = (state, coinId) => {
  state.coins.coins.find((coin) => coin.id === coinId);
};
