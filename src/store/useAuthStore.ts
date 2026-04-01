import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userEmail: null,
  login: (email, token) => {
    localStorage.setItem("accessToken", token);
    set({ isLoggedIn: true, userEmail: email });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isLoggedIn: false, userEmail: null });
  },
}));
