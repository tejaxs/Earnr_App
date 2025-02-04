import React, { useEffect, useRef, useState } from "react";

const ProfileCard = ({level,user}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip1, setShowTooltip1] = useState(false);

  
  const tooltipRef = useRef(null);
  const tooltipRef1 = useRef(null);

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
  return (
    <div className="flex justify-center w-full md:mt-6 mt-10 overflow-hidden">
      <div className="bg-[url('/bgimage.png')] relative md:w-[440px] w-full max-w-full rounded-[16px] flex justify-between mt-4 md:p-4 p-2 px-3">
        <div className="bg-[#FFA100] text-sm absolute border-white border rounded-full px-2 right-2 urbanist-500 flex">
          {level}{" "}
          <button
            ref={tooltipRef}
            className="ml-2 relative group focus:outline-none flex items-center"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <div className="text-base flex items-center">
              <span className="border-white border text-black w-[17px] h-[17px] text-[12px] rounded-full bg-white flex justify-center items-center">
                i
              </span>
            </div>
            <div
              className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-sm rounded-lg px-3 py-2 shadow-lg transition-opacity duration-300 ${
                showTooltip ? "opacity-100 visible" : "opacity-0 invisible"
              } group-hover:opacity-100 group-hover:visible`}
            >
              Level refreshes each month
            </div>
          </button>
        </div>
        <div className="flex flex-col gap-2 relative md:w-4/6 py-3">
          <div className="text-[40px] flex items-center urbanist-700">
            {user?.name}
          </div>
          <div className="flex flex-col">
            <div className="flex urbanist-500">
              Balance:{" "}
              <button
                ref={tooltipRef1}
                className="ml-2 relative group focus:outline-none flex items-center"
                onClick={() => setShowTooltip1(!showTooltip1)}
              >
                <div className="text-base flex items-center">
                  <span className="border w-[17px] h-[17px] text-[12px] bg-white text-black flex justify-center items-center rounded-full">
                    i
                  </span>
                </div>
                <div
                  className={`absolute top-full mt-2 md:left-1/2 md:ml-0 ml-8 transform -translate-x-1/2 md:w-max w-[270px] bg-black text-white md:text-sm text-xs rounded-lg px-3 py-2 shadow-lg transition-opacity duration-300 ${
                    showTooltip1 ? "opacity-100 visible" : "opacity-0 invisible"
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
            className="text-[14px] border bg-white text-black rounded-[16px] poppins-500 px-4 py-1"
          >
            Withdraw Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
