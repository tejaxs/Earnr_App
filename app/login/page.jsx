"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link.js";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      router.push("/v2/creator?cat=All");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `+91${phone}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOtpSent(true);
        toast.success(data.message || "OTP sent successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Error sending OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
  
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `+91${phone}`,
          otp,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        router.push("/v2/creator");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "SignIn failed");
      }
    } catch (err) {
      toast.error("SignIn failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading)
    return (
      <div className="bg-black w-full h-screen text-white px-3 flex flex-col items-center justify-center gap-5">
        <Loader />
      </div>
    ); 

  return (
    <div className="bg-black w-full h-screen text-white px-3 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center justify-center gap-5 h-full w-full">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-[20px]">Sign In</h2>
          <p>Hi! Welcome back, you’ve been missed</p>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-[300px]">
          {!otpSent ? (
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile Number"
                className="outline-none rounded-3xl px-3 py-1 text-black"
              />
              <button
                onClick={handleSendOtp}
                className="bg-[#FFCD48] urbanist-700 py-2 px-4 text-center text-black rounded-3xl w-full text-[20px]"
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="outline-none rounded-3xl px-3 py-1 text-black"
              />
              <button
                onClick={handleVerifyOtp}
                className="bg-[#FFCD48] urbanist-700 py-2 px-4 text-center text-black rounded-3xl w-full text-[20px]"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>

        <div className="text-[12px]">
          Don't have an account?{" "}
          <Link href={"/signup"} className="text-[#FFCD48]">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
