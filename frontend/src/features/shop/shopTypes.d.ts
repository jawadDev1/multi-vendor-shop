import type { IAPIShop } from "@/types/api";

export interface SHOP_STATE {
  shop: IAPIShop | null;
  loading: boolean;
  error: string | null;
}
