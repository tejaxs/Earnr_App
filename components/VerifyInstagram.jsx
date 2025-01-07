"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import Loader from "./Loader";

const generateRandomEmojiString = () => {
  const emojis = [
    "😊",
    "😂",
    "😍",
    "🥺",
    "😎",
    "😜",
    "🤩",
    "😅",
    "😇",
    "🤔",
    "😏",
    "🙃",
    "🧐",
    "🥳",
    "🫣",
    "💀",
    "🔥",
    "💥",
    "🎉",
    "💫",
  ];
  let emojiString = "";
  const randomCount = Math.floor(Math.random() * 5) + 3;
  for (let i = 0; i < randomCount; i++) {
    emojiString += emojis[Math.floor(Math.random() * emojis.length)];
  }
  return emojiString;
};

export default function VerifyInstagram({ userId }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [emojiString, setEmojiString] = useState("");
  const [profile, setProfile] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedEmojiString = localStorage.getItem("emojiString");
    if (storedEmojiString) {
      setEmojiString(storedEmojiString);
    } else {
      const newEmojiString = generateRandomEmojiString();
      setEmojiString(newEmojiString);
      localStorage.setItem("emojiString", newEmojiString);
    }
  }, []);

  useEffect(() => {
    const checkInstagramStatus = async () => {
      if (userId) {
        setLoading(true); // Start loading
        try {
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          const instagramId = userSnap.exists()
            ? userSnap.data().instagramId
            : null;

          if (instagramId) {
            setUsername(instagramId);
            setStep(5);
          }
        } catch (error) {
          toast.error("Error checking Instagram status: " + error.message);
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };

    checkInstagramStatus();
  }, [userId]);

  const handleUsernameSubmit = async () => {
    if (!username) {
      toast.error("Please enter a valid username");
      return;
    }

    try {
      const response = await axios.post("/api/get-instagram", { username });
      setProfile(response.data);
      setProfileUrl(response.data?.profile_pic);

      setStep(2);
    } catch (error) {
      toast.error("Invalid username. Please try again.");
    }
  };

  const handleEmojiAdded = () => setStep(4);

  const handleVerifyInstagram = async () => {
    try {
      const response = await fetch("/api/verify-instagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emojiString,
          username,
        }),
      });

      if (response.ok) {
        const userRef = doc(db, "users", userId);

        // Fetch the current user data to retrieve the amount
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const currentAmount = userData.coin;

          // Ensure currentAmount is treated as a number
          const newAmount =
            (typeof currentAmount === "number"
              ? currentAmount
              : parseFloat(currentAmount)) + 50;

          // Update the user's data
          await setDoc(
            userRef,
            {
              instagramId: username,
              coin: newAmount,
            },
            { merge: true }
          );

          toast.success(
            "Instagram bio verified successfully and 50 coins added!"
          );
          setStep(5);
        } else {
          toast.error("User data not found!");
        }
      } else {
        toast.error("Instagram verification failed!");
      }
    } catch (error) {
      toast.error("Error verifying Instagram: " + error.message);
    }
  };

  const handleCopyEmoji = () => {
    navigator.clipboard.writeText(emojiString);
    toast.success("Emoji string copied to clipboard!");
  };

  const handleGenerateNewString = () => {
    const newEmojiString = generateRandomEmojiString();
    setEmojiString(newEmojiString);
    localStorage.setItem("emojiString", newEmojiString);
    toast.info("Generated a new emoji string!");
  };

  return (
    <div className="md:w-[230px] w-[200px] min-h-[300px]  max-h-[320px] overflow-hidden  cursor-pointer snap-center bg-white rounded-lg shadow-lg text-black border gradient-borderr">
      {loading ? (
        <div className="bg-white text-black p-2 rounded-xl h-full flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="bg-white text-black p-2 rounded-xl h-full flex flex-col justify-center">
          <h1 className="text-lg font-bold text-center mb-2">
            {step === 5 ? "Instagram Verified!" : "Verify Instagram Bio"}
          </h1>

          {step === 1 && (
            <div className="flex flex-col items-center gap-4 mt-2">
              <h2 className="md:text-[18px] urbanist-700">50 Earnr Coins</h2>
              <label htmlFor="username" className="block font-medium">
                Enter Instagram Username
              </label>
              <input
                type="text"
                id="username"
                className=" p-2 w-full border border-gray-300 rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                onClick={handleUsernameSubmit}
                className=" bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-full transition-all"
              >
                Fetch Profile
              </button>
            </div>
          )}

          {step === 2 && profile && (
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-semibold mb-4">Is this your profile?</h2>
              <div className="flex w-full justify-between items-center px-3">
                <img
                  src={profileUrl || "/instagram.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <p className=" font-medium">{profile.username}</p>
                  <p className=" font-medium">{profile.name}</p>
                </div>
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setStep(3)}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-2 rounded-lg"
                >
                  Yes, this is me!
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-2 rounded-lg"
                >
                  No, Try Again
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center gap-4">
              <p className=" mb-2 text-sm">
                Add the following emoji string to your Instagram bio:
              </p>
              <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md mb-4">
                <p className="text-xl font-medium">{emojiString}</p>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleCopyEmoji}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-2 rounded-lg"
                >
                  Copy Emoji
                </button>
                <button
                  onClick={handleGenerateNewString}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-2 rounded-lg"
                >
                  Generate New String
                </button>
              </div>
              <button
                onClick={handleEmojiAdded}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white text-sm px-6 py-2 rounded-lg w-full"
              >
                Added Emoji
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center gap-10">
              <button
                onClick={handleVerifyInstagram}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg w-full"
              >
                Verify Instagram
              </button>
              <p className="text-xl font-medium">{emojiString}</p>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl font-semibold">Congratulations!</h2>
              <p className="mt-2">Instagram ID: @{username}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
