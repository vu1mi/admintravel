type Props = {
  status: number;
};

export default function OrderStatusBadge({ status }: Props) {
  let label = "Khởi tạo";
  let classes = "bg-gray-100 text-gray-600";

  if (status === 1) {
    label = "Đã xác nhận";
    classes = "bg-blue-100 text-blue-600";
  } else if (status === 2) {
    label = "Hoàn thành";
    classes = "bg-green-100 text-green-700";
  } else if (status === 3) {
    label = "Đã hủy";
    classes = "bg-red-100 text-red-600";
  }

  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${classes}`}>
      {label}
    </span>
  );
}
