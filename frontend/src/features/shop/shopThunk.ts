import type { IAPIShopDetailsResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadShop = createAsyncThunk<IAPIShopDetailsResponse>(
  "shop/load",
  async (_, thunkAPI) => {
    try {
      return await getApiRequest("shop/get-shop");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);
