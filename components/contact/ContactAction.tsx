"use client";

export default function ContactAction() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center justify-between">

      <div className="flex items-center gap-2">
        <select className="border px-3 py-2 rounded-lg">
          <option>-- Hành động --</option>
          <option>Xóa</option>
        </select>

        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
          Áp dụng
        </button>
      </div>

      <div className="flex items-center gap-2 border px-3 py-2 rounded-lg w-72">
        <span className="text-gray-500">🔍</span>
        <input
          type="text"
          className="flex-1 outline-none"
          placeholder="Tìm kiếm"
        />
      </div>

    </div>
  );
}
