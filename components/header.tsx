"use client";

import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { useAppContext } from "@/app/AppProvider";
import { getUserById, UserDetail } from "@/app/api/userApi";

export default function Header() {
  const { userId } = useAppContext();
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (userId) {
      getUserById(parseInt(userId))
        .then((data) => setUser(data))
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, [userId]);

  return (
    <header className="w-full h-16 border-b border-gray-300 bg-white flex items-center fixed top-0  justify-between px-6 z-10">

      {/* Logo */}
      <div className="text-2xl font-bold flex items-center gap-1">
        <span className="text-blue-600">TRAVEL</span>
        <span>Admin</span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <MdNotifications size={28} className="text-blue-600" />
          <span className="
            absolute -top-1 -right-1
            bg-red-500 text-white text-xs
            rounded-full px-1.5 py-0.5
          ">
            6
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${(() => {
              const colors = [
                "bg-amber-200",
                "bg-blue-200",
                "bg-emerald-200",
                "bg-purple-200",
                "bg-pink-200",
                "bg-teal-200",
              ];
              const index = (user?.id || 0) % colors.length;
              return colors[index];
            })()}`}
          >
            {user?.name ? user.name[0].toUpperCase() : "?"}
          </div>
          <div>
            <div className="font-semibold">{user?.name || "Loading..."}</div>
            <div className="text-gray-500 text-sm -mt-1">{user?.roleName || ""}</div>
          </div>
        </div>

      </div>
    </header>
  );
}
