"use client";
import ActivityModal from "@/components/Activity/ActivityModal";
import ActivityTimer from "@/components/Activity/ActivityTimer";
import withSuspense from "@/components/Suspense";
import { db } from "@/firebase/firebaseConfig";
import { collectionGroup, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import VerifyInstagram from "@/components/Activity/VerifyInstagram";
import WaveLoader from "@/components/Loader/WaveLoader";
import ActivityList from "@/components/Activity/ActivityList";

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
  const [loading, setLoading] = useState(true); // Loading state for activities

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
        setLoading(true); // Set loading true when fetching data
        const allActivities = snapshot.docs.map((doc) => ({
          id: doc.id,
          creatorId: doc.ref.parent.parent.id,
          ...doc.data(),
        }));

        setActivities(allActivities);

        // Filter activities that the current user has started
        const userFilteredActivities = allActivities.filter(
          (activity) => activity.startedActivity?.includes(user?.uid) // Check if user ID is in 'startedActivity' list
        );
        setUserActivities(userFilteredActivities);

        // Filter activities from followed creators
        const followedCreators = await fetchFollowedCreators();
        const followedFilteredActivities = allActivities.filter((activity) =>
          followedCreators.includes(activity.creatorId)
        );
        setFollowedActivities(followedFilteredActivities);

        setLoading(false); // Set loading false after fetching data
      }
    );
    return () => getActivities();
  }, [user]);

  const categories = [
    // "All",
    "My Activities",
    "Earnr Activities",
  ]; // Adding 'Activity' for followed creators

  const handleCategoryClick = (category) => {
    router.push(`/v2/activity?cat=${category}`);
  };

  // Display activities based on selected category
  const displayedActivities =
    cat === "Started Activities"
      ? userActivities
      : cat === "My Activities"
      ? [...new Set([...userActivities, ...followedActivities])]
      : [];

  const [value, setValue] = useState(0);
  useEffect(() => {
    const fetchCoin = async () => {
      if (!user?.uid) return; // Early exit if user is not available

      try {
        const userRef = doc(db, "users", user.uid); // Using user.uid directly
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          // Ensure that the coin is a number
          const coinValue = Number(userData.coin) || 0; // Default to 0 if NaN
          setValue(coinValue); // Set coin balance from the fetched data
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Handle errors
      } finally {
        setLoading(false);
      }
    };

    fetchCoin(); // Call the function to fetch user data
  }, [user?.uid]);
  return (
    <div className="md:px-10 px-3 py-2 text-white">
      <div className="w-full overflow-hidden mt-3 poppins-600">
        <div className="flex justify-between">
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
                    ? "text-[#8C00FF] border-[#8C00FF]"
                    : "text-[#F4F3FC] border-[#F4F3FC]"
                } `}
              >
                {ca}
              </div>
            ))}
          </div>
          <div className="flex gap-1 text-sm  p-1 px-3 items-center rounded-full border border-white">
            <img src="/whitelogo.png" alt="" className="w-[20px]  h-[16px]" />
            <p>{value}</p>
          </div>
        </div>
      </div>
      <ActivityList
        displayedActivities={displayedActivities}
        loading={loading}
        cat={cat}
        handleActivityClick={handleActivityClick}
      />
      {/* <div className="flex justify-center">
        {cat === "Earnr Activities" && !loading && (
          <VerifyInstagram userId={user?.uid} />
        )}
      </div> */}

      <ActivityModal
        open={open}
        handleClose={handleClose}
        selectedActivity={selectedActivity}
      />
    </div>
  );
};

export default withSuspense(Activity);
