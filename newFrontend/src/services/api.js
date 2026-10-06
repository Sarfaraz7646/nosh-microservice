import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
let refreshing = null;
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      localStorage.getItem("refreshToken")
    ) {
      original._retry = true;
      try {
        refreshing ??= axios.post(`${baseURL}/auth/refresh`, {
          refreshToken: localStorage.getItem("refreshToken"),
        });
        const { data } = await refreshing;
        refreshing = null;
        localStorage.setItem("accessToken", data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (e) {
        refreshing = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
    return Promise.reject(error);
  },
);
export default api;
