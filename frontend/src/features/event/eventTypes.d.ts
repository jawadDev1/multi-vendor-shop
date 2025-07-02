import type { IAPISellerEvent, IAPIShop, IAPIUserEvent } from "@/types/api";

export interface EVENT_STATE {
  sellerEvents: IAPISellerEvent[] | null;
  loading: boolean;
  error: string | null;
  popular_event: IAPIUserEvent | null;
}
