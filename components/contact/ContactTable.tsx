import ContactRow from "./ContactRow";

export default function ContactTable() {
  const data = [
    {
      email: "levana@gmail.com",
      created: "16:40 - 12/12/2024",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3"></th>
            <th className="p-3">Email</th>
            <th className="p-3">Ngày tạo</th>
            <th className="p-3">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <ContactRow key={i} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
