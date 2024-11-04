"use client";
import ActivityModal from "@/components/ActivityModal";
import ProtectedRoute from "@/components/ProtectedRoutes";
import withSuspense from "@/components/Suspense";
import { db } from "@/firebase/firebaseConfig";
import { Modal } from "@mui/material";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Activity = () => {
  const router = useRouter();
  const Spara = useSearchParams();
  const cat = Spara.get("cat");
  console.log(cat);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setOpen(true);
  };

  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const getActivities = onSnapshot(
      collectionGroup(db, "activities"),
      (snapshot) => {
        const allActivities = snapshot.docs.map((doc) => ({
          id: doc.id,
          creatorId: doc.ref.parent.parent.id,
          ...doc.data(),
        }));
        setActivities(allActivities);
      }
    );
    return () => getActivities();
  }, []);
  console.log(activities);
  
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
      icon: "/ananya.png",
      image: "/share.png",
      goal: "1000 Shares",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "3",
      name: "Ananya Singh",
      icon: "/ananya.png",
      image: "/like.png",
      goal: "100k likes",
      reward: "50",
      time: "22:15",
    },
    {
      c_id: "3",
      name: "Ananya Singh",
      icon: "/ananya.png",
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
  const categories = ["All"
    // , "Creator", "Top Earnr"
  ];
  const handleCategoryClick = (category) => {
    router.push(`/v2/activity?cat=${category}`);
  };
  return (
    <ProtectedRoute>
    <div className="px-3 py-2 text-white">
      <div className="w-full overflow-hidden mt-3 poppins-600">
        <div
          className="flex md:flex-wrap md:gap-4 gap-0  space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
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
            {activities.map((da, i) => (
              <div
                key={i}
                onClick={() => handleActivityClick(da)}
                className=" md:w-[230px] w-[140px] cursor-pointer snap-center bg-white rounded-lg shadow-lg text-black border gradient-borderr"
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
      <ActivityModal open={open} handleClose={handleClose} selectedActivity={selectedActivity}/>
      {/* <Modal
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
        </Modal> */}
    </div>
    </ProtectedRoute>
  );
};

export default withSuspense(Activity);
