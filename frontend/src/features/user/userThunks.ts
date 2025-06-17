import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "@/constants/static";
import type { IAPIUser } from "@/types/api";

export const loadUser = createAsyncThunk<IAPIUser>(
  "user/load",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<IAPIUser>(`${API_URL}/user/getuser`, {
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
