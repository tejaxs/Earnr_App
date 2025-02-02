"use client";
import ActivityModal from "@/components/Activity/ActivityModal";
import FollowComponent from "@/components/creator/FollowComponent";
import MobileSidebar from "@/components/MobileSidebar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import Sidebar from "@/components/Sidebar";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const CreatorContent = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const handleBack = () => {
    router.back();
  };

  const [creator, setCreator] = useState([]);

  useEffect(() => {
    // Use `doc` to specify the collection and the document ID
    const creatorDoc = doc(db, "creators", id);

    const getData = onSnapshot(creatorDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCreator({ id: docSnapshot.id, ...docSnapshot.data() });
      } else {
        console.log("Document does not exist");
      }
    });

    return () => getData();
  }, []);

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Reference to the activities subcollection under the specific creator document
    const activitiesRef = collection(db, "creators", id, "activities");

    const getActivity = onSnapshot(activitiesRef, (snapshot) => {
      const creatorActivities = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(creatorActivities);
    });

    return () => getActivity();
  }, [id]);
  // console.log(activities);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setOpen(true);
  };

  const handleShareLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Earnr",
          url: url,
        });
      } catch (error) {
        console.log("Error Sharing");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url), alert("url copied");
      } catch (error) {
        console.log("Error copying");
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="md:flex md:h-screen">
        <div className="w-56 p-2 border-r border-[#ffffff98] pt-10 md:block hidden">
          <Sidebar />
        </div>
        <div className="flex-1  overflow-y-auto md:mb-0 mb-20 flex justify-center">
          <div className="md:w-7/12 w-full">
            <button
              onClick={handleBack}
              className="border border-white rounded-full p-1 m-2 md:hidden"
            >
              <img src="/back.png" alt="" className="w-[14px] h-[14px]" />
            </button>
            <div className="flex flex-col justify-center mt-4 h-4/12">
              <div className="flex flex-col items-center justify-center">
                <div className=" border-2 w-[200px] h-[200px] overflow-hidden rounded-full flex justify-center bg-white border-[#8C00FF]">
                  <img
                    src={creator?.image}
                    alt=""
                    className="w-[120px] h-[200px]"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h2 className="urbanist-800 text-[32px]">{creator?.name}</h2>
                <div className="flex md:gap-4 gap-2 my-4">
                  <Link
                    target="_blank"
                    href={creator?.instagramId || ""}
                    className=" urbanist-700 md:text-base text-sm  flex items-center px-2 py-1 justify-center gap-1 rounded"
                  >
                    <span className="md:text-xs text-xs">
                      <img
                        src="/instagram.svg"
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                    </span>
                    Instagram
                  </Link>
                  <Link
                    target="_blank"
                    href={creator?.youtubeId || ""}
                    className=" urbanist-700 md:text-base text-sm flex items-center px-2 py-1 justify-center gap-1 rounded"
                  >
                    <span className="md:text-xs text-xs">
                      <img
                        src="/youtube.png"
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                    </span>
                    Youtube
                  </Link>
                </div>
                <div className="flex gap-6 flex-wrap justify-center">
                  <div className="text-center">
                    <p className="poppins-600 text-[24px] text-[#FFBE4EF7]">
                      {creator?.InstaCount || 0}
                    </p>
                    <p className="poppins-500 text-[10px]">Social Following</p>
                  </div>
                  <div className="text-center">
                    <p className="poppins-600 text-[24px] text-[#FFBE4EF7]">
                      {creator?.giveaway || 0}%
                    </p>
                    <p className="poppins-500 text-[10px]">Giveaway</p>
                  </div>
                  <div className="text-center">
                    <p className="poppins-600 text-[24px] text-[#FFBE4EF7]">
                      {followerCount}
                    </p>
                    <p className="poppins-500 text-[10px]">Earnr Followers</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <FollowComponent
                  creatorId={id}
                  followerCount={followerCount}
                  setFollowerCount={setFollowerCount}
                  following={following}
                  setFollowing={setFollowing}
                />

                <div
                  onClick={handleShareLink}
                  className={`
                ${following ? "bg-black" : "bg-white"} 
              rounded-full p-[4px] flex justify-center items-center cursor-pointer`}
                >
                  {following ? (
                    <img
                      src="/shareiconwhite.png"
                      alt=""
                      className="w-[24px] h-[18px]"
                    />
                  ) : (
                    <img
                      src="/shareiconblack.png"
                      alt=""
                      className="w-[22px] h-[18px]"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#1C1B19] pt-4 px-3 pb-4 rounded-t-3xl mt-3">
              <div
                className={`flex-shrink-0 px-4 md:text-base text-sm flex items-center justify-center snap-center rounded-lg shadow-lg border py-1 cursor-pointer 
                text-[#8C00FF] border-[#8C00FF] `}
              >
                Creator Activities
              </div>
              <div className="w-full mt-3">
                <div
                  className="flex flex-wrap md:gap-12 gap-3 md:justify-center justify-evenly"
                  id="carousel"
                >
                  {activities.map((da, i) => (
                    <div
                      key={i}
                      // ref={ButtonRef}

                      onClick={() => handleActivityClick(da)}
                      className=" md:w-[230px] w-[130px] cursor-pointer snap-center bg-white rounded-lg shadow-lg text-black border border-[#8C00FF]"
                    >
                      <div className="relative">
                        <p className="absolute right-0 text-[10px] bg-[#FFBE4E] rounded-3xl px-2 poppins-600 m-1 ">
                          {da?.time}
                        </p>
                        <img
                          src={da?.image}
                          alt=".."
                          className="rounded-t-lg w-full md:h-[130px] h-[90px]"
                        />
                      </div>
                      <div className=" bg-white rounded-b-lg">
                        <div className="flex md:gap-5 gap-3">
                          <img
                            src={da?.icon}
                            alt=""
                            className="relative w-[36px] h-[36px] bottom-4 md:left-4 left-2"
                          />
                          <p className="urbanist-800 text-xs mt-1">
                            {da?.creatorName}
                          </p>
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
          </div>
          <ActivityModal
            open={open}
            handleClose={handleClose}
            selectedActivity={selectedActivity}
          />
        </div>
        <div className="fixed bottom-0 left-0 w-full z-20  md:hidden flex justify-between items-center py-4 bg-[#1E1E1E]  px-8">
          <MobileSidebar />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreatorContent;
