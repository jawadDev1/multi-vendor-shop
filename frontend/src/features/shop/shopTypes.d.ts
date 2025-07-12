import type { IAPIShop, IAPIShopDetails } from "@/types/api";

export interface SHOP_STATE {
  shop: IAPIShopDetails | null;
  loading: boolean;
  error: string | null;
}
