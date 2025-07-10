import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IAPIUserResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";

export const loadUser = createAsyncThunk<IAPIUserResponse>(
  "user/load",
  async (_, thunkAPI) => {
    try {
      return await getApiRequest("user/getuser");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);
