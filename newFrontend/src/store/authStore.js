import { create } from "zustand";
import api from "../services/api";
export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("accessToken"),
  loading: false,
  login: async (credentials) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/auth/login", credentials);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      set({ user: data.user, token: data.accessToken, loading: false });
      return data;
    } finally {
      set({ loading: false });
    }
  },
  register: async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    set({ user: data.user || null, token: data.accessToken || null });
    return data;
  },
  hydrate: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data.user, token });
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      set({ user: null, token: null });
    }
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ user: null, token: null });
  },
}));
