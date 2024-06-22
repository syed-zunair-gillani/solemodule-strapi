import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart";
// store variable is a global variable.
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};
