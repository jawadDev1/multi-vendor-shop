import type { IAPIUserCategory } from "@/types/api";

export interface CATEGORY_STATE {
  categories: IAPIUserCategory[] | null;
  loading: boolean;
  error: string | null;
}
