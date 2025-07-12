import type { RootState } from "@/app/store";
import type {
  IAPIOrdersResponse,
  IAPIProductResponse,
  IAPISellerConversatoinResponse,
} from "@/types/api";
import { getReduxApiRequest } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk<IAPIProductResponse>(
  "seller/products",
  async (_, thunkAPI) => {
    try {
      return await getReduxApiRequest(`product/get-shop-products`);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed"
      );
    }
  }
);

export const getSellerOrders = createAsyncThunk<
  IAPIOrdersResponse,
  void,
  { state: RootState }
>("seller/orders", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const shopId = state.shop.shop?._id;

    return await getReduxApiRequest(`order/get-seller-orders/${shopId}`);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed");
  }
});

export const getSellerConversations = createAsyncThunk<
  IAPISellerConversatoinResponse,
  void,
  { state: RootState }
>("seller/conversations", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const sellerId = state.user.user?._id;

    return await getReduxApiRequest(`conversation/seller-conversations/${sellerId}`);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed");
  }
});
