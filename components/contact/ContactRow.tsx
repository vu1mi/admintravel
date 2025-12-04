
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ContactRow({ email, updated_at
, }: any) {

  const created = `${updated_at[0]}/${updated_at[1]}/${updated_at[2]}`
  return (
    <tr className="border-b">
      <td className="p-3">
        <input type="checkbox" />
      </td>

      <td className="p-3 text-center">{email}</td>

      <td className="p-3 text-center">{created}</td>

      <td className="p-3 flex justify-center">
         <button
            // onClick={() => handleDeleteUsers([user.id])}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50"
            // aria-label={`Xóa ${user?.name}`}
          >
            <FiTrash2 />
          </button>
      </td>
    </tr>
  );
}
