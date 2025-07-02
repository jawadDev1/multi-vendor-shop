import { createSlice } from "@reduxjs/toolkit";

import { loadPopularEvent, loadSellerEvents } from "./eventThunk";
import type { EVENT_STATE } from "./eventTypes";

const initialState: EVENT_STATE = {
  sellerEvents: null,
  popular_event: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadSellerEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadSellerEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerEvents = action.payload.data;
      })
      .addCase(loadSellerEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadPopularEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPopularEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.popular_event = action.payload.data;
      })
      .addCase(loadPopularEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventSlice.reducer;
