import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductByIdentifier,
  deleteProduct,
  createProduct,
  updateProduct,
} from "./productThunk";

// 1. Initial State pehle define karo
const initialState = {
  products: [],
  product: null,
  page: 1,
  pages: 1,
  totalProducts: 0,
  loading: false,
  error: null,
};

// 2. Slice create karo
const productSlice = createSlice({
  name: "product",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        if (state.product && state.product._id === action.payload._id) {
          state.product = action.payload;
        }
      })

      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Product (Updated with Identifier logic)
      .addCase(getProductByIdentifier.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByIdentifier.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductByIdentifier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;