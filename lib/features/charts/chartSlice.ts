import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";
import { capitalizeFirstLetter } from "@/utils/formatText";

const initialState = {
  coins: [],
  timeScale: {
    days: 1,
    interval: "hourly",
  },
  coinIds: [],
  status: "idle",
  error: null,
} as any;

export const fetchCoinData = createAsyncThunk(
  "charts/fetchCoinData",
  async ({
    coinId,
    symbol,
    days,
  }: {
    coinId: string;
    symbol: string;
    days: number;
  }) => {
    // Cannot use 5m or hourly interval without paided sub. Exclude interval param for auto granularity from api

    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    response.data.id = capitalizeFirstLetter(coinId);
    response.data.symbol = symbol;
    return response.data;
  }
);

export const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    clearCoin(state) {
      state.coins = [];
      state.coinIds = [];
    },
    removeCoinById(state, action) {
      const coinId = capitalizeFirstLetter(action.payload);

      const updateCoins = state.coins.filter(
        (coin: Coins) => coin.id !== coinId
      );
      const updateCoinIds = state.coinIds.filter(
        (data: string) => data !== coinId
      );
      state.coins = updateCoins;
      state.coinIds = updateCoinIds;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoinData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoinData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins.push(action.payload);
        state.coinIds.push(action.payload.id);
      })
      .addCase(fetchCoinData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCoin, removeCoinById } = chartSlice.actions;

export default chartSlice.reducer;

export const selectAllCoinData = (state: RootState) => state.charts.coins;
export const coinFetchStatus = (state: RootState) => state.charts.status;

export const selectCoinIds = (state: RootState) => state.charts.coinIds;
