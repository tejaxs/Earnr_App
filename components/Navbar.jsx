import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const {user} = useAuth();
  return (
    <div className="p-2 md:flex hidden justify-between items-center w-full">
      <img
        className="md:w-[218px] w-[120px] md:h-[62px] h-[38px]"
        src="/earnr_white@4x 1.png"
        alt=""
      />
      <div className="flex gap-20 text-white">
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
        <Link
          href={"https://forms.gle/GFNgJQMgYyRnckvF6"}
          target="_blank"
          className="text-[20px] text-[#FFCE48]  px-2 urbanist-600"
        >
          Be a Creator !
        </Link>
      </div>
      <Link href={"/account"} className="flex items-center">
        <span className="bg-[#f4f3fc6a] px-3 rounded-l-xl">Free</span>
        <img src={user?.photoURL || "/person.png"} alt="" className="relative right-2 w-[36px] h-[36px] rounded-full" />
      </Link>
    </div>
  );
};

export default Navbar;
