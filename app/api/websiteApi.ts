// src/api/websiteApi.ts
// Service để gọi API backend Spring Boot cho Website Settings

import axios from "axios";

// Lấy URL từ environment variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088/api";

// Tạo axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor để thêm token (nếu có)
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage nếu có
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("sessionToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor để handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(
      `❌ API Error: ${error.config?.url}`,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// ============== TYPES ==============

export interface WebsiteSettingResponse {
  id: number;
  websiteName: string;
  phone: string;
  email: string;
  address: string;
}

export interface WebsiteSettingRequest {
  websiteName: string;
  phone: string;
  email: string;
  address: string;
}

// ============== API FUNCTIONS ==============

/**
 * Lấy thông tin website settings
 */
export const getWebsiteSettings = async () => {
  console.log("🚀 Calling getWebsiteSettings API");
  return api.get<WebsiteSettingResponse>("/website-settings");
};

/**
 * Cập nhật thông tin website settings
 */
export const updateWebsiteSettings = async (data: WebsiteSettingRequest) => {
  console.log("🚀 Calling updateWebsiteSettings API:", data);
  return api.put<WebsiteSettingResponse>("/website-settings", data);
};

// Export axios instance nếu cần custom requests
export { api };
