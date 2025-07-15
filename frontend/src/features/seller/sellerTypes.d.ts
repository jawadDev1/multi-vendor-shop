import type {
  IAPIOrder,
  IAPIProduct,
  IAPISellerConversations,
  IAPIShop,
} from "@/types/api";

export interface SELLER_STATE {
  products: IAPIProduct[] | null;
  orders: IAPIOrder[] | null;
  conversations: IAPISellerConversations[] | null;
  loading: boolean;
  error: string | null;
}
