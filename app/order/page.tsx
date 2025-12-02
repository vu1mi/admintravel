"use client";
import OrderFilter from "@/components/orders/OrderFilter";
import OrderSearch from "@/components/orders/OrderSearch";
import OrderTable from "@/components/orders/OrderTable";
import OrderPagination from "@/components/orders/OrderPagination";
import { useEffect, useState } from "react";
import { getBookings, type BookingListResponse } from "@/app/api/bookingApi";

export default function OrdersPage() {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<BookingListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getBookings(currentPage - 1, limit);
        setData(res);
        setTotalItems(res.totalItems);
        setTotalPages(res.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>

      <OrderSearch />

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <OrderTable bookings={data?.data ?? []} />

      <div className="section-7 mt-4">
        <span className="inner-label">
          {loading
            ? "Đang tải..."
            : `Hiển thị ${Math.min(
                (currentPage - 1) * limit + 1,
                totalItems
              )} - ${Math.min(currentPage * limit, totalItems)} của ${totalItems}`}
        </span>
        <select
          className="inner-pagination"
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
          aria-label="Chọn trang đơn hàng"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Trang {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
