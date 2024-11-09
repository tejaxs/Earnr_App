"use client"
import ActivityModal from "@/components/ActivityModal";
import withSuspense from "@/components/Suspense";
import { db } from "@/firebase/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { Modal } from "@mui/material";
import { collectionGroup, onSnapshot, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Activity = () => {
  const router = useRouter();
  const Spara = useSearchParams();
  const cat = Spara.get("cat");
  const { user } = useAuth(); // Get current user from auth context or hook

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setOpen(true);
  };

  const [activities, setActivities] = useState([]);
  const [userActivities, setUserActivities] = useState([]); // Activities started by the user
  const [followedActivities, setFollowedActivities] = useState([]); // Activities from followed creators

  useEffect(() => {
    // Fetching the list of followed creators for the current user
    const fetchFollowedCreators = async () => {
      if (user?.uid) {
        const userDoc = doc(db, "users", user?.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const followedCreators = userSnap.data()?.following || [];
          return followedCreators;
        }
      }
      return [];
    };

    const getActivities = onSnapshot(
      collectionGroup(db, "activities"),
      async (snapshot) => {
        const allActivities = snapshot.docs.map((doc) => ({
          id: doc.id,
          creatorId: doc.ref.parent.parent.id,
          ...doc.data(),
        }));
        setActivities(allActivities);

        // Filter activities that the current user has started
        const userFilteredActivities = allActivities.filter((activity) =>
          activity.startedActivity?.includes(user?.uid) // Check if user ID is in 'startedActivity' list
        );
        setUserActivities(userFilteredActivities);

        // Filter activities from followed creators
        const followedCreators = await fetchFollowedCreators();
        const followedFilteredActivities = allActivities.filter((activity) =>
          followedCreators.includes(activity.creatorId)
        );
        setFollowedActivities(followedFilteredActivities);
      }
    );
    return () => getActivities();
  }, [user]);

  const categories = ["All", "Started Activities", "My Activities"]; // Adding 'Activity' for followed creators

  const handleCategoryClick = (category) => {
    router.push(`/v2/activity?cat=${category}`);
  };

  // Display activities based on selected category
  const displayedActivities =
    cat === "Started Activities"
      ? userActivities
      : cat === "My Activities"
      ?  [...new Set([...userActivities, ...followedActivities])]
      : activities;

  return (
    <div className="px-3 py-2 text-white">
      <div className="w-full overflow-hidden mt-3 poppins-600">
        <div
          className="flex md:flex-wrap md:gap-4 gap-0 space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          id="carousel"
        >
          {categories.map((ca, i) => (
            <div
              key={i}
              onClick={() => handleCategoryClick(ca)}
              className={`flex-shrink-0 px-4 md:text-base text-sm flex items-center justify-center snap-center rounded-lg shadow-lg border py-1 cursor-pointer ${
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
            className="flex flex-wrap md:gap-12 gap-3 md:justify-center justify-evenly"
            id="carousel"
          >
            {displayedActivities.map((da, i) => (
              <div
                key={i}
                onClick={() => handleActivityClick(da)}
                className="md:w-[230px] w-[140px] cursor-pointer snap-center bg-white rounded-lg shadow-lg text-black border gradient-borderr"
              >
                <div className="relative">
                  <p className="absolute right-0 text-[10px] bg-[#FFBE4E] rounded-3xl px-2 poppins-600 m-1 ">
                    {da?.time}
                  </p>
                  <img
                    src={da?.image}
                    alt=".."
                    className="rounded-t-lg w-full md:h-[130px] h-[100px]"
                  />
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
                    <h2 className="md:text-[18px] urbanist-700">
                      {da?.reward} Earnr Coins
                    </h2>
                    <p className="urbanist-500 text-[14px]">{da?.goal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ActivityModal open={open} handleClose={handleClose} selectedActivity={selectedActivity} />
    </div>
  );
};

export default withSuspense(Activity);
