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
          className="md:w-[218px] w-[120px] md:h-[62px] h-[38px]"
          src="/earnr_white@4x 1.png"
          alt="Logo"
        />
      </Link>
      <div className="flex gap-12 text-white">
        <Link
          href={"/v2/home"}
          className="text-[20px] hover:border-b border-white px-2 urbanist-500"
        >
          Home
        </Link>
        <Link
          href={"/v2/creator?cat=All"}
          className="text-[20px] hover:border-b border-white px-2 urbanist-500"
        >
          Creator
        </Link>
        <Link
          href={"/v2/activity?cat=All"}
          className="text-[20px] hover:border-b border-white px-2 urbanist-500"
        >
          Activity
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="text-[20px] text-[#FFCE48]  px-2 urbanist-600"
        >
          Be a Creator!
        </button>
      </div>
      <Link href={"/account"} className="flex items-center">
        <span className="bg-[#f4f3fc6a] px-3 rounded-l-xl">Free</span>
        <img
          src={url || "/person.png"}
          alt=""
          className="relative right-2 w-[36px] h-[36px] rounded-full"
        />
      </Link>

      {/* Form Modal */}
      {showModal && <BeCreatorform setShowModal={setShowModal} />}
    </div>
  );
};

export default Navbar;
