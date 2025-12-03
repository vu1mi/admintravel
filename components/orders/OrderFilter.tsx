"use client";

import { FaFilter, FaRotateLeft } from "react-icons/fa6";

interface Props {
  status: number | undefined;
  setStatusPayment: React.Dispatch<React.SetStateAction<number | undefined>>;
  dateFrom?: string | undefined;
  dateTo?: string | undefined;
  setDateFrom?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDateTo?: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchName?: string | undefined;
  setSearchName?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function OrderFilter({
  status,
  setStatusPayment,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  searchName,
  setSearchName,
}: Props) {
  const handleDelete = () => {
    setStatusPayment(undefined);
    setDateFrom && setDateFrom(undefined);
    setDateTo && setDateTo(undefined);
    setSearchName && setSearchName(undefined);
  };

  return (
    <div className="section-4 mb-4">
      <div className="inner-wrap flex items-center gap-3 flex-wrap">
        <div className="inner-item inner-label flex items-center gap-2 font-semibold">
          <FaFilter /> Bộ lọc
        </div>

        {/* Filter theo trạng thái */}
        <div className="inner-item">
          <select
            value={status !== undefined ? String(status) : ""}
            onChange={(e) => {
              const v = e.currentTarget.value;
              setStatusPayment(v === "" ? undefined : parseInt(v));
            }}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="0">Chưa thanh toán</option>
            <option value="1">Đã thanh toán</option>
          </select>
        </div>

        {/* Filter theo ngày tạo */}
        <div className="inner-item flex items-center gap-2">
          <input
            type="date"
            placeholder="Từ ngày"
            value={dateFrom ?? ""}
            onChange={(e) => setDateFrom && setDateFrom(e.target.value || undefined)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-500">→</span>
          <input
            type="date"
            placeholder="Đến ngày"
            value={dateTo ?? ""}
            onChange={(e) => setDateTo && setDateTo(e.target.value || undefined)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tìm kiếm theo tên khách hàng */}
        <div className="inner-item">
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng..."
            value={searchName ?? ""}
            onChange={(e) => setSearchName && setSearchName(e.target.value || undefined)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          />
        </div>

        {/* Nút xóa filter */}
        <button
          onClick={handleDelete}
          className="inner-item inner-reset flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
        >
          <FaRotateLeft /> Xóa bộ lọc
        </button>
      </div>
    </div>
  );
}