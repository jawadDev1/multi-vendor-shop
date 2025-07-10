import { createSlice } from "@reduxjs/toolkit";

import { getProducts, getSellerOrders } from "./sellerThunk";
import type { SELLER_STATE } from "./sellerTypes";

const initialState: SELLER_STATE = {
  products: null,
  orders: null,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSellerOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(getSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerSlice.reducer;
