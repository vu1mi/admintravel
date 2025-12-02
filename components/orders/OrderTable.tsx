import OrderRow from "./OrderRow";
import type { Booking } from "@/app/api/bookingApi";

type OrderTableProps = {
  bookings: Booking[];
};

export default function OrderTable({ bookings }: OrderTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3">Mã</th>
            <th className="p-3">Thông tin khách</th>
            <th className="p-3">Danh sách tour</th>
            <th className="p-3">Thanh toán</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Ngày đặt</th>
            <th className="p-3">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
