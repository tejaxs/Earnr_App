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
    description: "Take part in fun activities and challenges posted by creators.",
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

const HowToUse = () => {
  return (
    <div className="flex flex-col gap-12">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center justify-between md:gap-8 gap-2 ${
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
            <h3 className="text-3xl urbanist-600 text-[#DCA546] mb-4">
              {step.title}
            </h3>
            <p className="text-lg text-gray-700 urbanist-400">{step.description}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default HowToUse;
