"use client";
import ProtectedRoute from "@/components/ProtectedRoutes";
import withSuspense from "@/components/Suspense";
import { db } from "@/firebase/firebaseConfig";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import WaveLoader from "@/components/Loader/WaveLoader";
import CreatorList from "@/components/creator/CreatorList";

const Activity = () => {
  const router = useRouter();
  const Spara = useSearchParams();
  const cat = Spara.get("cat");
  const [creators, setCreators] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();


  useEffect(() => {
    const creatorCollection = collection(db, "creators");
    const getData = onSnapshot(creatorCollection, (snapshot) => {
      const creatorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCreators(creatorData);
      setLoading(false);
    });
    return getData;
  }, []);

  // Fetch followed creators
  useEffect(() => {
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const getFollowings = onSnapshot(userRef, (docSnapshot) => {
        const data = docSnapshot.data();
        setUserFollowing(data?.following || []);
      });

      return getFollowings;
    }
  }, [user?.uid]);

  // Filter creators based on category (All or My Creator)
  useEffect(() => {
    if (cat === "My Creator") {
      const followedCreators = creators.filter((creator) =>
        userFollowing.includes(creator.id)
      );
      setFilteredCreators(followedCreators);
    } else {
      setFilteredCreators(creators); // If "All" is selected, show all creators
    }
  }, [cat, creators, userFollowing]);

  // Handle category click
  const handleCategoryClick = (category) => {
    router.push(`/v2/creator?cat=${category}`);
  };

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

  // Handle loading state
  if (loading) {
    return <WaveLoader />; // Show loader while fetching data
  }

  return (
    <ProtectedRoute>
      <div className="md:px-10 px-3 py-2 text-white">
        <div className="w-full flex overflow-hidden mt-3 poppins-600">
          <div className="flex justify-between w-full">
            <div
              className="flex md:flex-wrap md:gap-6 gap-0 space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
              id="carousel"
            >
              {["All", "My Creator"].map((ca, i) => (
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

        <CreatorList filteredCreators={filteredCreators} />
      </div>
    </ProtectedRoute>
  );
};

export default withSuspense(Activity);
