"use client";
import UserFilter from "@/components/users/UserFilter";
import UserAction from "@/components/users/UserAction";
import UserTable from "@/components/users/UserTable";
import UserEditModal from "@/components/users/UserEditModal";
import { useEffect, useState } from "react";

export interface Role{
    id:number;
    name:string;
    code:number;
    description:string;
}

export interface User{
    id:number;
    name:string;
    email:string;
    phone:string;
    address:string;
    avatar:string;
    status:number;
    availableRoles:Role[];
    currentRole:string;
    roleCode:number
}
export interface DataUsers{
    users:User[];
    currentPage:number;
    totalItems:number;
    totalPAges:number;
    pageSize:number
}
export default function UsersPageClient() {
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [datauser, setDataUser] = useState<DataUsers | undefined>();
  const [ids, setIds] = useState<number[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const baseUrl = "http://localhost:8088/api";
        const trimmedKeyword = keyword.trim();
        const params = new URLSearchParams({
          offset: "0",
          limit: "10",
        });
        if (trimmedKeyword) {
          params.set("keyword", trimmedKeyword);
        }
        if (statusFilter !== "") {
          params.set("status", statusFilter);
        }
        const url = `${baseUrl}/users/search?${params.toString()}`;
        const res = await fetch(url);
        const data = await res.json();
        setDataUser(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchuser();
  }, [reloadKey, keyword, statusFilter]);

  const refreshUsers = () => setReloadKey((prev) => prev + 1);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý người dùng</h1>

      <UserFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <UserAction
        ids={ids}
        setIds={setIds}
        refreshUsers={refreshUsers}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <UserTable
        data={datauser}
        ids={ids}
        setIds={setIds}
        refreshUsers={refreshUsers}
        onEdit={(user) => setEditingUser(user)}
      />
      <UserEditModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        refreshUsers={refreshUsers}
      />
    </div>
  );
}
