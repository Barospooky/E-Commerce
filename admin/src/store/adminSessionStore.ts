import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../api/auth";

interface AdminSessionState {
  accessToken: string | null;
  user: AuthUser | null;
  setSession: (accessToken: string, user: AuthUser) => void;
  clearSession: () => void;
}

export const useAdminSessionStore = create<AdminSessionState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: (accessToken, user) => set({ accessToken, user }),
      clearSession: () => set({ accessToken: null, user: null })
    }),
    {
      name: "admin-session"
    }
  )
);
