"use client";
import { deleteContact } from "@/app/api/contactApi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { set } from "zod";
interface Props{
  id: number;
  email: string;
  updated_at: number[];
  setRerender: (rerender: boolean) => void
}

export default function ContactRow({id, email, updated_at
,setRerender }: any) {
  const router = useRouter();

  const created = `${updated_at[0]}/${updated_at[1]}/${updated_at[2]}`
  const handleDeleteUsers = async (ids: number) => {
    const ok = confirm("Bạn chắc chắn muốn xóa?");
    if (!ok){
      return ;
    }
    try {
        const res =  await deleteContact(ids);
        setRerender((prev)=>!prev);
      }catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  return (
    <tr className="border-b">
      <td className="p-3">
        <input type="checkbox" />
      </td>

      <td className="p-3 text-center">{email}</td>

      <td className="p-3 text-center">{created}</td>

      <td className="p-3 flex justify-center">
         <button
            onClick={() => handleDeleteUsers(id)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50"
            // aria-label={`Xóa ${user?.name}`}
          >
            <FiTrash2 />
          </button>
      </td>
    </tr>
  );
}
