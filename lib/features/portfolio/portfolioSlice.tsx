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
} as any;

export const fetchStorageCoins = createAsyncThunk(
  "portfolio/fetchStorageCoins",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const selectedCurrency = state.currency.selectedCurrency.toLowerCase();
    const storedCoins = checkStorage();
    if (!storedCoins) {
      return;
    } else {
      let coinIds = Object.keys(storedCoins[0]);

      const response = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&ids=${coinIds.join(
          ","
        )}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
      );

      const dataFormatted: any = [];

      response?.data.map((_: any, i: number) => {
        response.data[i].portfolio_coin_data = storedCoins[0][coinIds[i]];
        dataFormatted.push({ [coinIds[i]]: response.data[i] });
      });

      return dataFormatted;
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

    response.data[0].portfolio_coin_data = [
      {
        betterId: v4(),
        id: response.data[0].id,
        name: response.data[0].name,
        symbol: response.data[0].symbol,
        image: response.data[0].image,
        number_of_coins: newCoinInfo.number_of_coins,
        date_purchased: newCoinInfo.date_purchased,
        purchase_price_of_coin:
          historicalDataResponse.data.market_data.current_price,
      },
    ];

    return response.data[0];
  }
);

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    removeCoin(state, action) {
      const storedCoins = checkStorage();
      const { coinId, assetId } = action.payload;

      // determine if instance is the only entry of coin
      let isSingleInstance = false;
      state.portfolioCoins.map((coin: any) => {
        const coinKey = Object.keys(coin)[0];

        if (coinKey === assetId) {
          if (coin[coinKey].portfolio_coin_data.length === 1) {
            isSingleInstance = true;
          }
        }
      });

      let filteredCoins, filteredStorageCoins;

      if (isSingleInstance) {
        filteredCoins = state.portfolioCoins.filter((coin: any) => {
          const coinKey = Object.keys(coin)[0];
          return coin[coinKey].name.toLowerCase() !== assetId;
        });
        delete storedCoins[0][assetId];
        filteredStorageCoins = storedCoins;
      } else {
        filteredCoins = state.portfolioCoins.map((coin: any) => {
          const coinKey = Object.keys(coin)[0];
          if (coinKey === assetId) {
            coin[coinKey].portfolio_coin_data = coin[
              coinKey
            ].portfolio_coin_data.filter((dataEntry: StorageCoins) => {
              console.log(`in the portfolio coins filter: ${dataEntry}`);

              return dataEntry.betterId !== coinId;
            });
          }
          return coin;
        });
        filteredStorageCoins = storedCoins.map((entry: any) => {
          entry[assetId] = entry[assetId].filter((instance: StorageCoins) => {
            return instance.betterId !== coinId;
          });
          return entry;
        });
      }

      state.portfolioCoins = filteredCoins;
      updateStorage(filteredStorageCoins);
    },
    clearPortfolioCoins(state) {
      state.portfolioCoins = [];
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
        state.status = "loading";
      })
      .addCase(fetchNewPortfolioCoin.fulfilled, (state, action) => {
        state.status = "succeeded";
        const storedCoins = checkStorage();
        const coinId = action.payload.id;

        // Portfolio has no coins
        if (storedCoins === undefined) {
          updateStorage([{ [coinId]: action.payload.portfolio_coin_data }]);
          state.portfolioCoins.push({ [coinId]: action.payload });
        } else {
          // Portfolio has coins
          const coinStorageEntry = Object.keys(storedCoins[0]).find(
            (key: string) => coinId === key
          );

          if (!coinStorageEntry) {
            const updatedData = storedCoins.map((entry: StorageCoins) => {
              return {
                ...entry, // copy other entries
                [coinId]: [...action.payload.portfolio_coin_data], // add new coin and instance
              };
            });
            updateStorage(updatedData);
            state.portfolioCoins.push({ [coinId]: action.payload });
          } else {
            // Coin already in portfolio. Adding new instance
            const updatedData = storedCoins.map((entry: any) => {
              return {
                ...entry, // copy other entries
                [coinId]: [
                  ...entry[coinId], // copy other instances of coin
                  ...action.payload.portfolio_coin_data, // add new coin instance
                ],
              };
            });
            updateStorage(updatedData);

            state.portfolioCoins.map((coin: any) => {
              const coinKey = Object.keys(coin)[0];

              if (coinKey === coinId) {
                coin[coinKey].portfolio_coin_data.push(
                  action.payload.portfolio_coin_data[0]
                );
              }
              return coin;
            });
          }
        }
      })
      .addCase(fetchNewPortfolioCoin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeCoin, clearPortfolioCoins } = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const selectAllPortfolioCoins = (state: RootState) =>
  state.portfolio.portfolioCoins;

export const portfolioFetchStatus = (state: RootState) =>
  state.portfolio.status;

export const newCoinFetchStatus = (state: RootState) =>
  state.portfolio.newCoinStatus;
