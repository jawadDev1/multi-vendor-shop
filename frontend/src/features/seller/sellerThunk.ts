import type { IAPIProductResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk<IAPIProductResponse>(
  "seller/products",
  async (_, thunkAPI) => {
    try {
      return await getApiRequest(`product/get-shop-products`);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);
