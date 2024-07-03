import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";
import { checkStorage, updateStorage } from "@/utils/localStorageFunctions";

const initialState = {
  portfolioCoins: [],
  status: "idle",
  error: null,
} as any;

export const fetchStorageCoins = createAsyncThunk(
  "portfolio/fetchStorageCoins",
  async () => {
    const storedCoins = checkStorage();

    if (storedCoins === undefined) {
      return;
    } else if (storedCoins.length > 0) {
      let coinIds = storedCoins.map((coin) => {
        return coin.name;
      });

      const response = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(
          ","
        )}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
      );

      response?.data.map((_: any, i: number) => {
        response.data[i].portfolio_coin_data = storedCoins[i];
      });

      return response.data;
    }
  }
);

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStorageCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStorageCoins.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload) {
          state.portfolioCoins.push(...action.payload);
        }
      })
      .addCase(fetchStorageCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default portfolioSlice.reducer;

export const selectAllPortfolioCoins = (state: RootState) =>
  state.portfolio.portfolioCoins;

export const portfolioFetchStatus = (state: RootState) =>
  state.portfolio.status;
