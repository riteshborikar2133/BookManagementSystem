// src/store/useAuthStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  login: (username: string, password: string) => boolean;

  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      isAuthenticated: false,

      login: (username, password) => {
        // Dummy Credentials
        if (username === "admin" && password === "admin") {
          set({
            user: {
              username: "admin",
            },
            isAuthenticated: true,
          });

          return true;
        }

        return false;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
