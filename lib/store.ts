import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./features/coins/coinsSlice";
import chartReducer from "./features/charts/chartSlice";
import coinPageReducer from "./features/coinPage/coinPageSlice";
import portfolioReducer from "./features/portfolio/portfolioSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinsReducer,
      charts: chartReducer,
      coin: coinPageReducer,
      portfolio: portfolioReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
