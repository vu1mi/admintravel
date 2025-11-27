import OrderRow from "./OrderRow";

export default function OrderTable() {
  const data = [
    {
      code: "OD0000001",
      customer: {
        name: "Lê Văn A",
        phone: "0123456789",
        note: "Test...",
      },
      tours: [
        {
          name: "Tour Hạ Long",
          image: "/tour.jpg",
          adult: "3 x 1.500.000đ",
          child: "2 x 1.300.000đ",
          baby: "2 x 1.000.000đ",
        },
        {
          name: "Tour Hạ Long",
          image: "/tour.jpg",
          adult: "3 x 1.500.000đ",
          child: "2 x 1.300.000đ",
          baby: "2 x 1.000.000đ",
        },
      ],
      payment: {
        total: "10.000.000đ",
        discount: "400.000đ",
        code: "TOURMUAHE2024",
        final: "9.600.000đ",
        method: "Ví Momo",
        status: "Đã thanh toán",
      },
      status: "Khởi tạo",
      date: {
        time: "16:20",
        day: "01/01/2024",
      },
    },
  ];

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
          {data.map((order, i) => (
            <OrderRow key={i} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
