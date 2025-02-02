"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex  text-[14px] justify-between  w-full">
      <Link
        href={"/v2/home"}
        className={`urbanist-800 flex flex-col items-center gap-1 ${
          pathname.includes("home") ? "text-[#8C00FF]" : ""
        }`}
      >
        {pathname.includes("home") ? (
          <img
            src="/homehover.png"
            alt=".."
            className="w-[28px] h-[28px]"
          />
        ) : (
          <img src="/home.png" alt=".." className="w-[28px] h-[28px]" />
        )}
        Home
      </Link>
      <Link
        href={"/v2/creator?cat=All"}
        className={`urbanist-800 flex flex-col items-center gap-1 ${
          pathname.includes("brand") ? "text-[#8C00FF]" : ""
        }`}
      >
        {pathname.includes("creator") ? (
          <img
            src="/creatorhover.png"
            alt=".."
            className="w-[28px] h-[28px]"
          />
        ) : (
          <img
            src="/creator.png"
            alt=".."
            className="w-[28px] h-[28px]"
          />
        )}
        Creators
      </Link>
      <Link
        href={"/v2/activity?cat=My%20Activities"}
        className={`urbanist-800 flex flex-col items-center gap-1 ${
          pathname.includes("activity") ? "text-[#8C00FF]" : ""
        }`}
      >
        {pathname.includes("activity") ? (
          <img
            src="/activityhover.png"
            alt=".."
            className="w-[28px] h-[28px]"
          />
        ) : (
          <img
            src="/activity.png"
            alt=".."
            className="w-[28px] h-[28px]"
          />
        )}
        Activities
      </Link>
      {/* <Link href={"/dashboard/profile"} className={`urbanist-800 ${pathname.includes("profile") ? "text-[#8C00FF]":""}`}>Profile</Link> */}
    </div>
  );
};

export default MobileSidebar;
