"use client";
import ProtectedRoute from "@/components/ProtectedRoutes";
import withSuspense from "@/components/Suspense";
import { db } from "@/firebase/firebaseConfig";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const Activity = () => {
  const router = useRouter();
  const Spara = useSearchParams();
  const cat = Spara.get("cat"); // Get the category from the query params
  const [creators, setCreators] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch all creators
  useEffect(() => {
    const creatorCollection = collection(db, "creators");
    const getData = onSnapshot(creatorCollection, (snapshot) => {
      const creatorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCreators(creatorData);
      setLoading(false); // Set loading to false once creators are fetched
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

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle category click
  const handleCategoryClick = (category) => {
    router.push(`/v2/creator?cat=${category}`);
  };

  return (
    <ProtectedRoute>
      <div className="px-3 py-2 text-white">
        <div className="w-full overflow-hidden mt-3 poppins-600">
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
              className="flex flex-wrap md:gap-12 gap-4 md:justify-center justify-evenly"
              id="carousel"
            >
              {filteredCreators.map((da, i) => (
                <Link
                  href={`/v1/${da?.id}`}
                  key={i}
                  className=" w-[140px] md:w-52 cursor-pointer snap-center bg-white rounded-lg shadow-lg text-black border gradient-borderr"
                >
                  <div
                    style={{ backgroundColor: da?.color }}
                    className={` rounded-t-lg flex justify-center`}
                  >
                    <img
                      src={da?.image}
                      alt=".."
                      className="md:w-[130px] md:h-[220px] w-[90px] h-[150px]"
                    />
                  </div>
                  <div className="flex justify-between px-2 items-center h-[50px] text-center md:text-[20px] urbanist-800 bg-white rounded-b-lg">
                    <p className="text-left">{da?.name}</p>
                    <div>
                      <img src="/instagram.svg" alt="" />
                      <p className="text-[10px]">{da?.InstaCount}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default withSuspense(Activity);
