"use client";
import { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { DataUsers, User } from "@/app/users/userclient";

interface Propsuser{
  data: DataUsers | undefined;
  ids: number[];
  setIds: React.Dispatch<React.SetStateAction<number[]>>;
  refreshUsers: () => void;
  onEdit: (user: User) => void;
}

export default function UserTable({ data, ids, setIds, refreshUsers, onEdit }: Propsuser) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 10;

    useEffect(() => {
      if (data) {
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPAges);
        setCurrentPage(data.currentPage);
      }
    }, [data]);

    const allVisibleIds = data?.users.map((u) => u.id) ?? [];
    const isAllChecked =
      allVisibleIds.length > 0 &&
      allVisibleIds.every((id) => ids.includes(id));

    const handleToggleAll = (checked: boolean) => {
      if (!allVisibleIds.length) return;
      if (checked) {
        // chọn tất cả user đang hiển thị
        setIds(allVisibleIds);
      } else {
        // bỏ chọn tất cả user đang hiển thị
        setIds((prev) => prev.filter((id) => !allVisibleIds.includes(id)));
      }
    };
  
    

  return (
    <>
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 w-10">
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={(e) => handleToggleAll(e.target.checked)}
                aria-label="Chọn tất cả người dùng trong trang"
              />
            </th>
            <th className="p-3">Họ tên</th>
            <th className="p-3">Ảnh đại diện</th>
            <th className="p-3">Email</th>
            <th className="p-3">Số điện thoại</th>
            <th className="p-3">Địa chỉ</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {data?.users.map((u, i) => (
            <UserRow
              key={i}
              user={u}
              ids={ids}
              setIds={setIds}
              refreshUsers={refreshUsers}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>

       
    </div>
       <div className="section-7 mt-5">
        <span className="inner-label">
          Hiển thị {Math.min((currentPage - 1) * limit + 1, totalItems)} -{" "}
          {Math.min(currentPage * limit, totalItems)} của {totalItems}
        </span>
        <select
          className="inner-pagination"
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Trang {page}
            </option>
          ))}
        </select>
      </div>
      </>
  );
}
