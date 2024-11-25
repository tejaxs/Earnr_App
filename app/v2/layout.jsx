"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen grad lg:px-40 md:px-10 px-0">
      <Navbar/>
      <div className="flex-1 overflow-y-auto  pb-20">{children}</div>
      <div className="fixed bottom-0 left-0 w-full z-20  gradient-border md:hidden flex justify-between items-center pt-1  px-8">
        <Link href={"/v2/home"} className="flex flex-col gap-1 items-center justify-center">
          <img
            src={`${pathname == "/v2/home" ? "/homehover.png" : "/home.png"}`}
            alt="."
            className="w-[23px] h-[25px]"
          />
          <p className={` poppins-600 text-[10px]`}>Home</p>
        </Link>
        <Link href={"/v2/creator?cat=All"} className="flex flex-col gap-1 items-center justify-center">
          <img
            src={`${
              pathname == "/v2/creator" ? "/creatorhover.png" : "/creator.png"
            }`}
            alt="."
            className="w-[30px] h-[28px]"
          />
          <p className={` poppins-600 text-[10px]`}>Creators</p>
        </Link>
        <Link href={"/v2/activity?cat=My%20Activities"} className="flex flex-col gap-1 items-center justify-center">
          <img
            src={`${
              pathname == "/v2/activity"
                ? "/activityhover.png"
                : "/activity.png"
            }`}
            alt="."
            className="w-[33px] h-[33px]"
          />
          <p className={` poppins-600 text-[10px]`}>Activities</p>
        </Link>
      </div>
    </div>
  );
};

export default layout;
