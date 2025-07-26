import { IShopRequest } from "@/types/extra";
import { create } from "zustand";

interface StoreState {
  shop: IShopRequest | null;
  isOpen: boolean;
}

export interface StoreActions {
  handleViewRequest: (shop: IShopRequest) => void;
  handleCloseModal: () => void;
}

export type Store = StoreState & StoreActions;

const defaultInitialState: StoreState = {
  shop: null,
  isOpen: false,
};

export const useShopRequestStore = create<Store>((set) => ({
  ...defaultInitialState,
  handleViewRequest: (shop) => {
    console.log("shop ======> ", shop)
    set(() => ({ shop , isOpen: true}));
    
  },
  handleCloseModal: async () => {
    set(() => ({ isOpen: false }));
  },
}));
