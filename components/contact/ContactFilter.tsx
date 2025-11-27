"use client";

import { FiFilter, FiRefreshCcw } from "react-icons/fi";

export default function ContactFilter() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center gap-4">
      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
        <FiFilter /> Bộ lọc
      </button>

      <div className="flex items-center gap-2">
        <input type="date" className="border px-3 py-2 rounded-lg" />
        <span>-</span>
        <input type="date" className="border px-3 py-2 rounded-lg" />
      </div>

      <button className="flex items-center gap-2 text-red-500 px-4 py-2">
        <FiRefreshCcw /> Xóa bộ lọc
      </button>
    </div>
  );
}
