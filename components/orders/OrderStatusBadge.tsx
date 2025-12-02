type Props = {
  status: number;
};

export default function OrderStatusBadge({ status }: Props) {
  let label = "Không rõ";
  let classes = "bg-gray-100 text-gray-600";

  if (status === 0) {
    label = "Chưa thanh toán";
    classes = "bg-orange-100 text-orange-600";
  } else if (status === 1) {
    label = "Đã thanh toán";
    classes = "bg-green-100 text-greengreen-600";
  } 

  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${classes}`}>
      {label}
    </span>
  );
}
