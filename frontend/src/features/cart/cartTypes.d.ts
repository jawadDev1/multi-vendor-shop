import type { ICartItem, IWishlistItem } from "@/types/common";

export interface CART_STATE {
  cart: ICartItem[];
  wishlist: IWishlistItem[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
}
