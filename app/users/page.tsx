import UserFilter from "@/components/users/UserFilter";
import UserAction from "@/components/users/UserAction";
import UserTable from "@/components/users/UserTable";
import UserPagination from "@/components/users/UserPagination";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý người dùng</h1>

      <UserFilter />
      <UserAction />
      <UserTable />
      <UserPagination />
    </div>
  );
}
