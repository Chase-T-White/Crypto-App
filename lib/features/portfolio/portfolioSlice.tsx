import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";
import {
  checkStorage,
  updateStorage,
  clearStorage,
} from "@/utils/localStorageFunctions";

const initialState = {
  portfolioCoins: [],
  status: "idle",
  error: null,
  newCoinStatus: "idle",
  newCoinError: null,
} as any;

clearStorage();

// fix updates in local storage. Being saved as null

export const fetchStorageCoins = createAsyncThunk(
  "portfolio/fetchStorageCoins",
  async () => {
    const storedCoins = checkStorage();

    if (!storedCoins) {
      return;
    } else {
      let coinIds = storedCoins.map((coin: StorageCoins) => {
        return coin.id;
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

export const fetchNewPortfolioCoin = createAsyncThunk(
  "portfolio/fetchNewPortfolioCoin",
  async (newCoinInfo: any) => {
    // Cannot query date past 365 days without paid plan. Additionally, date param: dd-mm-yyyy
    const historicalDataResponse = await axios(
      `https://api.coingecko.com/api/v3/coins/${newCoinInfo.id}/history?date=${newCoinInfo.date_purchased}?localization=false`
    );

    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${newCoinInfo.id}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
    );

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
      })
      .addCase(fetchNewPortfolioCoin.pending, (state) => {
        state.newCoinStatus = "loading";
      })
      .addCase(fetchNewPortfolioCoin.fulfilled, (state, action) => {
        state.newCoinStatus = "succeeded";
        const storedCoins = checkStorage();

        console.log(storedCoins);

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

export default portfolioSlice.reducer;

export const selectAllPortfolioCoins = (state: RootState) =>
  state.portfolio.portfolioCoins;

export const portfolioFetchStatus = (state: RootState) =>
  state.portfolio.status;

export const newCoinFetchStatus = (state: RootState) =>
  state.portfolio.newCoinStatus;
