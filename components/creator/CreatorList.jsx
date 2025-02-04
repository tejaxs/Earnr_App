import Link from "next/link";
import React from "react";

const CreatorList = ({ filteredCreators }) => {

  return (
    <div className="mt-6 md:mt-12">
      <div className="w-full mt-3">
        <div
          className="flex flex-wrap md:gap-12 gap-4 md:justify-start justify-evenly"
          id="carousel"
        >
          {filteredCreators.length === 0 ? (
            <div></div>
          ) : (
            filteredCreators.map((da, i) => (
              <Link href={`/v1/${da?.id}`} key={i} className="md:w-auto w-full">
                <div className=" w-[140px] md:w-52 cursor-pointer snap-center bg-white rounded-lg shadow-lg overflow-hidden text-black border border-[#8C00FF] md:block hidden">
                  <div
                    className={` flex justify-center bg-[url('/bg-image.png')]`}
                  >
                    <img
                      src={da?.image}
                      alt=".."
                      className="md:w-[130px] md:h-[220px] w-[110px] h-[160px]"
                    />
                  </div>
                  <div className="md:flex justify-between px-2 items-center h-[50px] text-center md:text-[20px] urbanist-800 bg-white rounded-b-lg">
                    <p className="text-left">{da?.name}</p>
                    <div>
                      <img src="/instagram.svg" alt="" />
                      <p className="text-[10px]">{da?.InstaCount}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#232324] md:hidden flex w-full justify-between items-center p-3 rounded-lg">
                  <div className="bg-[#fff] w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center border-2 border-white shadow-lg">
                    <img
                      src={da?.image}
                      alt="profile"
                      className="w-full h-full object-cover object-[2px_10px]"
                    />
                  </div>
                  <div>
                    <h2 className="urbanist-800">{da?.name}</h2>
                  </div>
                  <div>
                    <img src="/instagram.svg" alt="" />
                    <p className="text-[10px]">{da?.InstaCount}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorList;
