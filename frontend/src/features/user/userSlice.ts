import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "./userTypes";
import { loadUser } from "./userThunks";
import type { IAPIUser } from "@/types/api";

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  userLoaded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<IAPIUser>) {
      if (action.payload?._id) {
        state.user = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.userLoaded = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.userLoaded = true;
      });
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
