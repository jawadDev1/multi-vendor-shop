import { createSlice } from "@reduxjs/toolkit";
import type { PRODUCT_STATE } from "./productTypes";
import { loadBestDeals, loadFeaturedProducts } from "./productThunk";

const initialState: PRODUCT_STATE = {
  best_deals: null,
  featured_products: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadBestDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadBestDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.best_deals = action.payload.data;
      })
      .addCase(loadBestDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured_products = action.payload.data;
      })
      .addCase(loadFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
