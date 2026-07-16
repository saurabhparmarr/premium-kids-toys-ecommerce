import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id
            ? {
                ...x,
                quantity: x.quantity + 1,
              }
            : x,
        );
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cartItems");
    },

    increaseQty: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQty: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
