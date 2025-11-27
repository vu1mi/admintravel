import OrderFilter from "@/components/orders/OrderFilter";
import OrderSearch from "@/components/orders/OrderSearch";
import OrderTable from "@/components/orders/OrderTable";
import OrderPagination from "@/components/orders/OrderPagination";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>

      <OrderFilter />
      <OrderSearch />
      <OrderTable />
      <OrderPagination />
    </div>
  );
}
