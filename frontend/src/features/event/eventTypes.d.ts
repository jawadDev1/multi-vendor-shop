import type { IAPISellerEvent, IAPIShop } from "@/types/api";

export interface EVENT_STATE {
  sellerEvents: IAPISellerEvent[] | null;
  loading: boolean;
  error: string | null;
}
