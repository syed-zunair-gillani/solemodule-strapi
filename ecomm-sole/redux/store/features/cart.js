import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      // Magic
      // Immer will handle the mutation
      state.items.push(action.payload);
    },
  },
});

export const { add } = cartSlice.actions;

export default cartSlice.reducer;
