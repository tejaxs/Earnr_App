"use client";
import MobileSidebar from "@/components/MobileSidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="md:flex md:h-screen">
      <div className="w-56 p-2 border-r border-[#ffffff98] pt-10 md:block hidden">
        <Sidebar />
      </div>
      <div className="flex-1  overflow-y-auto md:mb-0 mb-20">{children}</div>
      <div className="fixed bottom-0 left-0 w-full z-20  md:hidden flex justify-between items-center py-4 bg-[#1E1E1E]  px-8">
        <MobileSidebar />
      </div>
    </div>
  );
};

export default layout;
