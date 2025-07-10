import type { IAPIUser } from "@/types/api";

export interface UserState {
  user: IAPIUser | null;
  loading: boolean;
  userLoaded: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
