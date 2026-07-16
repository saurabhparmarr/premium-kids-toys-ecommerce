import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import orderReducer from "../features/order/orderSlice";
import shippingReducer from "../features/shipping/shippingSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
  shipping: shippingReducer,
});

const appReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled') {
    state = undefined; 
  }
  return rootReducer(state, action);
};


export const store = configureStore({
  reducer: appReducer,
});