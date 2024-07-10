"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";
import { checkStorage, updateStorage } from "@/utils/localStorageFunctions";
import { v4 } from "uuid";

const initialState = {
  portfolioCoins: [],
  status: "idle",
  error: null,
  newCoinStatus: "idle",
  newCoinError: null,
} as any;

// rethink data saved in storage to include multiple entries of the same coin

const storedCoins = checkStorage();

export const fetchStorageCoins = createAsyncThunk(
  "portfolio/fetchStorageCoins",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const selectedCurrency = state.currency.selectedCurrency.toLowerCase();
    if (!storedCoins) {
      return;
    } else {
      let coinIds = storedCoins.map((coin: StorageCoins) => {
        return coin.id;
      });

      const response = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&ids=${coinIds.join(
          ","
        )}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
      );

      response?.data.map((_: any, i: number) => {
        response.data[i].portfolio_coin_data = storedCoins[i];
      });

      response.data[0].betterId = v4();

      return response.data;
    }
  }
);

export const fetchNewPortfolioCoin = createAsyncThunk(
  "portfolio/fetchNewPortfolioCoin",
  async (newCoinInfo: any, { getState }) => {
    const state = getState() as RootState;
    const selectedCurrency = state.currency.selectedCurrency.toLowerCase();
    // Cannot query date past 365 days without paid plan. Additionally, date param: dd-mm-yyyy
    const historicalDataResponse = await axios(
      `https://api.coingecko.com/api/v3/coins/${newCoinInfo.id}/history?date=${newCoinInfo.date_purchased}?localization=false`
    );

    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&ids=${newCoinInfo.id}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
    );

    response.data[0].betterId = v4();

    response.data[0].portfolio_coin_data = {
      id: response.data[0].id,
      name: response.data[0].name,
      symbol: response.data[0].symbol,
      image: response.data[0].image,
      number_of_coins: newCoinInfo.number_of_coins,
      date_purchased: newCoinInfo.date_purchased,
      purchase_price_of_coin:
        historicalDataResponse.data.market_data.current_price.usd,
    };

    return response.data;
  }
);

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    removeCoin(state, action) {
      const { removeAssetId } = action.payload;
      const filteredCoins = state.portfolioCoins.filter(
        (coin: PortfolioCoins) => coin.id !== removeAssetId
      );

      state.portfolioCoins = filteredCoins;

      const storageData = filteredCoins.map(
        (coin: PortfolioCoins) => coin.portfolio_coin_data
      );

      updateStorage(storageData);
    },
  },
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
      })
      .addCase(fetchNewPortfolioCoin.pending, (state) => {
        state.newCoinStatus = "loading";
      })
      .addCase(fetchNewPortfolioCoin.fulfilled, (state, action) => {
        state.newCoinStatus = "succeeded";

        if (storedCoins === undefined) {
          updateStorage([action.payload[0].portfolio_coin_data]);
        } else {
          updateStorage([
            ...storedCoins,
            action.payload[0].portfolio_coin_data,
          ]);
        }

        state.portfolioCoins.push(...action.payload);
      })
      .addCase(fetchNewPortfolioCoin.rejected, (state, action) => {
        state.newCoinStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeCoin } = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const selectAllPortfolioCoins = (state: RootState) =>
  state.portfolio.portfolioCoins;

export const portfolioFetchStatus = (state: RootState) =>
  state.portfolio.status;

export const newCoinFetchStatus = (state: RootState) =>
  state.portfolio.newCoinStatus;
