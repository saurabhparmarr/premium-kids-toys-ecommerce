import { createSlice } from "@reduxjs/toolkit";
import {
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
} from "./orderThunk";

// Initial state ko ek function ke roop me rakha hai taaki reset karte waqt naya object mile
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderState: () => initialState, // Manual cleanup ke liye
  },
  extraReducers: (builder) => {
    builder
      // 🚨 PURE CLEANUP: Logout hote hi state wapis initial par chali jayegi
      .addCase("auth/logout/fulfilled", () => {
        return initialState;
      })

      // Get My Orders (User side)
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Orders (Admin side)
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })

      // Razorpay Order Creation
      .addCase(createRazorpayOrder.pending, (state) => { state.loading = true; })
      .addCase(createRazorpayOrder.fulfilled, (state) => { state.loading = false; })
      .addCase(createRazorpayOrder.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Payment Verification
      .addCase(verifyPaymentAndCreateOrder.pending, (state) => { state.loading = true; })
      .addCase(verifyPaymentAndCreateOrder.fulfilled, (state) => { state.loading = false; })
      .addCase(verifyPaymentAndCreateOrder.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;