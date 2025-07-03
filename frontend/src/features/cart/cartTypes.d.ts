import type { ICartItem } from "@/types/common";

export interface CART_STATE {
  cart: ICartItem[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
}
