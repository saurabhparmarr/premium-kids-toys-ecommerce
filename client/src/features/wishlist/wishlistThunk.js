import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getWishlistAPI,
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "./wishlistAPI";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      return await getWishlistAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (id, { rejectWithValue }) => {
    try {
      return await addToWishlistAPI(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

export const removeWishlist = createAsyncThunk(
  "wishlist/remove",
  async (id, { rejectWithValue }) => {
    try {
      return await removeFromWishlistAPI(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);