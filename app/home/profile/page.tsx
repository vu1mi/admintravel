// src/app/profile/page.tsx
import React from "react";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const ProfilePage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Thông tin cá nhân</h1>

      <div className="bg-white border-gray-300 rounded-2xl shadow-sm p-8">
        <form className="space-y-6">
          {/* Họ tên + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Họ tên">
              <input
                type="text"
                defaultValue="Lê Văn A"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormField>

            <FormField label="Email">
              <input
                type="email"
                defaultValue="levana@gmail.com"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormField>
          </div>

          {/* SĐT + Chức vụ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Số điện thoại">
              <input
                type="text"
                defaultValue="0123456789"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormField>

            <FormField label="Chức vụ">
              <input
                type="text"
                defaultValue="Giám đốc"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormField>
          </div>

          {/* Nhóm quyền */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Nhóm quyền">
              <input
                type="text"
                defaultValue="Quản trị viên"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormField>

            <div /> {/* cột trống để cân layout */}
          </div>

          {/* Ảnh đại diện */}
          <FormField label="Ảnh đại diện">
            <input
              type="file"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
            />
          </FormField>

          {/* Nút hành động */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              type="submit"
              className="w-64 rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Cập nhật
            </button>

            <button
              type="button"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
