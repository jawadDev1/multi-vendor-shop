import { createSlice } from "@reduxjs/toolkit";
import type { CATEGORY_STATE } from "./categoryTypes";
import { loadCategories } from "./categoryThunk";

const initialState: CATEGORY_STATE = {
  categories: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
