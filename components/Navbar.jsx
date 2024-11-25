"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BeCreatorform from "./BeCreatorform";

const Navbar = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUrl(user?.photoURL);
  }, [user?.photoURL]);

  return (
    <div className="p-2 md:flex hidden justify-between items-center w-full">
      <Link href={"/v2/home"}>
        <img
          className="lg:w-[218px] md:w-[120px] lg:h-[62px] md:h-[40px]"
          src="/earnr_white@4x 1.png"
          alt="Logo"
        />
      </Link>
      <div className="flex lg:gap-12 md:gap-8 text-white">
        <Link
          href={"/v2/home"}
          className="lg:text-[20px] text-[15px] hover:border-b border-white px-2 urbanist-500"
        >
          Home
        </Link>
        <Link
          href={"/v2/creator?cat=All"}
          className="lg:text-[20px] text-[15px]] hover:border-b border-white px-2 urbanist-500"
        >
          Creator
        </Link>
        <Link
          href={"/v2/activity?cat=My%20Activities"}
          className="lg:text-[20px] text-[15px] hover:border-b border-white px-2 urbanist-500"
        >
          Activity
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="lg:text-[20px] text-[15px] text-[#FFCE48]  px-2 urbanist-600"
        >
          Be a Creator!
        </button>
        
      </div>
      <Link href={"/account"} className="flex items-center">
        <span className="bg-[#f4f3fc6a] px-3 rounded-l-xl">Free</span>
        <img
          src={url || "/person.png"}
          alt=""
          className="relative bg-black right-2 w-[36px] h-[36px] rounded-full"
        />
      </Link>

      {/* Form Modal */}
      {showModal && <BeCreatorform setShowModal={setShowModal} />}
    </div>
  );
};

export default Navbar;
