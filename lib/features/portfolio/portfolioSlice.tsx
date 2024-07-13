"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";
import {
  checkStorage,
  updateStorage,
  clearStorage,
} from "@/utils/localStorageFunctions";
import { v4 } from "uuid";

const initialState = {
  portfolioCoins: [],
  status: "idle",
  error: null,
  newCoinStatus: "idle",
  newCoinError: null,
} as any;

// clearStorage();

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
      let coinIds = Object.keys(storedCoins[0]);

      console.log(storedCoins, coinIds);

      const response = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&ids=${coinIds.join(
          ","
        )}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
      );

      response?.data.map((_: any, i: number) => {
        response.data[i].portfolio_coin_data = storedCoins[0].coinIds[i];
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
      betterId: v4(),
      id: response.data[0].id,
      name: response.data[0].name,
      symbol: response.data[0].symbol,
      image: response.data[0].image,
      number_of_coins: newCoinInfo.number_of_coins,
      date_purchased: newCoinInfo.date_purchased,
      purchase_price_of_coin:
        historicalDataResponse.data.market_data.current_price,
    };

    return response.data;
  }
);

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    removeCoin(state, action) {
      const { coinId, assetId } = action.payload;
      const filteredCoins = state.portfolioCoins.filter(
        (coin: PortfolioCoins) => coin.betterId !== coinId
      );

      state.portfolioCoins = filteredCoins;

      const findStorageCoinEntry = storedCoins?.find(
        (entry) => assetId === Object.keys(entry)[0]
      );

      const filteredStorage = findStorageCoinEntry.filter(
        (entry: StorageCoins) => entry.betterId !== coinId
      );

      const updatedData = storedCoins?.map((entry) => {
        return {
          ...entry,
          [assetId]: [...filteredStorage],
        };
      });
      updateStorage([updatedData]);
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

        const coinId = action.payload[0].id;

        if (storedCoins === undefined) {
          updateStorage([
            { [coinId]: [action.payload[0].portfolio_coin_data] },
          ]);
        } else {
          const coinStorageEntry = storedCoins.find(
            (entry) => coinId === Object.keys(entry)[0]
          );

          if (!coinStorageEntry) {
            const updatedData = storedCoins.map((entry) => {
              return {
                ...entry,
                [coinId]: [action.payload[0].portfolio_coin_data],
              };
            });
            updateStorage([updatedData]);
          } else {
            const updatedData = storedCoins.map((entry) => {
              return {
                ...entry,
                [coinId]: [
                  ...entry.coinId,
                  action.payload[0].portfolio_coin_data,
                ],
              };
            });
            updateStorage(updatedData);
          }
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
