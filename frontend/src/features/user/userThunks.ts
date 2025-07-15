import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IAPIUserConversatoinResponse,
  IAPIUserResponse,
} from "@/types/api";
import { getApiRequest, getReduxApiRequest } from "@/utils/api";

export const loadUser = createAsyncThunk<IAPIUserResponse>(
  "user/load",
  async (_, thunkAPI) => {
    try {
      const result = await getApiRequest("user/getuser");

      if (!result?.success) {
        throw new Error(result?.message);
      }

      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);

export const loadUserConversations =
  createAsyncThunk<IAPIUserConversatoinResponse>(
    "user/conversations",
    async (_, thunkAPI) => {
      try {
        return await getReduxApiRequest("conversation/user-conversations");
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error?.response?.data?.message || "Failed"
        );
      }
    }
  );
