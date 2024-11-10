// components/ProtectedRoute.js
"use client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  // console.log(user);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to login page
    }
  }, [user, loading, router]);

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

        </div>
      </div>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;
