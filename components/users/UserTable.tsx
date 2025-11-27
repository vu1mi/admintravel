import UserRow from "./UserRow";

export default function UserTable() {
  const users = [
    {
      name: "Lê Văn A",
      avatar: "/tour-halongsample.jpg", // hoặc avatar riêng của user
      email: "levana@gmail.com",
      phone: "01234567890",
      address: "Số 123, đường ABC, ...",
      status: "Hoạt động",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 w-10">
              <input type="checkbox" />
            </th>
            <th className="p-3">Họ tên</th>
            <th className="p-3">Ảnh đại diện</th>
            <th className="p-3">Email</th>
            <th className="p-3">Số điện thoại</th>
            <th className="p-3">Địa chỉ</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <UserRow key={i} {...u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
