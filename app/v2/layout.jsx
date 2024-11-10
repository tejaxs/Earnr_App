"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen grad md:px-40 px-0">
      <Navbar/>
      <div className="flex-1 overflow-y-auto  pb-20">{children}</div>
      <div className="fixed bottom-0 left-0 w-full z-20  gradient-border md:hidden flex justify-between p-2 px-8">
        <Link href={"/v2/home"}>
          <img
            src={`${pathname == "/v2/home" ? "/homehover.png" : "/home.png"}`}
            alt="."
            className="w-[35px] h-[48px]"
          />
        </Link>
        <Link href={"/v2/creator?cat=All"}>
          <img
            src={`${
              pathname == "/v2/creator" ? "/creatorhover.png" : "/creator.png"
            }`}
            alt="."
            className="w-[35px] h-[48px]"
          />
        </Link>
        <Link href={"/v2/activity?cat=All"}>
          <img
            src={`${
              pathname == "/v2/activity"
                ? "/activityhover.png"
                : "/activity.png"
            }`}
            alt="."
            className="w-[35px] h-[48px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default layout;
