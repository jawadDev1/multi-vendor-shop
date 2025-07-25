import type { IAPIUser } from "@/types/api";
import { getApiRequest } from "@/utils/api";
import { create } from "zustand";

interface UserState {
  user: IAPIUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  userLoaded: boolean;
}

export interface UserActions {
  updateUser: (user: IAPIUser | null) => void;
  loadUser: () => void;
}

export type UserStore = UserState & UserActions;

const defaultInitialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  userLoaded: false,
};

export const useUserStore = create<UserStore>((set ) => ({
  ...defaultInitialState,
  updateUser: (user) => {
      if(!user) {
        set(() => ({ user, isAuthenticated: false }));
        return;
      }
      set(() => ({ user, isAuthenticated: true }));
  },
  loadUser: async () => {
    set(() => ({ loading: true }));
    const result = await getApiRequest("user/getuser");
    set(() => ({ loading: false, userLoaded: true }));

    if (!result.success) {
      return;
    }

    set(() => ({ user: result?.data, isAuthenticated: true }));
  },
}));
