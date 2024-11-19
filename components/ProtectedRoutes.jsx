// components/ProtectedRoute.js
"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  // console.log(user);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to login page
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signup"); // Redirect to login page after logout
    } catch (err) {
      console.error("Logout failed: ", err.message);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      <Loader/>
    </div>;
  }
  if (user && !user.emailVerified) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-800">
          <h2 className="text-xl font-bold mb-4">
            Email Verification Required
          </h2>
          <p className="mb-4">
            Please verify your email and Reload
          </p>
            <button onClick={handleLogout} className="bg-[#FFCD48] urbanist-700 py-2 px-4 text-center text-black rounded-3xl w-full ">Try Another Eamil</button>
        </div>
      </div>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;
