// src/app/api/adminApi.ts
// Service để gọi API backend Spring Boot cho Admin Accounts Management

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

export interface RoleDTO {
  id: number;
  name: string;
  code: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  status: number;
  availableRoles: RoleDTO[];
  currentRole: RoleDTO;
  roleCode: string;
}

export interface UserListResponse {
  users: UserResponse[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}

export interface AdminCreateRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  avatar?: string;
  status: number;
  roleCode: string;
  roles: RoleDTO[];
}

export interface AdminUpdateRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  status: number;
  roleCode: string;
  roles: RoleDTO[];
}

export interface AdminFilterRequest {
  keyword?: string;
  status?: number;
  roleId?: number;
  startDate?: string;
  endDate?: string;
}

// ============== API FUNCTIONS ==============

/**
 * Lấy danh sách admin accounts với filters và pagination
 */
export const getAdminAccounts = async (
  filters: AdminFilterRequest,
  offset: number = 0,
  limit: number = 10
) => {
  console.log("🚀 Calling getAdminAccounts API:", { filters, offset, limit });
  return api.get<UserListResponse>("/users/admins/search", {
    params: {
      ...filters,
      offset,
      limit,
    },
  });
};

/**
 * Lấy chi tiết một admin account theo ID
 */
export const getAdminById = async (id: number) => {
  console.log("🚀 Calling getAdminById API:", id);
  return api.get<UserResponse>(`/users/${id}`);
};

/**
 * Tạo admin account mới
 */
export const createAdmin = async (data: AdminCreateRequest) => {
  console.log("🚀 Calling createAdmin API:", data);
  return api.post<UserResponse>("/users", data);
};

/**
 * Cập nhật admin account
 */
export const updateAdmin = async (id: number, data: AdminUpdateRequest) => {
  console.log("🚀 Calling updateAdmin API:", id, data);
  return api.put<UserResponse>(`/users/${id}`, data);
};

/**
 * Xóa một admin account
 */
export const deleteAdmin = async (id: number) => {
  console.log("🚀 Calling deleteAdmin API:", id);
  return api.delete("/users", {
    data: [id],
  });
};

/**
 * Xóa nhiều admin accounts cùng lúc
 */
export const deleteMultipleAdmins = async (ids: number[]) => {
  console.log("🚀 Calling deleteMultipleAdmins API:", ids);
  return api.delete("/users", {
    data: ids,
  });
};

// Export axios instance nếu cần custom requests
export { api };
