import TourList from "./TourList";
import PaymentInfo from "./PaymentInfo";
import OrderStatusBadge from "./OrderStatusBadge";
// import IconButton from "@/components/shared/IconButton";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function OrderRow({ order }: any) {
  return (
    <tr className="border-b">
      <td className="p-3 text-blue-600 font-semibold">{order.code}</td>

      <td className="p-3">
        Họ tên: {order.customer.name}<br />
        SĐT: {order.customer.phone}<br />
        Ghi chú: {order.customer.note}
      </td>

      <td className="p-3">
        <TourList tours={order.tours} />
      </td>

      <td className="p-3">
        <PaymentInfo info={order.payment} />
      </td>

      <td className="p-3">
        <OrderStatusBadge status={order.status} />
      </td>

      <td className="p-3">
        {order.date.time}<br />
        {order.date.day}
      </td>

      <td className="p-3">
        <div className="flex gap-2">
          {/* <IconButton icon={<FiEdit2 />} color="blue" />
          <IconButton icon={<FiTrash2 />} color="red" /> */}
        </div>
      </td>
    </tr>
  );
}
