"use client";

import Image from "next/image";
import { MdNotifications } from "react-icons/md";

export default function Header() {
  return (
    <header className="w-full h-16 border-b border-gray-300 bg-white flex items-center justify-between px-6">

      {/* Logo */}
      <div className="text-2xl font-bold flex items-center gap-1">
        <span className="text-blue-600">28</span>
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
          <Image
            src="/avatar.png"
            width={40}
            height={40}
            alt="Avatar"
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">Le Van A</div>
            <div className="text-gray-500 text-sm -mt-1">Admin</div>
          </div>
        </div>

      </div>
    </header>
  );
}
