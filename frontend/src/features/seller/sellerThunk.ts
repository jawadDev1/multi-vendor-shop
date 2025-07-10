import type { RootState } from "@/app/store";
import type { IAPIOrdersResponse, IAPIProductResponse } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk<IAPIProductResponse>(
  "seller/products",
  async (_, thunkAPI) => {
    try {
      return await getApiRequest(`product/get-shop-products`);
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

    return await getApiRequest(`order/get-seller-orders/${shopId}`);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed");
  }
});
