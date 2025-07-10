import type { IAPIOrder, IAPIProduct, IAPIShop } from "@/types/api";

export interface SELLER_STATE {
  products: IAPIProduct[] | null;
  orders: IAPIOrder[] | null;
  loading: boolean;
  error: string | null;
}
