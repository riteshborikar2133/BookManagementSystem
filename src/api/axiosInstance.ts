// src/api/axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */

axiosInstance.interceptors.request.use(
  (config) => {
    // Example for token
    // const token = localStorage.getItem("token");

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    console.log("API Request:", config.method?.toUpperCase(), config.url);

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

/* ================= RESPONSE INTERCEPTOR ================= */

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data);

    return response;
  },

  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    return Promise.reject(error);
  },
);

export default axiosInstance;
