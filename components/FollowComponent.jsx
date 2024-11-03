import React, { useState, useEffect } from "react";
// import { auth, db } from "../../firebase/firebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";

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
    const creatorDocRef = doc(db, "Creators", creatorId);
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

    const creatorDocRef = doc(db, "Creators", creatorId);
    await updateDoc(creatorDocRef, {
      followers: arrayUnion(user.uid),
      followerCount: followerCount + 1,
    });
    setFollowing(true);
    setFollowerCount((prevCount) => prevCount + 1);
  };

  // Function to handle unfollow
  const handleUnfollow = async () => {
    if (!user) return;

    const creatorDocRef = doc(db, "Creators", creatorId);
    await updateDoc(creatorDocRef, {
      followers: arrayRemove(user.uid),
      followerCount: followerCount - 1,
    });
    setFollowing(false);
    setFollowerCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="">
      {following ? (
        <button
          onClick={handleUnfollow}
          className={`px-8 py-1 rounded-lg poppins-700 bg-black text-[#FFFFFF]`}
        >
          Following
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className={`px-8 py-1 rounded-lg poppins-700  bg-[#FFFFFF] text-black
          `}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowComponent;
