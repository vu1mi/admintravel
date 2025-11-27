"use client";

import { FiFilter, FiRefreshCcw } from "react-icons/fi";

export default function UserFilter() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex flex-wrap items-center gap-4">
      {/* Bộ lọc */}
      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
        <FiFilter /> Bộ lọc
      </button>

      {/* Trạng thái */}
      <select className="border px-3 py-2 rounded-lg min-w-[140px]">
        <option>Trạng thái</option>
        <option>Hoạt động</option>
        <option>Tạm dừng</option>
      </select>

      {/* Ngày tạo */}
      <div className="flex items-center gap-2">
        <input type="date" className="border px-3 py-2 rounded-lg" />
        <span>-</span>
        <input type="date" className="border px-3 py-2 rounded-lg" />
      </div>

      {/* Xóa bộ lọc */}
      <button className="flex items-center gap-2 text-red-500 px-4 py-2">
        <FiRefreshCcw /> Xóa bộ lọc
      </button>
    </div>
  );
}
