import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";

const initialState = {
  coin: [],
  status: "idle",
  error: null,
} as any;

export const fetchCoin = createAsyncThunk(
  "coin/fetchCoin",
  async (coinId: string) => {
    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
    );
    return response.data;
  }
);

export const coinPageSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    clearCoin(state) {
      state.coin = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coin.push(action.payload);
      })
      .addCase(fetchCoin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCoin } = coinPageSlice.actions;
export default coinPageSlice.reducer;

export const selectCoin = (state: RootState) => state.coin.coin[0];
export const coinFetchStatus = (state: RootState) => state.coin.status;
