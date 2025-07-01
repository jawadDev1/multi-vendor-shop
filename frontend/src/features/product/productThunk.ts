import type { IAPIProductResponse, IAPIUserProductResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadBestDeals = createAsyncThunk<IAPIUserProductResponse>(
  "product/best_deals",
  async (_, thunkAPI) => {
    try {
      return await getApiRequest("product/best-deals");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);

export const loadFeaturedProducts = createAsyncThunk<IAPIProductResponse>(
  "product/featured_products",
  async (_, thunkAPI) => {
    try {
      return await getApiRequest("product/featured");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);
