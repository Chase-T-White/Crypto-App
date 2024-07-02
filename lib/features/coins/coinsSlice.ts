import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";

const initialState = {
  coins: [],
  status: "idle",
  error: null,
} as any;

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async (pageNumber: number) => {
    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNumber}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
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
      });
  },
});

export default coinsSlice.reducer;

export const selectAllCoins = (state: RootState) => state.coins.coins;
export const coinsFetchStatus = (state: RootState) => state.coins.status;

export const selectCoinById = (state: RootState, coinId: string) => {
  state.coins.coins.find((coin: Coins) => coin.id === coinId);
};
