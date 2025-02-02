"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link.js";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Loader from "@/components/UI/Loader";
import DynamicInput from "@/components/UI/Input";

const Signup = () => {
  // const [name, setName] = useState("");
  // const [mobile, setMobile] = useState(""); // State for mobile number
  // const [otp, setOtp] = useState(); // State for OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track OTP flow
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [referralBy, setReferralBy] = useState("");

  const [inputs, setInputs] = useState([
    {
      id: "name",
      label: "Enter Name",
      value: "",
      isFocused: false,
      type: "text",
    },
    {
      id: "mobile",
      label: "Enter Mobile Number",
      value: "",
      isFocused: false,
      type: "text",
    },
  ]);
  const [otp, setOtp] = useState([
    {
      id: "otp",
      label: "Enter OTP",
      value: "",
      isFocused: false,
      type: "text",
    },
  ]);

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
  const handleChange = (id, value, isFocused = false) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id
          ? { ...input, value, isFocused: isFocused ?? input.isFocused }
          : input
      )
    );
  };
  const handleOtpChange = (id, value, isFocused = false) => {
    setOtp((prev) =>
      prev.map((input) =>
        input.id === id
          ? { ...input, value, isFocused: isFocused ?? input.isFocused }
          : input
      )
    );
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `+91${inputs[1].value}`,
        }),
      });

      // Check if response is ok (status 200-299)
      if (response.ok) {
        const data = await response.json();
        setIsOtpSent(true);
        setLoading(false);
        toast.success(data.message || "OTP sent successfully");
      } else {
        const errorData = await response.json();
        setLoading(false);
        toast.error(errorData.message || "Failed to send OTP");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error sending OTP: " + err.message);
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
          phoneNumber: `+91${inputs[1].value}`,
          otp: otp[0].value,
          name: inputs[0].value,
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
        setLoading(false);
        toast.error(errorData.message || "Signup failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("SignUp failed: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="bg-black w-full h-screen text-white px-3 flex flex-col items-center justify-center gap-5">
        <Loader />
      </div>
    );
  return (
    <div className="bg-black w-full h-screen text-white px-3 flex flex-col items-center justify-center gap-5 urbanist-500">
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-[40px] urbanist-700">Create Account</h2>
        {/* <p>Fill your information below or register with your social account</p> */}
      </div>
      <div className="flex flex-col gap-6 md:w-3/12 w-full">
        {!isOtpSent ? (
          <div className="w-full flex flex-col md:gap-6 gap-3">
            {inputs.map((input) => (
              <DynamicInput
                key={input.id}
                id={input.id}
                label={input.label}
                value={input.value}
                isFocused={input.isFocused}
                onChange={handleChange}
                type={input.type}
              />
            ))}
            <button
              onClick={handleSendOtp}
              className="bg-[#8C00FF] urbanist-700 py-2 px-4 text-center text-white rounded-3xl w-full text-[20px]"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {otp.map((otp) => (
                <DynamicInput
                  key={otp.id}
                  id={otp.id}
                  label={otp.label}
                  value={otp.value}
                  isFocused={otp.isFocused}
                  onChange={handleOtpChange}
                  type={otp.type}
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="bg-[#8C00FF] urbanist-700 py-2 px-4 text-center text-white rounded-3xl w-full text-[20px]"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
      <div className="text-[12px]">
        Already have an account?{" "}
        <Link href={"/login"} className="text-[#8C00FF]">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
