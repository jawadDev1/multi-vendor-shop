import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "@/constants/index";
import type { IAPIUserResponse } from "@/types/api";

export const loadUser = createAsyncThunk<IAPIUserResponse>(
  "user/load",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<IAPIUserResponse>(`${API_URL}/user/getuser`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);
