"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import WaveLoader from "./Loader/WaveLoader";

const ProtectedRoute = ({ children }) => {
  const { user,loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <WaveLoader />
      </div>
    );
  }
  if (!user?.uid) {
    router.push("/login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
