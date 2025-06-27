import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/features/user/userSlice";
import shopSlice from "@/features/shop/shopSlice";
import sellerSlice from "@/features/seller/sellerSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    shop: shopSlice,
    seller: sellerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
