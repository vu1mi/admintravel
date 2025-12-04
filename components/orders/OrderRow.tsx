import { useEffect, useState } from "react";
import TourList from "./TourList";
import PaymentInfo from "./PaymentInfo";
import OrderStatusBadge from "./OrderStatusBadge";
import type { Booking } from "@/app/api/bookingApi";
import { getUserById, type UserDetail } from "@/app/api/userApi";
import { updateBookingPaymentStatus } from "@/app/api/bookingApi";

type OrderRowProps = {
  order: Booking;
  onRefresh?: () => void; // ✅ Thêm callback
};

export default function OrderRow({ order, onRefresh }: OrderRowProps) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentStatusState, setPaymentStatusState] = useState<number>(order.paymentStatus);

  const createdAt = order?.created_at
    ? `${order.created_at[0]}-${order.created_at[1]}-${order.created_at[2]} `
    : null;

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      if (!order.userId) return;
      try {
        setLoadingUser(true);
        const data = await getUserById(order.userId);
        if (isMounted) setUser(data);
      } catch (error) {
        console.error("Failed to fetch user for booking", order.id, error);
      } finally {
        if (isMounted) setLoadingUser(false);
      }
    };

    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [order.userId, order.id]);

  const customer = {
    name: user?.name ?? order.customerName,
    phone: user?.phone ?? order.customerPhone,
    note: order.customerNote,
  };

  const paymentInfo = {
    total: order.totalPrice,
    discount: order.discount,
    final: order.finalPrice,
    method: order.paymentMethodName,
    status: paymentStatusState,
  };

  // ✅ Function để cập nhật trạng thái và refetch
  const handleUpdateStatus = async (newStatus: number) => {
    try {
      await updateBookingPaymentStatus(order.id, newStatus);
      setPaymentStatusState(newStatus);
      setShowModal(false);
      
      // ✅ Gọi refetch sau khi cập nhật thành công
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to update payment status", err);
      alert("Không thể cập nhật trạng thái thanh toán");
    }
  };

  return (
    <tr className="border-b hover:border-b-4 hover:border-b-blue-300 hover:bg-blue-100">
      <td className="p-3 text-blue-600 font-semibold">BK{order.id.toString().padStart(6, "0")}</td>

      <td className="p-3">
        Họ tên: {customer.name}
        <br />
        SĐT: {customer.phone}
        <br />
        Ghi chú: {customer.note}
        {loadingUser && (
          <div className="text-xs text-gray-400 mt-1">Đang tải thông tin user...</div>
        )}
      </td>

      <td className="p-3">
        <TourList tours={order.items} />
      </td>

      <td className="p-3">
        <PaymentInfo info={paymentInfo} />
      </td>

      <td className="p-3">
        <OrderStatusBadge status={paymentStatusState} />
      </td>

      <td className="p-3 text-blue-600 font-semibold">
        {createdAt}     
      </td>

      <td className="p-3 relative">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-700"
        >
          Sửa đổi 
        </button>
        
        {showModal && (
          <div className="fixed inset-0 bg-black/40 z-40">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-[280px] bg-white rounded-xl shadow-xl z-50">
              
              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3">
                <h3 className="font-semibold text-gray-700">Trạng thái đơn hàng</h3>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3 p-4">
                <button
                  onClick={() => handleUpdateStatus(1)} // ✅ Sử dụng function mới
                  className="py-2 rounded-md bg-green-200 text-green-500
                             hover:bg-green-300 transition"
                >
                  Đã thanh toán
                </button>

                <button
                  onClick={() => handleUpdateStatus(0)} // ✅ Sử dụng function mới
                  className="py-2 rounded-md bg-yellow-200 text-yellow-500
                             hover:bg-yellow-300 transition"
                >
                  Chưa thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}