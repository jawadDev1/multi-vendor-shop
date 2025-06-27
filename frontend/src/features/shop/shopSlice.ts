import { createSlice } from "@reduxjs/toolkit";
import type { SHOP_STATE } from "./shopTypes";
import { loadShop } from "./shopThunk";

const initialState: SHOP_STATE = {
  shop: null,
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload.data;
      })
      .addCase(loadShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default shopSlice.reducer;
