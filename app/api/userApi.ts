const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8088/api";

const USERS_ENDPOINT = `${API_BASE_URL}/users`;

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  avatar?: string;
  status: number;
  roleName?: string;
  roleCode?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type UpdateUserPayload = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  status?: number;
};

export const deleteUsers = async (ids: number[]) => {
  const res = await fetch(USERS_ENDPOINT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Delete users failed");
  }

  return res.status;
};

export const updateUser = async (id: number, payload: UpdateUserPayload) => {
  const res = await fetch(`${USERS_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Update user failed");
  }

  return res.json();
};

export const getUserById = async (id: number): Promise<UserDetail> => {
  const res = await fetch(`${USERS_ENDPOINT}/${id}`);
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Get user failed");
  }
  return res.json();
};

export const getCurrentUser = async (): Promise<UserDetail> => {
  // Get userId from cookie
  const userId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userId="))
    ?.split("=")[1];

  if (!userId) {
    throw new Error("User not logged in");
  }

  return getUserById(parseInt(userId));
};

export const changePassword = async (
  id: number,
  payload: ChangePasswordPayload
): Promise<string> => {
  const res = await fetch(`${USERS_ENDPOINT}/change-password/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Change password failed");
  }

  return res.text();
};


