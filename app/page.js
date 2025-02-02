"use client";
import InstallButton from "@/components/UI/InstallButton";
// import InstallButton from "@/components/InstallButton";
import Loader from "@/components/UI/Loader";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const {user}=useAuth();
  const [web, setWeb] = useState(true);
  const router = useRouter();
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    if (user?.uid) {
      router.push("/v2/creator?cat=All");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      setWeb(false);
    } else {
      setWeb(true);
    }
  }, []);

  if (loading)
    return (
      <div className="bg-black w-full h-screen text-white px-3 flex flex-col items-center justify-center gap-5">
        <Loader />
      </div>
    ); 
  return (
    <div className="bg-black w-full h-screen text-white px-3 flex flex-col items-center justify-center gap-10">
      {/* <div>
        <InstallButton/>
      </div> */}
      <img src="/hero.png" alt=".." className="h-[281px] w-[330px]" />
      <div className="text-4xl font-bold text-center flex flex-col gap-2">
        <h2 className="">Welcome To Earnr!</h2>
        <h2 className="flex flex-wrap gap-2 items-center justify-center">
          Creator’s <span className="text">Hive</span>
        </h2>
      </div>
      {/* <div className="text-4xl font-bold text-center flex flex-col gap-2">
        <h2 className="three-d-text">Rewarding</h2>
        <h2 className="flex flex-wrap gap-2 items-center justify-center">
          Creator’s <span className="text">Creator</span>
        </h2>
      </div> */}
      {web ? (
        <div className="md:hidden flex w-10/12 mt-8">
          <InstallButton />
        </div>
      ) : (
        <div className="md:hidden flex flex-col gap-3 w-8/12">
          <Link
            href={"/signup"}
            className="bg-[#8C00FF] urbanist-700 py-2 px-4 text-center text-white rounded-3xl w-full text-[20px]"
          >
            Sign In
          </Link>
          {/* <div className="flex items-center gap-2">
            <span>
              <img src="/hoizontalLine.svg" className="w-full" />
            </span>
            <span>or</span>
            <span>
              <img src="/hoizontalLine.svg" className="w-full" />
            </span>
          </div>
          <Link
            href={"/signup"}
            className="bg-[#8C00FF] text-center urbanist-700 py-2 px-4 text-white rounded-3xl w-full text-[20px]"
          >
            Sign Up
          </Link> */}
        </div>
      )}

      <div className="md:flex hidden flex-col gap-3">
        <Link
          href={"/signup"}
          className="bg-[#8C00FF] urbanist-700 py-2 px-20 text-center text-white rounded-3xl w-full text-[20px]"
        >
          Next
        </Link>
        {/* <div className="flex items-center gap-2">
          <span>
            <img src="/hoizontalLine.svg" className="w-full" />
          </span>
          <span>or</span>
          <span>
            <img src="/hoizontalLine.svg" className="w-full" />
          </span>
        </div>
        <Link
          href={"/signup"}
          className="bg-[#FFCD48] text-center urbanist-700 py-2 px-4 text-white rounded-3xl w-full text-[20px]"
        >
          Sign Up
        </Link> */}
      </div>
    </div>
  );
}
