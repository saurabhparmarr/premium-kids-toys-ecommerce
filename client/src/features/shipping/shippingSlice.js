import { createSlice } from "@reduxjs/toolkit";

const shippingFromStorage =
  localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const initialState = {
  shippingAddress: shippingFromStorage,
};

const shippingSlice = createSlice({
  name: "shipping",

  initialState,

  reducers: {
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { saveShippingAddress } = shippingSlice.actions;

export default shippingSlice.reducer;