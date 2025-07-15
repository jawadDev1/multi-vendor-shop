import type { IAPIUser, IAPIUserConversations } from "@/types/api";

export interface UserState {
  user: IAPIUser | null;
  conversations: IAPIUserConversations[];
  loading: boolean;
  userLoaded: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
