"use client";
// import { add } from "@/lib/store/features/cart/cartSlice";
import React, { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store/store";

const StoreProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    // Add initial state
    // storeRef.current.dispatch(add('testproductid'));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
