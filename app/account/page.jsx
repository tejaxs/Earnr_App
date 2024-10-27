"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { auth } from "@/firebase/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Account = () => {
  const {user} = useAuth()
  const [value, setValue] = useState(300);
  const minValue = 200;
  const maxValue = 800;
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Logout failed: ", err.message);
    }
  };
  const handleBack = () => {
    router.back();
  };
  console.log(router);

  return (
    <div className="w-full min-h-screen grad md:px-40 px-0 text-white flex flex-col items-center">
      <Navbar />
      <ProtectedRoute>
        <div className="md:w-7/12 w-full">
          <button
            onClick={handleBack}
            className="border border-white rounded-full p-1 m-2 md:hidden"
          >
            <img src="/back.png" alt="" className="w-[14px] h-[14px]" />
          </button>
          <div className="flex justify-center mt-4">
          <img src={user?.photoURL || "/person.png"} alt="" className="relative right-2 w-[126px] h-[126px] rounded-full" />
          </div>
          <div className="flex justify-center text-[18px] poppins-600 relative top-6">
            <div className="flex gap-4 p-2 px-4 rounded-3xl bg-[#1B1A18]">
              <div className="flex gap-2 items-center">
                <div className="border-2 border-white rounded-full px-2">£</div>
                <p>500</p>
              </div>
              <div>|</div>
              <div>Level 5</div>
            </div>
          </div>
          <div className="bg-[#1C1B19] pt-4 px-3 pb-4">
            <div className="w-full flex flex-col items-center mt-10 ">
              <input
                type="range"
                min={minValue}
                max={maxValue}
                value={value}
                className="custom-slider"
                style={{
                  background: `linear-gradient(to right, #d4a054 ${percentage}%, #e0e0e0 ${percentage}%)`,
                }}
              />
              <div className="w-full flex justify-between poppins-600 ">
                <span>£ {minValue}</span>
                <span>£ {maxValue}</span>
              </div>
            </div>
            <div className="h-[1px] mt-6 w-full bg-[#CACACA]"></div>
            <div className="mt-6">
              <h2 className="poppins-600 text-[18px] text-[#CACACA]">
                Account Settings
              </h2>
              <div className="poppins-600 flex flex-col gap-3 mt-2">
                <Link href={""} className="flex items-center justify-between">
                  {" "}
                  <p>Edit Profile</p>
                  <img
                    src="/front.png"
                    alt=""
                    className="w-[7px] h-[12px]"
                  />{" "}
                </Link>

                <Link href={""} className="flex items-center justify-between">
                  {" "}
                  <p>Change Password</p>
                  <img
                    src="/front.png"
                    alt=""
                    className="w-[7px] h-[12px]"
                  />{" "}
                </Link>
              </div>
            </div>
            <div className="h-[1px] mt-6 w-full bg-[#CACACA]"></div>
            <div className="mt-6">
              <h2 className="poppins-600 text-[18px] text-[#CACACA]">More</h2>
              <div className="poppins-600 flex flex-col gap-3 mt-2">
                <Link href={""} className="flex items-center justify-between">
                  {" "}
                  <p>About Us</p>
                  <img
                    src="/front.png"
                    alt=""
                    className="w-[7px] h-[12px]"
                  />{" "}
                </Link>

                <Link href={""} className="flex items-center justify-between">
                  {" "}
                  <p>Privacy Policy</p>
                  <img
                    src="/front.png"
                    alt=""
                    className="w-[7px] h-[12px]"
                  />{" "}
                </Link>
                <Link href={""} className="flex items-center justify-between">
                  {" "}
                  <p>Terms & Conditions</p>
                  <img
                    src="/front.png"
                    alt=""
                    className="w-[7px] h-[12px]"
                  />{" "}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between"
                >
                  {" "}
                  <p>Logout</p>
                  <img
                    src="/front.png"
                    alt=""
                    className="w-[7px] h-[12px]"
                  />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default Account;
