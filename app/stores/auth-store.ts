import { create } from "zustand";
import { persist } from "zustand/middleware";
import configuration from "~/lib/configuration";
import type { AuthType } from "~/types/auth.type";

export type AuthStoreType =
  | (Pick<AuthType, "username" | "name" | "bophan"> & { token?: string })
  | null;

interface AuthStore {
  // isLoading: boolean;
  user: AuthStoreType;
  login: (user: Pick<AuthType, "username" | "name" | "bophan"> & { token?: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: (user) =>
        set({
          user,
        }),
      logout: () => {
        localStorage.removeItem(configuration().TOKEN_KEY);
        // document.cookie = "accessToken=";
        set({
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
export default useAuthStore;
