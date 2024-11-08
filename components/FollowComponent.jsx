import React, { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FollowComponent = ({
  creatorId,
  followerCount,
  setFollowerCount,
  following,
  setFollowing,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Monitor auth state to set the user
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await checkFollowingStatus(currentUser.uid);
      } else {
        setUser(null);
        setFollowing(false);
      }
    });
    return unsubscribe;
  }, [creatorId]);

  // Function to check if user is following the creator
  const checkFollowingStatus = async (userId) => {
    const creatorDocRef = doc(db, "creators", creatorId);
    const creatorDoc = await getDoc(creatorDocRef);

    if (creatorDoc.exists()) {
      const data = creatorDoc.data();
      setFollowerCount(data.followerCount || 0);
      setFollowing(data.followers?.includes(userId) || false);
    }
  };

  // Function to handle follow
  const handleFollow = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);

    // Get the user's current following array
    const userDoc = await getDoc(userDocRef);
    const currentFollowing = userDoc.data()?.following || [];

    // Check if the user is already following 3 creators
    if (currentFollowing.length >= 3) {
      toast.error("You can follow only 3 creators!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const creatorDocRef = doc(db, "creators", creatorId);

    // Update creator's followers and follower count
    await setDoc(
      creatorDocRef,
      {
        followers: arrayUnion(user.uid),
        followerCount: followerCount + 1,
      },
      { merge: true }
    );

    // Update user's following list and following count
    await setDoc(
      userDocRef,
      {
        following: arrayUnion(creatorId),
        followingCount: currentFollowing.length + 1,
      },
      { merge: true }
    );

    setFollowing(true);
    setFollowerCount((prevCount) => prevCount + 1);

    // Show success toast notification
    toast.success("Successfully followed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Function to handle unfollow
  const handleUnfollow = async () => {
    if (!user) return;

    const creatorDocRef = doc(db, "creators", creatorId);
    const userDocRef = doc(db, "users", user.uid);

    // Update creator's followers and follower count
    await setDoc(
      creatorDocRef,
      {
        followers: arrayRemove(user.uid),
        followerCount: followerCount - 1,
      },
      { merge: true }
    );

    // Get the user's current following array size
    const userDoc = await getDoc(userDocRef);
    const currentFollowing = userDoc.data()?.following || [];

    // Update user's following list and following count
    await setDoc(
      userDocRef,
      {
        following: arrayRemove(creatorId),
        followingCount: currentFollowing.length - 1,
      },
      { merge: true }
    );

    setFollowing(false);
    setFollowerCount((prevCount) => prevCount - 1);

    // Show success toast notification for unfollow
    toast.info("Successfully unfollowed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="">
      {following ? (
        <button
          onClick={handleUnfollow}
          className="px-8 py-1 rounded-lg poppins-700 bg-black text-[#FFFFFF]"
        >
          Following
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className="px-8 py-1 rounded-lg poppins-700 bg-[#FFFFFF] text-black"
        >
          Follow
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default FollowComponent;
