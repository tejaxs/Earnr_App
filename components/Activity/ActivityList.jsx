import React from "react";
import ActivityTimer from "./ActivityTimer";
import WaveLoader from "../Loader/WaveLoader";

const ActivityList = ({ displayedActivities, loading, cat,handleActivityClick }) => {
  return (
    <div className="mt-6 md:mt-12">
      <div className="w-full mt-3">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start" id="carousel">
          {loading ? (
            <div className="w-full">
              <WaveLoader />
            </div>
          ) : displayedActivities.filter((da) => da.status === "pending").length > 0 ? (
            displayedActivities
              .filter((da) => da.status === "pending")
              .map((da, i) => (
                <div
                  key={i}
                  onClick={() => handleActivityClick(da)}
                  className="md:w-[230px] w-[140px] cursor-pointer snap-center bg-white rounded-lg overflow-hidden 
                  shadow-lg text-black border-2 border-[#8C00FF] transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative">
                    <p className="absolute right-0 text-[10px] bg-[#FFBE4E] rounded-3xl px-2 poppins-600 m-1">
                      <ActivityTimer activityDate={da?.activityDate} activityTime={da?.time} />
                    </p>
                    <img src={da?.image} alt=".." className="w-full md:h-[130px] h-[100px]" />
                  </div>
                  <div className="bg-white rounded-b-lg">
                    <div className="flex md:gap-5 gap-3">
                      <img
                        src={da?.icon}
                        alt=""
                        className="relative w-[36px] h-[36px] bottom-4 md:left-4 left-2"
                      />
                      <p className="urbanist-800 text-xs mt-1">{da?.creatorName}</p>
                    </div>
                    <div className="pl-2 md:pb-4 pb-2">
                      <h2 className="md:text-[18px] urbanist-700">{da?.reward} Earnr Coins</h2>
                      <p className="urbanist-500 text-[14px]">{da?.goal}</p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div>
              {cat !== "Earnr Activities" && (
                <div className="md:w-[210px] w-[200px] cursor-default snap-center bg-black text-white rounded-lg shadow-lg border border-gray-300 
                flex flex-col gap-4 items-center justify-center p-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <img src="/not-found.png" alt=".." className="rounded-t-lg w-full md:h-[130px] h-[100px]" />
                  <p className="urbanist-700 md:text-[18px] text-[16px] text-center">No activities available</p>
                  <p className="urbanist-500 text-[14px] text-center">You don’t follow any creators yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
