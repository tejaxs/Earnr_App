"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState("");

  // Set initial values for name and phoneNumber when user data is available
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      // setPhoneNumber(user.phoneNumber || 0);
      setEmail(user.email || "");
    }
  }, [user]);

  // Go back to the previous page
  const handleBack = () => {
    router.back();
  };
  console.log(user);

  // Save changes to Firebase Auth and Firestore
  const handleSaveChanges = async () => {
    try {
      // 1. Update Firebase Authentication profile
      if (user) {
        await updateProfile(user, {
          displayName: name,
          // phoneNumber: phoneNumber,
        });
      }

      // 2. Update Firestore document in "users" collection
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: name,
        // phoneNumber: phoneNumber,
      });

      // Toast notification on successful update
      toast.success("Profile updated successfully!");
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen grad md:px-40 px-0 text-white flex flex-col items-center">
      <Navbar />
      <ProtectedRoute>
        <div className="md:w-5/12 w-full flex flex-col flex-grow">
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

          <div className="flex justify-center">
            <div className="mt-4 relative">
              <img
                src={user?.photoURL || "/person.png"}
                alt="Profile"
                className="relative right-2 w-[126px] h-[126px] rounded-full"
              />
              <div className="p-2 bg-[#DCA546] rounded-[8px] absolute bottom-4 right-2">
                <img src="/edit.png" alt="Edit" className="w-[13px] h-[13px]" />
              </div>
            </div>
          </div>

          <div className="bg-[#1C1B19]  mt-10 pt-6 md:px-10 px-3 pb-10 flex flex-col gap-8 flex-grow">
            {/* <div className="flex flex-col gap-3">
              <label className="urbanist-700 text-[14px]">Phone Number</label>
              <input
                type="number"
                placeholder="Add Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="px-2 py-1 placeholder:font-semibold urbanist-700 text-black rounded-xl"
              />
            </div> */}
            <div className="flex flex-col gap-3">
              <label className="urbanist-700 text-[14px]">Name</label>
              <input
                type="text"
                placeholder="Add Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-2 py-1 placeholder:font-semibold urbanist-700 text-black rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="urbanist-700 text-[14px]">Email</label>
              <input
                type="text"
                placeholder="Add Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
                className="px-2 py-1 read-only:bg-gray-300 placeholder:font-semibold urbanist-700 text-black rounded-xl"
              />
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={handleSaveChanges}
                className="bg-[#FFCD48]  py-2 px-10 urbanist-700 text-center text-black rounded-3xl text-[20px]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>

      {/* ToastContainer is needed to display the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
