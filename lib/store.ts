import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./features/coins/coinsSlice";
import chartReducer from "./features/charts/chartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinsReducer,
      charts: chartReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
