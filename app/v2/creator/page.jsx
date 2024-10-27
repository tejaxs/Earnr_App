"use client";
import ProtectedRoute from "@/components/ProtectedRoutes";
import withSuspense from "@/components/Suspense";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Activity = () => {
  const router = useRouter();
  const Spara = useSearchParams();
  const cat = Spara.get("cat");
  console.log(cat);

  const data = [
    {
      id: "1",
      name: "Rohan",
      image: "/man1.png",
      color: "#595BD4",
      followers:"1M+"
    },

    {
      id: "2",
      name: "Karan Gill",
      image: "/man2.png",
      color: "#FC4C3F",
      followers:"1M+"
    },
    {
      id: "3",
      name: "Ananya Singh",
      image: "/man3.png",
      color: "#DCA546",
      followers:"1M+"
    },
    {
      id: "4",
      name: "Priya Desai",
      image: "/man4.png",
      color: "#595BD4",
      followers:"1M+"
    },
  ];
  const categories = ["All", 
    // "Lifestyle", "Fitness", "Gaming"
  ];
  const handleCategoryClick = (category) => {
    router.push(`/v2/creator?cat=${category}`);
  };
  return (
    <ProtectedRoute>
    <div className="px-3 py-2 text-white">
      <div className="w-full overflow-hidden mt-3 poppins-600">
        <div
          className="flex md:flex-wrap md:gap-6 gap-0  space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          id="carousel"
        >
          {categories.map((ca, i) => (
            <div
              key={i}
              onClick={() => handleCategoryClick(ca)}
              className={`flex-shrink-0 w-[78px] md:text-base text-sm flex items-center justify-center snap-center rounded-lg shadow-lg border py-1 cursor-pointer ${
                cat === ca
                  ? "text-[#F7B84B] border-[#F7B84B]"
                  : "text-[#F4F3FC] border-[#F4F3FC]"
              } `}
            >
              {ca}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 md:mt-12">
        <div className="w-full mt-3">
          <div
            className="flex flex-wrap md:gap-12 gap-4 md:justify-center justify-evenly"
            id="carousel"
          >
            {data.map((da, i) => (
              <Link
                href={`/v1/${da?.id}`}
                key={i}
                className=" w-[140px] md:w-52 cursor-pointer snap-center bg-white rounded-lg shadow-lg text-black border gradient-borderr"
              >
                <div
                  style={{ backgroundColor: da?.color }}
                  className={` rounded-t-lg flex justify-center`}
                >
                  <img
                    src={da?.image}
                    alt=".."
                    className="md:w-[130px] md:h-[220px] w-[90px] h-[150px]"
                  />
                </div>
                <div className="flex justify-between px-2 items-center h-[50px]  text-center md:text-[20px] urbanist-800 bg-white rounded-b-lg">
                  <p className="text-left"> {da?.name}</p>
                  <div>
                    {" "}
                    <img src="/instagram.svg" alt="" />
                    <p className="text-[10px]">{da?.followers}</p>
                  </div>{" "}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default withSuspense(Activity);
