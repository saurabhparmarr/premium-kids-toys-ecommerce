import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API call to fetch all products
export const fetchAllProducts = createAsyncThunk('admin/fetchAllProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:5000/api/products'); // Apne backend ka URL check kar lena
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// API call to delete a product
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchAllProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;