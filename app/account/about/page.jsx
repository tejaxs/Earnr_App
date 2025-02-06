"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRouter } from "next/navigation";
import React from "react";

const About = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="w-full min-h-screen md:px-40 px-0 text-white flex flex-col items-center">
      <ProtectedRoute>
        <div className="md:w-5/12 w-full flex flex-col flex-grow">
          <div className="bg-[#1C1B19]  flex flex-col flex-grow">
            <div>
              <button
                onClick={handleBack}
                className="border border-white rounded-full p-1 m-2 md:hidden"
              >
                <img
                  src="/back.png"
                  alt="Go Back"
                  className="w-[14px] h-[14px]"
                />
              </button>
            </div>
            <div className=" md:px-10 px-3">About Us</div>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default About;
