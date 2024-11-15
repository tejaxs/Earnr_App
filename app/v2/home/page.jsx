"use client";
import BeCreatorform from "@/components/BeCreatorform";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { db } from "@/firebase/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const { user } = useAuth();
  const [creators, setCreators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [coin, setCoin] = useState(0);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

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
    if (coin >= 0 && coin < 200) {
      setLevel("Level 1");
    } else if (coin >= 200 && coin < 500) {
      setLevel("Level 2");
    } else if (coin >= 500 && coin <= 1000) {
      setLevel("Level 3");
    }
  }, [coin]);

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  return (
    <ProtectedRoute>
      <div className="px-4 py-2 text-white">
        <div className="flex md:hidden  justify-between md:mt-0 mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="text-[20px] text-[#FFCE48] border rounded-full   px-4 urbanist-600"
          >
            Be a Creator !
          </button>
          <Link href={"/account"} className="flex  items-center">
            <span className="bg-[#f4f3fc6a] px-3 rounded-l-xl  poppins-400">
              Free
            </span>
            <img
              src={user?.photoURL || "/person.png"}
              alt=""
              className="relative right-2 w-[36px] h-[36px] rounded-full"
            />
          </Link>
        </div>
        {loading1 ? (
          <Loader />
        ) : (
          <div className="flex justify-center w-full poppins-600 md:mt-6 mt-10">
            <div className="bg-[#DCA546] text-black md:w-[420px] w-full rounded-[16px] flex justify-between mt-4 md:p-4 p-2 px-3">
              <div className="flex flex-col gap-2">
                <div className="text-[40px]">₹ {coin}</div>
                <div>{user?.displayName}</div>
                <div>
                  <button className="bg-white px-2 text-[14px] rounded-[16px]  poppins-500">
                    {level}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <img
                  src="/whitelogo.png"
                  alt=""
                  className="md:w-[120px] w-[100px] md:h-[100px] h-[80px]"
                />

                <button className="text-[14px] border border-black rounded-[16px]  poppins-500">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 md:mt-16 poppins-600 relative">
          <h2 className="text-[18px] md:text-[32px] md:text-center">
            Your Creators
          </h2>

          <div className="w-full overflow-hidden md:mt-6 mt-4 relative">
            {/* Left scroll button */}
            <button
              onClick={scrollLeft}
              className="absolute hidden left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
            >
              &lt;
            </button>

            {/* Carousel */}
            {loading2 ? (
              <Loader />
            ) : (
              <div
                className="flex md:justify-center md:space-x-20 space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
                id="carousel"
                ref={carouselRef}
              >
                {creators?.map((da, i) => (
                  <Link
                    href={`/v1/${da?.id}`}
                    key={i}
                    className="flex-shrink-0 w-40 md:w-60 snap-center bg-white rounded-lg shadow-lg text-black"
                  >
                    <div
                      style={{ backgroundColor: da?.color }}
                      className="rounded-t-lg flex justify-center"
                    >
                      <img
                        src={da?.image}
                        alt=".."
                        className="md:w-[130px] md:h-[220px] w-[90px] h-[160px]"
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
            )}

            {/* Right scroll button */}
            <button
              onClick={scrollRight}
              className="absolute hidden right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2"
            >
              &gt;
            </button>
          </div>
        </div>
        {/* <div className="mt-6 md:mt-12 poppins-600">
          <h2 className="text-[18px] md:text-[32px] md:text-center ">
            Become Super Earnr
          </h2>
          <div className="w-full overflow-hidden mt-3">
            <div
              className="flex md:gap-12 gap-0 md:justify-center space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
              id="carousel"
            >
              {sunbs.map((sub, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 md:w-60 w-48 snap-center bg-[#C4C4C4] md:p-4 p-2 py-4 rounded shadow-lg text-black"
                >
                  <h2 className="md:text-2xl text-base ">{sub?.name}</h2>
                  <div className="flex items-center gap-1">
                    <p className="text-[30px]">₹</p>
                    <p className="text-[30px]">{sub?.rate}</p>
                    <p className="md:text-base text-[12px]">/month</p>
                  </div>
                  <div>
                    <button className="bg-black poppins-700 text-white w-full py-1 rounded-3xl">
                      Upgrade
                    </button>
                  </div>

                  <div className="md:text-base text-[12px] mt-3 poppins-400">
                    {sub?.features?.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div> */}
        {/* <div className="mt-6 md:mt-12">
          <div className="flex justify-between items-center">
    
            <h2 className="text-[18px] md:text-[32px]">Trending Creators</h2>
            <Link href="" className="text-[#FCD758] text-[14px]">See all</Link>
       
          </div>
          
          <div className="w-full overflow-hidden mt-3">
            <div
              className="flex md:flex-wrap md:gap-12 gap-0 md:justify-center space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
              id="carousel"
            >
              {data.map((da, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-40 md:w-60 snap-center bg-white rounded-lg shadow-lg text-black"
                >
                  <div
                    className={`bg-[${da?.color}] rounded-t-lg flex justify-center`}
                  >
                    <img
                      src={da?.image}
                      alt=".."
                      className="md:w-[130px] md:h-[220px] w-[90px] h-[160px]"
                    />
                  </div>
                  <div className="text-center md:text-[20px]">{da?.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        {showModal && <BeCreatorform setShowModal={setShowModal} />}
      </div>
    </ProtectedRoute>
  );
};

export default Home;
