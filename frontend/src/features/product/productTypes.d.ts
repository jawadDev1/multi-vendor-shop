import type {
  IAPIProduct,
  IAPISellerEvent,
  IAPIShop,
  IAPIUserProduct,
} from "@/types/api";

export interface PRODUCT_STATE {
  best_deals: IAPIUserProduct[] | null;
  featured_products: IAPIUserProduct[] | null;
  productDetails?: IAPIUserProduct | null;
  relatedProducts: IAPIUserProduct[] | null;
  loading: boolean;
  error: string | null;
}
