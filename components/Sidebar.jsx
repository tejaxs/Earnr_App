"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <div>
      <div className="flex flex-col items-center ">
        <img src="/whitelogo.png" alt="" className=" w-[30px] h-[30px]" />
        <div className="urbanist-800  text-[40px]">
          EA<span className="text-[#8C00FF]">R</span>NR
        </div>
      </div>
      <div className="flex flex-col gap-12 mt-10 text-[24px] px-8">
        <Link
          href={"/v2/home"}
          className={`urbanist-800 flex gap-2 items-center ${
            pathname.includes("home") ? "text-[#8C00FF]" : ""
          }`}
        >
          {pathname.includes("home") ? (
            <img src="/homehover.png" alt=".." className="w-[24px] h-[24px]"/>
          ) : (
            <img src="/home.png" alt=".." className="w-[24px] h-[24px]"/>
          )}
          Home
        </Link>
        <Link
          href={"/v2/creator?cat=All"}
          className={`urbanist-800 flex gap-2 items-center ${
            pathname.includes("creator") ? "text-[#8C00FF]" : ""
          }`}
        >
          {pathname.includes("creator") ? (
            <img src="/creatorhover.png" alt=".." className="w-[24px] h-[24px]"/>
          ) : (
            <img src="/creator.png" alt=".." className="w-[24px] h-[24px]"/>
          )}
          Creators
        </Link>
        <Link
          href={"/v2/activity?cat=My%20Activities"}
          className={`urbanist-800 flex gap-2 items-center ${
            pathname.includes("activity") ? "text-[#8C00FF]" : ""
          }`}
        >
          {pathname.includes("activity") ? (
            <img src="/activityhover.png" alt=".." className="w-[24px] h-[24px]"/>
          ) : (
            <img src="/activity.png" alt=".." className="w-[24px] h-[24px]"/>
          )}
          Activity
        </Link>
        {/* <Link href={"/dashboard/profile"} className={`urbanist-800 ${pathname.includes("profile") ? "text-[#8C00FF]":""}`}>Profile</Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
