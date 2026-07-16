import { createSlice } from "@reduxjs/toolkit";

import {
  getWishlist,
  addToWishlist,
  removeWishlist,
} from "./wishlistThunk";

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get Wishlist
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload;
      })

      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlistItems.push(action.payload);
      })

      // Remove Wishlist
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== action.payload._id
        );
      });
  },
});

export default wishlistSlice.reducer;