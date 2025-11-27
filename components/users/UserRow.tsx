import { FiEdit2, FiTrash2 } from "react-icons/fi";

type UserRowProps = {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  status: string;
};

export default function UserRow({
  name,
  avatar,
  email,
  phone,
  address,
  status,
}: UserRowProps) {
  return (
    <tr className="border-b">
      <td className="p-3">
        <input type="checkbox" />
      </td>

      <td className="p-3">{name}</td>

      <td className="p-3">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      </td>

      <td className="p-3">{email}</td>

      <td className="p-3">{phone}</td>

      <td className="p-3 max-w-xs truncate">{address}</td>

      <td className="p-3">
        <span className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-600">
          {status}
        </span>
      </td>

      <td className="p-3">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border hover:bg-gray-50">
            <FiEdit2 />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50">
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );
}
