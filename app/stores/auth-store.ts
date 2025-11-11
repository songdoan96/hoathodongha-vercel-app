import { create } from "zustand";
import type { AuthType } from "~/types/auth-type";
import { persist } from "zustand/middleware";
import configuration from "~/lib/configuration";
interface AuthState {
  user: Omit<AuthType, "password"> | undefined;
  login: (user: Omit<AuthType, "password">) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      login: (user: Omit<AuthType, "password">) => set({ user }),
      logout: () => {
        localStorage.removeItem(configuration().TOKEN_KEY);
        set({ user: undefined });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: {
          username: state.user?.username,
          name: state.user?.name,
          bophan: state.user?.bophan,
        },
      }),
    }
  )
);

export default useAuthStore;
