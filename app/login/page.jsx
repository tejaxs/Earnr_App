"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link.js";
import Loader from "@/components/UI/Loader";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import DynamicInput from "@/components/UI/Input";

const Login = () => {

  const [loading, setLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [inputs, setInputs] = useState([
    {
      id: "number",
      label: "Phone Number",
      value: "",
      isFocused: false,
      type: "tel",
    },
  ]);
  const [otp, setOtp] = useState([
    {
      id: "otp",
      label: "OTP",
      value: "",
      isFocused: false,
      type: "text",
    },
  ]);

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
          phoneNumber: `+91${inputs[0].value}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOtpSent(true);
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
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `+91${inputs[0].value}`,
          otp:otp[0].value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        router.push("/v2/creator");
      } else {
        const errorData = await response.json();
        setLoading(false);
        toast.error(errorData.message || "SignIn failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("SignIn failed: " + err.message);
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
      <div className="flex flex-col items-center justify-center gap-10 h-full w-full">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-[40px] urbanist-700">Sign Into your Account</h2>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-[300px]">
          {!otpSent ? (
            <div className="flex flex-col gap-4">
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
              <button
                onClick={handleVerifyOtp}
                className="bg-[#8C00FF] urbanist-700 py-2 px-4 text-center text-white rounded-3xl w-full text-[20px]"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>

        <div className="text-[12px]">
          Don't have an account?{" "}
          <Link href={"/signup"} className="text-[#8C00FF]">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
