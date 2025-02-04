import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Select Your Top 3 Favorite Creators",
    description: "Choose the creators you like the most to get started.",
    image: "/htu1.png",
  },
  {
    title: "Join Activities & Challenges",
    description:
      "Take part in fun activities and challenges posted by creators.",
    image: "/htu2.png",
  },
  {
    title: "Complete Activities to Earn Earnr Coins",
    description: "Finish tasks and challenges to start earning coins.",
    image: "/htu3.png",
  },
  {
    title: "Collect More Coins to Level Up",
    description: "Earn more coins to increase your level and get rewards.",
    image: "/htu4.png",
  },
  {
    title: "Earnings Based on Your Level and Coins",
    description: "The more you earn, the more you can make and withdraw.",
    image: "/htu5.png",
  },
  {
    title: "Withdraw Your Earnings Monthly",
    description: "Cash out your earnings monthly, directly to your account.",
    image: "/htu6.png",
  },
];

const HowToUse = ({ modalRef, setShowModal }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 md:p-10 rounded-3xl shadow-xl max-w-4xl w-[90%] h-[90%] overflow-y-auto custom-scrollbar relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#8C00FF] text-3xl font-bold transition-colors duration-300"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl poppins-600 text-[#8C00FF] mb-8 text-center">
          How to Get Started with Earnr
        </h2>

        {/* Steps */}
        <div className="flex flex-col gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="md:w-1/2 w-full"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                />
              </motion.div>

              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="md:w-1/2 w-full text-center md:text-left"
              >
                <h3 className="text-2xl md:text-3xl urbanist-600 text-[#8C00FF] mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-700 urbanist-400">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HowToUse;