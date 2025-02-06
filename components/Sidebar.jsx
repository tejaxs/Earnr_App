"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import HowToUse from "./UI/HowToUse";

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed: ", err.message);
    }
  };
  const modalRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false); // Close modal if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick); // Listen for clicks
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup event listener
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center ">
        <img src="/whitelogo.png" alt="" className=" w-[30px] h-[30px]" />
        <div className="urbanist-800  text-[40px]">
          EA<span className="text-[#8C00FF]">R</span>NR
        </div>
      </div>
      <div className="flex flex-col gap-12 mt-10 text-[24px] px-4">
        <Link
          href={"/v2/home"}
          className={`urbanist-800 flex gap-2 items-center ${
            pathname.includes("home") ? "text-[#8C00FF]" : ""
          }`}
        >
          {pathname.includes("home") ? (
            <img src="/homehover.png" alt=".." className="w-[24px] h-[24px]" />
          ) : (
            <img src="/home.png" alt=".." className="w-[24px] h-[24px]" />
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
            <img
              src="/creatorhover.png"
              alt=".."
              className="w-[24px] h-[24px]"
            />
          ) : (
            <img src="/creator.png" alt=".." className="w-[24px] h-[24px]" />
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
            <img
              src="/activityhover.png"
              alt=".."
              className="w-[24px] h-[24px]"
            />
          ) : (
            <img src="/activity.png" alt=".." className="w-[24px] h-[24px]" />
          )}
          Activity
        </Link>
        <Link
          href={"/account"}
          className={`urbanist-800 flex gap-2 items-center ${
            pathname.includes("account") ? "text-[#8C00FF]" : ""
          }`}
        >
          {pathname.includes("account") ? (
            <img
              src="/accountcolor.png"
              alt=".."
              className="w-[24px] h-[24px]"
            />
          ) : (
            <img src="/account.png" alt=".." className="w-[24px] h-[24px]" />
          )}
          Account
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className={`urbanist-800 flex gap-2 items-center`}
        >
          <img src="/question.png" alt=".." className="w-[24px] h-[24px]" />
          How to Use
        </button>
        <button
          onClick={handleLogout}
          className={`urbanist-800 flex gap-2 items-center`}
        >
          <img src="/logout.png" alt=".." className="w-[24px] h-[24px]" />
          Logout
        </button>

        {/* <Link href={"/dashboard/profile"} className={`urbanist-800 ${pathname.includes("profile") ? "text-[#8C00FF]":""}`}>Profile</Link> */}
      </div>
      {showModal && (
        <HowToUse modalRef={modalRef} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Sidebar;
