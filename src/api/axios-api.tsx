import axios from "axios";
import { globalLogout } from "@/context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Unauthorized — token may be expired.");

      if (globalLogout) {
        globalLogout();
      } else {
        // fallback
        localStorage.removeItem("jwt");
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  },
);

export default api;
