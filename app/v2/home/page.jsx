"use client";

import ProtectedRoute from "@/components/ProtectedRoutes";
import Withdraw from "@/components/creator/WithDraw";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebaseConfig";
import { motion } from "framer-motion";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HowToUse from "@/components/UI/HowToUse";
import WaveLoader from "@/components/Loader/WaveLoader";
import BeCreatorform from "@/components/creator/BeCreatorform";
import ProfileCard from "@/components/Home/ProfileCard";
import MyCreator from "@/components/Home/MyCreator";

const Home = () => {
  const { user } = useAuth();
  const [creators, setCreators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [showModal1, setShowModal1] = useState(false);

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
          setCoin(coinValue); // Set coin balance from the fetched data
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Handle errors
      } finally {
        setLoading1(false);
      }
    };

    fetchCoin(); // Call the function to fetch user data
  }, [user?.uid]); // Dependency array triggers only when user.uid changes
  useEffect(() => {
    const fetchAmount = async () => {
      if (!user?.uid) return; // Early exit if user is not available

      try {
        const userRef = doc(db, "users", user.uid); // Using user.uid directly
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          // Ensure that the coin is a number
          const AmountValue = Number(userData.amount) || 0; // Default to 0 if NaN
          setAmount(AmountValue); // Set coin balance from the fetched data
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Handle errors
      } finally {
        setLoading1(false);
      }
    };

    fetchAmount(); // Call the function to fetch user data
  }, [user?.uid]); // Dependency array triggers only when user.uid changes

  useEffect(() => {
    const creatorCollection = collection(db, "creators");
    const getData = onSnapshot(creatorCollection, (snapshot) => {
      const creatorData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((creator) => creator.followers?.includes(user?.uid));
      setCreators(creatorData);
      setLoading2(false);
    });
    return getData;
  }, [user?.uid]);

  const [level, setLevel] = useState("Level 1");
  useEffect(() => {
    // Check the coin range and set level accordingly
    if (coin >= 0 && coin < 500) {
      setLevel("Level 1");
    } else if (coin >= 500 && coin < 1500) {
      setLevel("Level 2");
    } else if (coin >= 1500 && coin <= 3000) {
      setLevel("Level 3");
    } else if (coin >= 3000 && coin <= 5000) {
      setLevel("Level 4");
    } else if (coin >= 5000 && coin <= 8000) {
      setLevel("Level 5");
    }
  }, [coin]);

  const modalRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false); // Close modal if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick); // Listen for clicks
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup event listener
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="md:px-10 px-4 py-2 text-white">
        <div className="flex md:hidden  justify-between md:mt-0 mt-4 ">
          <button
            onClick={() => setShowModal(true)}
            className="text-[20px] border rounded-full   px-4 urbanist-600"
          >
            How to Use
          </button>
          <Link href={"/account"} className="flex  items-center">
            <img
              src={user?.photoURL || "/person.png"}
              alt=""
              className="relative bg-black right-2 w-[36px] h-[36px] rounded-full"
            />
          </Link>
        </div>
        {loading1 ? <WaveLoader /> : <ProfileCard level={level} user={user} />}

        <MyCreator loading2={loading2} creators={creators} />

        {showModal && <BeCreatorform setShowModal={setShowModal} />}
        {showModal1 && <Withdraw setShowModal={setShowModal1} />}
        {showModal && (
          <HowToUse modalRef={modalRef} setShowModal={setShowModal} />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Home;
