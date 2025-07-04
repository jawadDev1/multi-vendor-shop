import { createSlice } from "@reduxjs/toolkit";

import { getProducts } from "./sellerThunk";
import type { SELLER_STATE } from "./sellerTypes";

const initialState: SELLER_STATE = {
  products: null,
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
      });
  },
});

export default sellerSlice.reducer;
