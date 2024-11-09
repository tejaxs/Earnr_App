import { db } from "@/firebase/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { Modal } from "@mui/material";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ActivityModal = ({ open, handleClose, selectedActivity }) => {
  const { user } = useAuth();
  const [hasStarted, setHasStarted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    // Check if the activity has already been started by the user
    if (selectedActivity?.startedActivity?.includes(user?.uid)) {
      setHasStarted(true);
    } else {
      setHasStarted(false);
    }

    if (selectedActivity?.completedActivity?.includes(user?.uid)) {
      setHasCompleted(true);
    } else {
      setHasCompleted(false);
    }

    // Check if the user is following the creator of the activity
    const checkFollowing = async () => {
      if (user?.uid) {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const following = userSnap.data()?.following || [];
          setIsFollowing(following.includes(selectedActivity?.creatorId));
        }
      }
    };

    checkFollowing();
  }, [selectedActivity, user]);

  const handleStartActivity = async () => {
    if (hasStarted || !isFollowing) return;

    try {
      // Reference to the specific activity document
      const activityRef = doc(
        db,
        "creators",
        selectedActivity?.creatorId,
        "activities",
        selectedActivity?.id
      );

      // Append the user ID to the `startedActivity` list using arrayUnion
      await updateDoc(activityRef, {
        startedActivity: arrayUnion(user?.uid),
      });

      console.log("User ID added to startedActivity list");
    } catch (error) {
      console.error("Error starting activity:", error);
    }
  };

  return (
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
          backgroundImage: `url(${selectedActivity?.bgimage})`,
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
            {hasCompleted ? (
            <button
              className="bg-[#4CAF50] border-2 border-white rounded-full urbanist-500 text-white px-8 py-2"
            >
              Completed
            </button>
          ) : hasStarted ? (
            <Link
              target="_blank"
              href={selectedActivity?.postLink}
              onClick={handleStartActivity}
              className="bg-[#FF4B4B] border-2 border-white rounded-full urbanist-500 text-white px-8 py-2"
            >
              Started
            </Link>
          ) : isFollowing ? (
            <Link
              target="_blank"
              href={selectedActivity?.postLink}
              onClick={handleStartActivity}
              className="bg-[#FF4B4B] border-2 border-white rounded-full urbanist-500 text-white px-8 py-2"
            >
              Start Activity
            </Link>
          ) : (
            <button
              disabled
              className="bg-gray-400 border-2 border-white rounded-full urbanist-500 text-white px-8 py-2"
            >
              Follow the Creator to Start
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ActivityModal;
