import type { IAPIProduct, IAPIShop } from "@/types/api";

export interface SELLER_STATE {
  products: IAPIProduct[] | null;
  loading: boolean;
  error: string | null;
}
