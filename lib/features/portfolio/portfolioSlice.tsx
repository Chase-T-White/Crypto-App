import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/lib/store";
import { checkStorage, updateStorage } from "@/utils/localStorageFunctions";

const initialState = {
  portfolioCoins: [],
  status: "idle",
  error: null,
  newCoinStatus: "idle",
  newCoinError: null,
} as any;

export const fetchStorageCoins = createAsyncThunk(
  "portfolio/fetchStorageCoins",
  async () => {
    const storedCoins = checkStorage();

    if (storedCoins === undefined) {
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
    const response = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${newCoinInfo.id}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d`
    );

    response.data.portfolio_coin_data = {
      id: response.data.id,
      name: response.data.name,
      symbol: response.data.symbol,
      image: response.data.image,
      number_of_coins: newCoinInfo.number_of_coins,
      date_purchased: newCoinInfo.date_purchased,
      purchase_price_of_coin: newCoinInfo.purchase_price_of_coin,
      circulating_supply_at_purchase:
        newCoinInfo.circulating_supply_at_purchase,
      max_supply_at_purchase: newCoinInfo.max_supply_at_purchase,
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

        if (storedCoins === undefined) {
          updateStorage([action.payload.portfolio_coin_data]);
        } else {
          updateStorage([...storedCoins, action.payload.portfolio_coin_data]);
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
