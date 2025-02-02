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

const Home = () => {
  const { user } = useAuth();
  const [creators, setCreators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [showModal1, setShowModal1] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip1, setShowTooltip1] = useState(false);
  const tooltipRef = useRef(null);
  const tooltipRef1 = useRef(null);

  // Close the tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef1.current && !tooltipRef1.current.contains(event.target)) {
        setShowTooltip1(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  console.log(user);

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
        {loading1 ? (
          <WaveLoader />
        ) : (
          <div className="flex justify-center w-full md:mt-6 mt-10">
            <div className="bg-[url('/bgimage.png')] relative  md:w-[440px] w-full rounded-[16px] flex justify-between mt-4 md:p-4 p-2 px-3">
              <div className="bg-[#FFA100] text-sm absolute border-white border rounded-full px-2 right-2 urbanist-500 flex">
                {level}{" "}
                <button
                  ref={tooltipRef}
                  className="ml-2 relative group focus:outline-none flex items-center"
                  onClick={() => setShowTooltip(!showTooltip)} // Mobile toggle
                >
                  <div className="text-base flex items-center">
                    <span className=" border-white border text-black  w-[17px] h-[17px] text-[12px] rounded-full bg-white  flex justify-center items-center">
                      i
                    </span>
                  </div>

                  <div
                    className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-sm rounded-lg px-3 py-2 shadow-lg transition-opacity duration-300 ${
                      showTooltip
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    } group-hover:opacity-100 group-hover:visible`}
                  >
                    Level refreshes each month
                  </div>
                </button>
              </div>
              <div className="flex flex-col gap-2 relative md:w-4/6 py-3">
                <div className="text-[40px] flex items-center urbanist-700">
                  {user?.name}
                  {/* Eye button with tooltip */}
                </div>
                <div className="flex flex-col">
                  <div className="flex urbanist-500">
                    Balance:{" "}
                    <button
                      ref={tooltipRef1}
                      className="ml-2 relative group focus:outline-none flex items-center"
                      onClick={() => setShowTooltip1(!showTooltip1)} // Mobile toggle
                    >
                      <div className="text-base flex items-center">
                        <span className="  border  w-[17px] h-[17px] text-[12px] bg-white text-black  flex justify-center items-center rounded-full">
                          i
                        </span>
                      </div>
                      {/* Tooltip */}
                      <div
                        className={`absolute top-full mt-2 md:left-1/2 md:ml-0 ml-8 transform -translate-x-1/2 md:w-max w-[270px] bg-black text-white  md:text-sm text-xs rounded-lg px-3 py-2 shadow-lg transition-opacity duration-300 ${
                          showTooltip1
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        } group-hover:opacity-100 group-hover:visible`}
                      >
                        Earning updates on the last day of each month
                      </div>
                    </button>
                  </div>
                  <div className="urbanist-700">{user?.amount}</div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 md:w-2/6 py-3">
                <img
                  src="/whitelogo.png"
                  alt=""
                  className="md:w-[100px] w-[100px] md:h-[85px] h-[80px]"
                />

                <button
                  onClick={() => setShowModal1(true)}
                  className="text-[14px] border bg-white text-black rounded-[16px]  poppins-500 px-4 py-1"
                >
                  Withdraw Now
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 md:mt-16 poppins-600 relative">
          <h2 className="text-[18px] md:text-[32px]">
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
              <WaveLoader />
            ) : (
              <div
                className="flex md:space-x-20 space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory "
                id="carousel"
                ref={carouselRef}
              >
                {creators?.map((da, i) => (
                  <Link
                    href={`/v1/${da?.id}`}
                    key={i}
                    className="flex-shrink-0 w-40 md:w-60 snap-center bg-white rounded-lg shadow-lg text-black border border-[#8C00FF]"
                  >
                    <div className="rounded-t-lg flex justify-center bg-[url('/bg-image.png')] ">
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
        {showModal1 && <Withdraw setShowModal={setShowModal1} />}
        {showModal && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-4xl relative z-50 h-[90%] overflow-y-auto custom-scrollbar"
            >
              <h2 className="text-3xl poppins-600 text-[#DCA546] mb-6 text-center">
                How to Get Started with Earnr
              </h2>
              <HowToUse />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-black text-2xl font-bold hover:text-[#DCA546]"
              >
                &times;
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Home;
