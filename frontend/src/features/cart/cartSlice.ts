import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CART_STATE } from "./cartTypes";
import type { ICartItem, IWishlistItem } from "@/types/common";
import { calculatePriceAfterDiscount } from "@/utils";

const initialState: CART_STATE = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") ?? "")
    : [],
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems") ?? "")
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

      state.totalAmount = Number(total.toFixed(2));

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

      state.totalAmount = Number(total.toFixed(2));
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
    clearCart(state) {
      state.cart = [];
      state.totalAmount = 0;

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
    toggleWishlist(state, action: PayloadAction<IWishlistItem>) {
      const wishlistItem = action.payload;
      const alreadyExists = state.wishlist?.find(
        (item) => item.id === wishlistItem.id
      );

      if (alreadyExists) {
        state.wishlist = state.wishlist?.filter(
          (item) => item.id !== wishlistItem.id
        )!;
      } else {
        state.wishlist = [...state.wishlist, wishlistItem];
      }

      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    },
  },
});

export const { addToCart, removeFromCart, toggleWishlist, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
