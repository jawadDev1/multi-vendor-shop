import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/features/user/userSlice";
import shopSlice from "@/features/shop/shopSlice";
import sellerSlice from "@/features/seller/sellerSlice";
import eventSlice from "@/features/event/eventSlice";
import productSlice from "@/features/product/productSlice";
import categorySlice from "@/features/category/categorySlice";
import cartSlice from "@/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    shop: shopSlice,
    seller: sellerSlice,
    event: eventSlice,
    product: productSlice,
    category: categorySlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
