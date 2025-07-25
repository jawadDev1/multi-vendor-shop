import type { IAPIShopDetails, IAPIUser } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { create } from "zustand";

interface StoreState {
  shop: IAPIShopDetails | null;
  loading: boolean;
  error: string | null;

}

export interface StoreActions {
  updateShop: (shop: IAPIShopDetails) => void;
  loadShop: () => void
}

export type Store = StoreState & StoreActions;

const defaultInitialState: StoreState = {
  shop: null,
  loading: false,
  error: null,
};

export const useShopStore = create<Store>((set, get) => ({
  ...defaultInitialState,
  updateShop: (shop) => {
    if (shop?.slug) {
      set(() => ({ shop}));
    }
  },
  loadShop: async () => {
    set(() => ({ loading: true }));
    const result = await getApiRequest("shop/get-shop");
    set(() => ({ loading: false}));

    if (!result.success) {
      set(() => ({error: result?.message}))
      return;
    }

    set(() => ({shop: result?.data}));
  },
}));
