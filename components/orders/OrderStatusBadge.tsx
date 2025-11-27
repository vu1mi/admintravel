export default function OrderStatusBadge({ status }: { status: string }) {
  const classes = {
    "Khởi tạo": "bg-orange-100 text-orange-600",
    "Đang xử lý": "bg-blue-100 text-blue-600",
    "Hoàn tất": "bg-green-100 text-green-600",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${classes[status]}`}>
      {status}
    </span>
  );
}
