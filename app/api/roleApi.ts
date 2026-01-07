// src/api/roleApi.ts
// Service để gọi API backend Spring Boot cho Role Management

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

export interface PermissionResponse {
  id: number;
  code: string;
  name: string;
  module: string;
  description: string;
}

export interface PermissionGroupResponse {
  module: string;
  moduleName: string;
  permissions: PermissionResponse[];
}

export interface RoleResponse {
  id: number;
  name: string;
  code: string;
  description: string;
  permissions: PermissionResponse[];
}

export interface RoleListResponse {
  roles: RoleResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  limit: number;
}

export interface RoleRequest {
  name: string;
  code: string;
  description: string;
  permissionIds: number[];
}

// ============== API FUNCTIONS ==============

/**
 * Lấy tất cả permissions được nhóm theo module
 */
export const getAllPermissions = async () => {
  console.log("🚀 Calling getAllPermissions API");
  return api.get<PermissionGroupResponse[]>("/roles/permissions");
};

/**
 * Lấy danh sách roles với pagination và search
 */
export const getRoles = async (
  keyword?: string,
  page: number = 0,
  limit: number = 10
) => {
  console.log("🚀 Calling getRoles API:", { keyword, page, limit });
  return api.get<RoleListResponse>("/roles", {
    params: {
      keyword: keyword || undefined,
      page,
      limit,
    },
  });
};

/**
 * Lấy chi tiết một role theo ID
 */
export const getRoleById = async (id: number) => {
  console.log("🚀 Calling getRoleById API:", id);
  return api.get<RoleResponse>(`/roles/${id}`);
};

/**
 * Tạo role mới
 */
export const createRole = async (data: RoleRequest) => {
  console.log("🚀 Calling createRole API:", data);
  return api.post<RoleResponse>("/roles", data);
};

/**
 * Cập nhật role
 */
export const updateRole = async (id: number, data: RoleRequest) => {
  console.log("🚀 Calling updateRole API:", id, data);
  return api.put<RoleResponse>(`/roles/${id}`, data);
};

/**
 * Xóa một role
 */
export const deleteRole = async (id: number) => {
  console.log("🚀 Calling deleteRole API:", id);
  return api.delete(`/roles/${id}`);
};

/**
 * Xóa nhiều roles cùng lúc
 */
export const deleteMultipleRoles = async (ids: number[]) => {
  console.log("🚀 Calling deleteMultipleRoles API:", ids);
  return api.delete("/roles/batch", {
    params: { ids },
    paramsSerializer: {
      indexes: null, // Để gửi array params đúng format
    },
  });
};

// Export axios instance nếu cần custom requests
export { api };
