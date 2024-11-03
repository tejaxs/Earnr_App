"use client";
import ActivityModal from "@/components/ActivityModal";
import FollowComponent from "@/components/FollowComponent";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { db } from "@/firebase/firebaseConfig";
import { Modal } from "@mui/material";
import {
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const CreatorContent = ({ params }) => {
  const [followed, setFollowed] = useState(false);
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
  console.log(activities);

  const c_data = {
    1: {
      id: "1",
      name: "Rohan",
      image: "/man1.png",
      color: "#595BD4",
      followers: "1M+",
      e_followers: 526,
      giveaway: "15%",
    },
    2: {
      id: "2",
      name: "Karan Gill",
      image: "/man2.png",
      color: "#FC4C3F",
      followers: "1M+",
      e_followers: 206,
      giveaway: "15%",
    },
    3: {
      id: "3",
      name: "Ananya Singh",
      image: "/man3.png",
      color: "#DCA546",
      followers: "1M+",
      e_followers: 1026,
      giveaway: "15%",
    },
    4: {
      id: "4",
      name: "Priya Desai",
      image: "/man4.png",
      color: "#595BD4",
      followers: "1M+",
      e_followers: 106,
      giveaway: "15%",
    },
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setOpen(true);
  };

  const data = [
    {
      c_id: "1",
      name: "Rohan",
      icon: "/person.png",
      image: "/comment.png",
      goal: "5000 Comments",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "2",
      name: "Karan Gill",
      icon: "/person.png",
      image: "/share.png",
      goal: "1000 Shares",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "2",
      name: "Karan Gill",
      icon: "/person.png",
      image: "/view.png",
      goal: "1M Views",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "2",
      name: "Karan Gill",
      icon: "/person.png",
      image: "/like.png",
      goal: "100k likes",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "3",
      name: "Ananya Singh",
      icon: "/person.png",
      image: "/share.png",
      goal: "1000 Shares",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "3",
      name: "Ananya Singh",
      icon: "/person.png",
      image: "/like.png",
      goal: "100k likes",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "3",
      name: "Ananya Singh",
      icon: "/person.png",
      image: "/view.png",
      goal: "1M Views",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "4",
      name: "Priya Desai",
      icon: "/person.png",
      image: "/share.png",
      goal: "1000 Shares",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "4",
      icon: "/person.png",
      image: "/like.png",
      goal: "100k likes",
      reward: "50",
      time: "22:15",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen grad md:px-40 px-0 text-white flex flex-col items-center">
        <Navbar />
        <div className="md:w-7/12 w-full">
          <button
            onClick={handleBack}
            className="border border-white rounded-full p-1 m-2 md:hidden"
          >
            <img src="/back.png" alt="" className="w-[14px] h-[14px]" />
          </button>
          <div className="flex flex-col justify-center mt-4 h-4/12">
            <div className="flex flex-col items-center justify-center">
              <img
                src={creator?.image}
                alt=""
                className="w-[120px] h-[200px]"
              />
              <div className="flex md:gap-4 gap-2 relative bottom-7">
                <div className="bg-white/30 text-white poppins-500 md:text-base text-sm  flex items-center px-2 py-1 justify-center gap-1 rounded">
                  <span className="md:text-xs text-xs">🟢</span>Instagram
                </div>
                <div className="bg-[#F7B84B] text-black poppins-500 md:text-base text-sm flex items-center px-2 py-1 justify-center gap-1 rounded">
                  <span className="md:text-xs text-xs">⚪</span>Youtube
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="urbanist-800 text-[32px]">{creator?.name}</h2>
              <div className="flex gap-6 flex-wrap justify-center">
                <div className="text-center">
                  <p className="poppins-600 text-[24px] text-[#FFBE4EF7]">
                    {creator?.InstaCount || 0}
                  </p>
                  <p className="poppins-500 text-[10px]">Social Following</p>
                </div>
                <div className="text-center">
                  <p className="poppins-600 text-[24px] text-[#FFBE4EF7]">
                    {creator?.giveaway || 0}
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
                text-[#F7B84B] border-[#F7B84B] `}
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
                    className=" md:w-[230px] w-[130px] cursor-pointer snap-center bg-white rounded-lg shadow-lg text-black border gradient-borderr"
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
                        <p className="urbanist-800 text-xs mt-1">{da?.creatorName}</p>
                      </div>
                      <div className="pl-4 md:pb-4 pb-2">
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

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className=" flex justify-center"
        >
          <div
            className="flex flex-col justify-between absolute z-10 top-10 h-5/6 bg-white text-black md:w-[350px] w-10/12 rounded-xl py-4 border-none"
            style={{
              backgroundImage: "url(/image.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex justify-between m-2 p-3 bg-white rounded-3xl">
              <div>
                <img
                  src={selectedActivity?.icon}
                  alt=""
                  className="w-[42px] h-[46px]"
                />
                <div className="relative">
                  <p className="absolute -right-12 top-1 text-[14px] bg-[#FFBE4E] rounded-3xl px-8 poppins-600 m-1 ">
                    {selectedActivity?.time}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="urbanist-700 md:text-[20px] text-[14px]">
                  {selectedActivity?.goal}
                </h2>
                <p className="urbanist-500 md:text-base text-[14px]">
                  {selectedActivity?.creatorName}
                </p>
              </div>
              <div>
                <h2 className="urbanist-700 md:text-[20px] text-[14px] text-center">
                  {selectedActivity?.reward}
                </h2>
                <p className="urbanist-500 text-[14px]">Earnr Coins</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                target="_blank"
                href={selectedActivity?.postLink}
                className="bg-[#FF4B4B] border-2 border-white rounded-full urbanist-500 text-white px-8 py-2"
              >
                Start Activity
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </ProtectedRoute>
  );
};

export default CreatorContent;
