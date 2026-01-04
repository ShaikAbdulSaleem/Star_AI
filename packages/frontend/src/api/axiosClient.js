// frontend/src/api/axiosClient.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false
});

// Attach JWT from localStorage (or your AuthContext) to every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

