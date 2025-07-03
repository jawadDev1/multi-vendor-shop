import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CART_STATE } from "./cartTypes";
import type { ICartItem } from "@/types/common";
import { calculatePriceAfterDiscount } from "@/utils";

const initialState: CART_STATE = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") ?? "")
    : [],
  totalAmount: Number(localStorage.getItem("totalAmount")) ?? 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const cartItem = action.payload;
      const alreadyExists = state.cart?.find((item) => item.id === cartItem.id);

      if (alreadyExists) {
        state.cart = state.cart?.map((item) =>
          item.id === cartItem.id ? cartItem : item
        )!;
      } else {
        state.cart = state.cart
          ? [...state.cart, action.payload]
          : [action.payload];
      }

      let total = state.cart.reduce((acc, curr) => {
        const price: number = calculatePriceAfterDiscount(
          curr.price,
          curr.discount
        );
        return acc + price * curr.qty;
      }, 0);

      state.totalAmount = total;

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
    removeFromCart(state, action: PayloadAction<ICartItem>) {
      const cartItem = action.payload;
      console.log("runned ", cartItem);
      state.cart = state.cart?.filter((item) => item.id !== cartItem.id)!;

      let total = state.cart.reduce((acc, curr) => {
        const price: number = calculatePriceAfterDiscount(
          curr.price,
          curr.discount
        );
        return acc + price * curr.qty;
      }, 0);

      state.totalAmount = total;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
