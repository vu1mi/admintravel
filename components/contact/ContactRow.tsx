// import IconButton from "@/components/shared/IconButton";
import { FiTrash2 } from "react-icons/fi";

export default function ContactRow({ email, created }: any) {
  return (
    <tr className="border-b">
      <td className="p-3">
        <input type="checkbox" />
      </td>

      <td className="p-3">{email}</td>

      <td className="p-3">{created}</td>

      <td className="p-3">
        <div className="flex gap-2">
          {/* <IconButton icon={<FiTrash2 />} color="red" /> */}
        </div>
      </td>
    </tr>
  );
}
