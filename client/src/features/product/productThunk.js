import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsAPI,
  getProductByIdentifierAPI, // Sirf ise rakho
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productAPI";

// Create Product
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, { rejectWithValue }) => {
    try {
      return await createProductAPI(productData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create product");
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      return await updateProductAPI(id, productData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update product");
    }
  }
);

// Get All Products
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getProductsAPI(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Get Single Product by ID


// productThunk.js

export const getProductByIdentifier = createAsyncThunk(
  "product/getProductByIdentifier",
  async (identifier, { rejectWithValue }) => {
    try {
      // Yahan axios.get ke bajaye import kiya hua API function use karo
      const response = await getProductByIdentifierAPI(identifier);
      return response; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete Failed"
      );
    }
  }
);