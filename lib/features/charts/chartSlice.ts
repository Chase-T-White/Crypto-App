import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";

const initialState = {
  coins: [],
  timeScale: {
    days: 1,
    interval: "hourly",
  },
  status: "idle",
  error: null,
} as any;

export const fetchCoinData = createAsyncThunk(
  "charts/fetchCoinData",
  async (coinId: string) => {
    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily`
    );
    return response.data;
  }
);

export const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    removeCoin(state, action) {
      const { coinId } = action.payload;
      const updateCoins = state.coins.filter(
        (coin: Coins) => coin.id !== coinId
      );
      state.coins = updateCoins;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoinData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCoinData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins.push(action.payload);
      })
      .addCase(fetchCoinData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeCoin } = chartSlice.actions;

export default chartSlice.reducer;

export const selectAllCoinData = (state: RootState) => state.charts.coins;

export const selectCoinById = (state: RootState, coinId: string) => {
  state.charts.coins.find((coin: Coins) => coin.id === coinId);
};
