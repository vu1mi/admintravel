import { useEffect, useState } from "react";
import TourList from "./TourList";
import PaymentInfo from "./PaymentInfo";
import OrderStatusBadge from "./OrderStatusBadge";
import type { Booking } from "@/app/api/bookingApi";
import { getUserById, type UserDetail } from "@/app/api/userApi";

type OrderRowProps = {
  order: Booking;
};

export default function OrderRow({ order }: OrderRowProps) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const createdAt = order.createdAt ? new Date(order.createdAt) : null;
  const time = createdAt
    ? createdAt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    : "";
  const day = createdAt
    ? createdAt.toLocaleDateString("vi-VN")
    : "";

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
    status: order.paymentStatus,
  };

  return (
    <tr className="border-b">
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
        <OrderStatusBadge status={order.paymentStatus} />
      </td>

      <td className="p-3">
        {time}
        <br />
        {day}
      </td>

      <td className="p-3">
        <div className="flex gap-2" />
      </td>
    </tr>
  );
}
