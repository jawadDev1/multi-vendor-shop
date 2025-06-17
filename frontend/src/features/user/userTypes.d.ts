import type { IAPIUser } from "@/types/api";

export interface UserState {
  user: IAPIUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
