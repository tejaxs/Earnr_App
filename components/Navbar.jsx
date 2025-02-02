"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import HowToUse from "./UI/HowToUse";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null); // Reference for modal element

  useEffect(() => {
    setUrl(user?.photoURL);
  }, [user?.photoURL]);

  // Function to handle clicks outside the modal
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
    <div className="p-2 md:flex hidden justify-between items-center w-full">
      <Link href={"/v2/home"}>
        <img
          className="lg:w-[218px] md:w-[120px] lg:h-[72px] md:h-[40px]"
          src="/whiteLogo1.png"
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
          className="lg:text-[20px] text-[15px] hover:border-b border-white px-2 urbanist-500"
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
          onClick={() => setShowModal(true)} // Open modal on click
          className="lg:text-[20px] text-[15px] text-[#DCA546]  px-2 urbanist-600"
        >
          How to Use
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

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-4xl relative z-50 h-[90%] overflow-y-auto custom-scrollbar"
          >
            <h2 className="text-3xl font-semibold text-[#DCA546] mb-6 text-center">
              How to Get Started with Earnr
            </h2>
            <HowToUse />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-black text-2xl font-bold hover:text-[#DCA546]"
            >
              &times;
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
