"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { auth, db } from "@/firebase/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Account = () => {
  const { user } = useAuth();
  const [value, setValue] = useState(0);
  const minValue = 0;
  const maxValue = 200;
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const router = useRouter();
  const [loading1, setLoading1] = useState(true);
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
  // console.log(router);
  useEffect(() => {
    const fetchCoin = async () => {
      if (!user?.uid) return; // Early exit if user is not available

      try {
        const userRef = doc(db, "users", user.uid); // Using user.uid directly
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          // Ensure that the coin is a number
          const coinValue = Number(userData.coin) || 0; // Default to 0 if NaN
          setValue(coinValue); // Set coin balance from the fetched data
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Handle errors
      } finally {
        setLoading1(false);
      }
    };

    fetchCoin(); // Call the function to fetch user data
  }, [user?.uid]);

  const [level, setLevel] = useState("Level 1");
  useEffect(() => {
    // Check the coin range and set level accordingly
    if (value >= 0 && value < 200) {
      setLevel("Level 1");
    } else if (value >= 200 && value < 500) {
      setLevel("Level 2");
    } else if (value >= 500 && value <= 1000) {
      setLevel("Level 3");
    }
  }, [value]);

  return (
    <div className="w-full min-h-screen grad md:px-40 px-0 text-white flex flex-col items-center">
      <Navbar />
      {loading1 ? (
        <Loader />
      ) : (
        <ProtectedRoute>
          <div className="md:w-7/12 w-full flex flex-col flex-grow">
            <div>
              <button
                onClick={handleBack}
                className="border border-white rounded-full p-1 m-2 md:hidden"
              >
                <img src="/back.png" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <img
                src={user?.photoURL || "/person.png"}
                alt=""
                className="relative right-2 w-[126px] h-[126px] rounded-full"
              />
            </div>
            <div className="flex justify-center text-[18px] poppins-600 relative top-6">
              <div className="flex gap-4 p-2 px-4 rounded-3xl bg-[#1B1A18]">
                <div className="flex gap-2 items-center">
                  ₹<p>{value}</p>
                </div>
                <div>|</div>
                <div>{level}</div>
              </div>
            </div>
            <div className="bg-[#1C1B19] pt-4 px-3 pb-4 flex flex-col flex-grow">
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
                  <span className="flex items-center gap-1">₹{minValue}</span>
                  <span className="flex items-center gap-1">₹{maxValue}</span>
                </div>
              </div>
              <div className="h-[1px] mt-6 w-full bg-[#CACACA]"></div>
              <div className="mt-6">
                <h2 className="poppins-600 text-[18px] text-[#CACACA]">
                  Account Settings
                </h2>
                <div className="poppins-600 flex flex-col gap-3 mt-4">
                  <Link
                    href={"/account/edit"}
                    className="flex items-center justify-between"
                  >
                    {" "}
                    <p>Edit Profile</p>
                    <img
                      src="/front.png"
                      alt=""
                      className="w-[7px] h-[12px]"
                    />{" "}
                  </Link>

                  {/* <Link href={""} className="flex items-center justify-between">
                  {" "}
                  <p>Change Password</p>
                  <img
                    src="/front.png"
                    alt=""
                    className="w-[7px] h-[12px]"
                  />{" "}
                </Link> */}
                </div>
              </div>
              <div className="h-[1px] mt-6 w-full bg-[#CACACA]"></div>
              <div className="mt-6">
                <h2 className="poppins-600 text-[18px] text-[#CACACA]">More</h2>
                <div className="poppins-600 flex flex-col gap-3 mt-4">
                  <Link
                    href={"/account/about"}
                    className="flex items-center justify-between"
                  >
                    {" "}
                    <p>About Us</p>
                    <img
                      src="/front.png"
                      alt=""
                      className="w-[7px] h-[12px]"
                    />{" "}
                  </Link>

                  <Link
                    href={"/account/privacy"}
                    className="flex items-center justify-between"
                  >
                    {" "}
                    <p>Privacy Policy</p>
                    <img
                      src="/front.png"
                      alt=""
                      className="w-[7px] h-[12px]"
                    />{" "}
                  </Link>
                  <Link
                    href={"/account/terms"}
                    className="flex items-center justify-between"
                  >
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
      )}
    </div>
  );
};

export default Account;
