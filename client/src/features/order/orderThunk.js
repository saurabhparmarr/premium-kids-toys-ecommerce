import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getMyOrdersAPI,
  getAllOrdersAPI,
  updateOrderStatusAPI,
  createRazorpayOrderAPI,
  verifyPaymentAndCreateOrderAPI,
} from "./orderAPI";

// Razorpay Order
export const createRazorpayOrder = createAsyncThunk(
  "order/createRazorpayOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      return await createRazorpayOrderAPI(orderData);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to initiate payment"
      );
    }
  }
);

// Verify Payment
export const verifyPaymentAndCreateOrder = createAsyncThunk(
  "order/verifyPaymentAndCreateOrder",
  async (paymentData, { rejectWithValue }) => {
    try {
      return await verifyPaymentAndCreateOrderAPI(
        paymentData
      );
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Payment verification failed"
      );
    }
  }
);

// My Orders
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyOrdersAPI();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error"
      );
    }
  }
);

// Admin Orders
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllOrdersAPI();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error"
      );
    }
  }
);

// Update Status
export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await updateOrderStatusAPI(
        id,
        status
      );
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error"
      );
    }
  }
);