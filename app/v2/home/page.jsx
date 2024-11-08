"use client";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { db } from "@/firebase/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();
  // console.log(user.photoURL);
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const creatorCollection = collection(db, "creators");
    const getData = onSnapshot(creatorCollection, (snapshot) => {
      const creatorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCreators(creatorData);
    });
    return getData;
  }, []);
  console.log(creators);
  
  const data = [
    {
      id: "1",
      name: "Rohan",
      image: "/man1.png",
      color: "#595BD4",
      followers: "1M+",
    },

    {
      id: "2",
      name: "Karan",
      image: "/man2.png",
      color: "#FC4C3F",
      followers: "1M+",
    },
    {
      id: "3",
      name: "Ananya Singh",
      image: "/man3.png",
      color: "#DCA546",
      followers: "1M+",
    },
  ];
  const Trendingdata = [
    {
      name: "Rohan",
      image: "/man1.png",
      color: "#595BD4",
    },
    {
      name: "Karan",
      image: "/man2.png",
      color: "#FC4C3F",
    },
    {
      name: "Tejas Patil",
      image: "/man3.png",
      color: "#DCA546",
    },
  ];
  const sunbs = [
    {
      name: "Free",
      rate: "0",
      features: [
        "Follow up to 3 creators",
        "1x coins for engagement ",
        "Withdrawal in 3-5 days",
        "Unfollow lock : 30 days",
      ],
    },
    {
      name: "Premium",
      rate: "29",
      features: [
        "Follow up to 3 creators",
        "1x coins for engagement ",
        "Withdrawal in 3-5 days",
        "Unfollow lock : 30 days",
      ],
    },
    {
      name: "Premium +",
      rate: "99",
      features: [
        "Follow up to 3 creators",
        "1x coins for engagement ",
        "Withdrawal in 3-5 days",
        "Unfollow lock : 30 days",
      ],
    },
  ];

  return (
    <ProtectedRoute>
      <div className="px-4 py-2 text-white">
        <div className="flex md:hidden  justify-between">
          <Link
            href={"https://forms.gle/GFNgJQMgYyRnckvF6"}
            target="_blank"
            className="text-[20px] text-[#FFCE48] border rounded-full   px-4 urbanist-600"
          >
            Be a Creator !
          </Link>
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
        <div className="flex justify-center w-full poppins-600">
          <div className="bg-[#DCA546] text-black md:w-[420px] w-full rounded-[16px] flex justify-between mt-4 md:p-4 p-2 px-3">
            <div className="flex flex-col gap-2">
              <div className="text-[40px]">0 £</div>
              <div>{user?.displayName}</div>
              <div>
                <button className="bg-white px-2 text-[14px] rounded-[16px]  poppins-500">
                  Level 1
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-[#FFD233] flex justify-center items-center w-[100px] h-[100px] rounded-full border-2 border-white shadow-xl shadow-[#3635357c]">
                <img src="/E.png" alt=".." className="w-[30px] h-[50px]" />
              </div>

              <button className="text-[14px] border border-black rounded-[16px]  poppins-500">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-12 poppins-600">
          <h2 className="text-[18px] md:text-[32px] md:text-center">
            Your Creators
          </h2>
          <div className="w-full overflow-hidden mt-3">
            <div
              className="flex md:flex-wrap md:gap-12 gap-0 md:justify-center space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
              id="carousel"
            >
              {creators?.map((da, i) => (
                <Link
                  href={`/v1/${da?.id}`}
                  key={i}
                  className="flex-shrink-0 w-40 md:w-60 snap-center bg-white rounded-lg shadow-lg text-black"
                >
                  <div
                    style={{ backgroundColor: da?.color }}
                    className={` rounded-t-lg flex justify-center`}
                  >
                    <img
                      src={da?.image}
                      alt=".."
                      className="md:w-[130px] md:h-[220px] w-[90px] h-[160px]"
                    />
                  </div>
                  <div className="flex justify-between px-2 items-center h-[50px]  text-center md:text-[20px] urbanist-800 bg-white rounded-b-lg">
                    <p className="text-left"> {da?.name}</p>
                    <div>
                      {" "}
                      <img src="/instagram.svg" alt="" />
                      <p className="text-[10px]">{da?.InstaCount}</p>
                    </div>{" "}
                  </div>
                </Link>
              ))}
            </div>
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
      </div>
    </ProtectedRoute>
  );
};

export default Home;
