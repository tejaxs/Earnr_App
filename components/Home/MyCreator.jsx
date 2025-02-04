import React from "react";
import WaveLoader from "../Loader/WaveLoader";
import Link from "next/link";

const MyCreator = ({
  loading2,

  creators,
}) => {
  return (
    <div className="mt-10 md:mt-16 poppins-600 relative max-w-full">
      <h2 className="text-[18px] md:text-[32px]">Your Creators</h2>

      <div className="w-full overflow-hidden md:mt-6 mt-4 relative">
        {loading2 ? (
          <WaveLoader />
        ) : (
          <div className="flex md:space-x-16 space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory ">
            {creators?.map((da, i) => (
              <Link
                href={`/v1/${da?.id}`}
                key={i}
                className="flex-shrink-0 w-40 md:w-60 snap-center bg-white rounded-lg shadow-lg overflow-hidden text-black border border-[#8C00FF]"
              >
                <div className="flex justify-center bg-[url('/bg-image.png')] ">
                  <img
                    src={da?.image}
                    alt=".."
                    className="md:w-[130px] md:h-[220px] w-[90px] h-[160px]"
                  />
                </div>
                <div className="flex justify-between px-2 items-center h-[50px] text-center md:text-[20px] urbanist-800 bg-white rounded-b-lg">
                  <p className="text-left">{da?.name}</p>
                  <div>
                    <img src="/instagram.svg" alt="" />
                    <p className="text-[10px]">{da?.InstaCount}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCreator;
