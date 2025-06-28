import type { IAPISellerEventsResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadSellerEvents = createAsyncThunk<IAPISellerEventsResponse>(
  "event/load",
  async (_, thunkAPI) => {
    try {
      return await getApiRequest("event/get-seller-events");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);
