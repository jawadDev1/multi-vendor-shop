import type { IAPICategoryResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadCategories = createAsyncThunk<IAPICategoryResponse>(
  "category/load",
  async (_, thunkAPI) => {
    try {
      return await getApiRequest("category/categories");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);
