"use client";
import { ICartItem, IWishlistItem } from "@/types/common";
import { calculatePriceAfterDiscount } from "@/utils";
import { create } from "zustand";

interface CartState {
  cart: ICartItem[];
  wishlist: IWishlistItem[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
}

export interface CartActions {
  addToCart: (item: ICartItem) => void;
  removeFromCart: (item: ICartItem) => void;
  clearCart: () => void;
  toggleWishlist: (item: IWishlistItem) => void;
  initializeCartState: () => void;
}

export type CartStore = CartState & CartActions;

const defaultInitialState: CartState = {
  cart: [],
  wishlist: [],
  totalAmount: 0,
  loading: false,
  error: null,
};

export const useCartStore = create<CartStore>((set, get) => ({
  ...defaultInitialState,
  initializeCartState: () => {
    const cart = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") ?? "")
      : [];

    const wishlist = localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems") ?? "")
      : [];
    const totalAmount = Number(localStorage.getItem("totalAmount")) 
    set(() => ({ cart, wishlist, totalAmount }));
  },
  addToCart: (item) => {
    const cartItem = item;
    const cart = get().cart;
    const alreadyExists = cart?.find((item) => item.id === cartItem.id);

    let updatedCart: ICartItem[] = [];
    if (alreadyExists) {
      updatedCart = cart?.map((item) =>
        item.id === cartItem.id ? cartItem : item
      )!;
      set(() => ({ cart: updatedCart }));
    } else {
      updatedCart = cart ? [...cart, cartItem] : [cartItem];
      set(() => ({ cart: updatedCart }));
    }

    let total = updatedCart.reduce((acc, curr) => {
      const price: number = calculatePriceAfterDiscount(
        curr.price,
        curr.discount
      );
      return acc + price * curr.qty;
    }, 0);

    const newAmount = Number(total.toFixed(2));
    set(() => ({ totalAmount: newAmount }));

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    localStorage.setItem("totalAmount", JSON.stringify(newAmount));
  },
  removeFromCart: (item) => {
    const cartItem = item;
    const cart = get().cart;
    const updatedCart = cart?.filter((item) => item.id !== cartItem.id)!;

    let total = updatedCart.reduce((acc, curr) => {
      const price: number = calculatePriceAfterDiscount(
        curr.price,
        curr.discount
      );
      return acc + price * curr.qty;
    }, 0);

    const newAmount = Number(total.toFixed(2));

    set(() => ({ totalAmount: newAmount, cart: updatedCart }));

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    localStorage.setItem("totalAmount", JSON.stringify(newAmount));
  },
  clearCart() {
    set(() => ({ cart: [], totalAmount: 0 }));

    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("totalAmount", JSON.stringify(0));
  },
  toggleWishlist(item) {
    const wishlistItem = item;
    const wishlist = get().wishlist;
    const alreadyExists = wishlist?.find((item) => item.id === wishlistItem.id);

    let updatedWishlist: IWishlistItem[] = [];
    if (alreadyExists) {
      updatedWishlist = wishlist?.filter(
        (item) => item.id !== wishlistItem.id
      )!;
    } else {
      updatedWishlist = [...wishlist, wishlistItem];
    }

    set(() => ({ wishlist: updatedWishlist }));

    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
  },
}));
