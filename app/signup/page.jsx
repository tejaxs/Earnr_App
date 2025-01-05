"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link.js";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(""); // State for mobile number
  const [otp, setOtp] = useState(); // State for OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track OTP flow
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [referralBy, setReferralBy] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const referrer = queryParams.get("ref");
    setReferralBy(referrer);
  }, [router]);

  
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
          phoneNumber: `+91${mobile}`,
        }),
      });
  
      // Check if response is ok (status 200-299)
      if (response.ok) {
        const data = await response.json();
        setIsOtpSent(true);
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
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `+91${mobile}`,
          otp,
          name,
          referralBy: referralBy || null,
        }),
      });
  
      // Check if response is ok (status 200-299)
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        router.push("/v2/creator");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Signup failed");
      }
    } catch (err) {
      toast.error("SignUp failed: " + err.message);
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
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-[20px]">Create Account</h2>
        <p>Fill your information below or register with your social account</p>
      </div>
      <div className="flex flex-col gap-6">
        {!isOtpSent ? (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="outline-none rounded-3xl px-3 py-1 text-black"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                className="outline-none rounded-3xl px-3 py-1 text-black"
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="bg-[#FFCD48] urbanist-700 py-2 px-4 text-center text-black rounded-3xl w-full text-[20px]"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Enter OTP</label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="outline-none rounded-3xl px-3 py-1 text-black"
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="bg-[#FFCD48] urbanist-700 py-2 px-4 text-center text-black rounded-3xl w-full text-[20px]"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
      {/* <div className="flex items-center gap-2">
        <span>
          <img src="/hoizontalLine.svg" className="w-full" />
        </span>
        <span>Or sign up with</span>
        <span>
          <img src="/hoizontalLine.svg" className="w-full" />
        </span>
      </div> */}
      {/* <div className="flex gap-4 justify-center">
        <img
          src="/google.png"
          onClick={() => {}}
          className="w-[30px] h-[30px] cursor-pointer"
        />
        <img
          src="/facebook.png"
          onClick={() => {}}
          className="w-[30px] h-[30px] cursor-pointer"
        />
        <img
          src="/apple.png"
          onClick={() => {}}
          className="w-[30px] h-[30px] cursor-pointer"
        />
      </div> */}
      <div className="text-[12px]">
        Already have an account?{" "}
        <Link href={"/login"} className="text-[#FFCD48]">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
