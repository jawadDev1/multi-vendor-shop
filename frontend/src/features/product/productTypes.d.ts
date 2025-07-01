import type { IAPIProduct, IAPISellerEvent, IAPIShop, IAPIUserProduct } from "@/types/api";

export interface PRODUCT_STATE {
  best_deals: IAPIUserProduct[] | null;
  featured_products: IAPIProduct[] | null;
  loading: boolean;
  error: string | null;
}
