import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./features/coins/coinsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
