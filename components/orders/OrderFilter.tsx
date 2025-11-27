"use client";

import { FiFilter, FiRefreshCcw } from "react-icons/fi";

export default function OrderFilter() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center gap-4">

      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
        <FiFilter /> Bộ lọc
      </button>

      <select className="border px-3 py-2 rounded-lg">
        <option>Trạng thái</option>
        <option>Khởi tạo</option>
        <option>Đang xử lý</option>
        <option>Hoàn tất</option>
      </select>

      <div className="flex items-center gap-2">
        <input type="date" className="border px-3 py-2 rounded-lg" />
        <span>-</span>
        <input type="date" className="border px-3 py-2 rounded-lg" />
      </div>

      <select className="border px-3 py-2 rounded-lg">
        <option>Phương thức thanh toán</option>
        <option>Ví Momo</option>
        <option>Chuyển khoản</option>
      </select>

      <select className="border px-3 py-2 rounded-lg">
        <option>Trạng thái thanh toán</option>
        <option>Đã thanh toán</option>
        <option>Chưa thanh toán</option>
      </select>

      <button className="flex items-center gap-2 text-red-500 px-4 py-2">
        <FiRefreshCcw /> Xóa bộ lọc
      </button>

    </div>
  );
}
