import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebaseConfig";
// import useAuth from "@/hooks/useAuth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicInput from "../UI/Input";


const Withdraw = ({ setShowModal }) => {
  const { user } = useAuth();
  console.log(user);
  const [inputs, setInputs] = useState([
    {
      id: "upi",
      label: "Enter UPI Id",
      value: "",
      isFocused: false,
      type: "text",
      name: "upi",
    },
    {
      id: "phone",
      label: "Enter Phone Number",
      value: `${user?.phoneNumber || ""}`,
      isFocused: false,
      type: "tel",
      name: "phone",
    },
    {
      id: "coins",
      label: "Enter Amount",
      value: "",
      isFocused: false,
      type: "tel",
      name: "coins",
    },
  ]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const phone = user?.phoneNumber;
    const upi = e.target.upi.value;
    const coinsToWithdraw = parseInt(e.target.coins.value, 10);

    try {
      const userDocRef = doc(db, "users", user?.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const currentCoins = parseFloat(userDoc.data().amount) || 0;
        if (currentCoins < coinsToWithdraw || coinsToWithdraw <= 0) {
          toast.error("Insufficient amount for withdrawal");
          return;
        }

        // Proceed with withdrawal request and coin update
        await addDoc(collection(db, "WithDraw"), {
          phone,
          upi,
          coinsToWithdraw,
        });
        await updateDoc(userDocRef, { amount: currentCoins - coinsToWithdraw });

        toast.success("Money will be credited shortly");

        setShowModal(false);
      } else {
        toast.error("User data not found");
      }
    } catch (e) {
      console.error("Error processing withdrawal: ", e);
      toast.error("Please try again.");
    }
  };
  const handleChange = (id, value, isFocused = false) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id
          ? { ...input, value, isFocused: isFocused ?? input.isFocused }
          : input
      )
    );
  };
  return (
    <div className="fixed inset-0 px-4 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-black w-full border border-[#4e4e4e] shadow-lg poppins-400 max-w-lg md:p-8 p-3 rounded-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl poppins-700 mb-4">Withdraw Amount</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4 text-black">
          {/* Prepopulate email field */}
          {/* <input
            type="email"
            name="email"
            value={user?.email || ""}
            readOnly
            required
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          /> */}
          {inputs.map((input) => (
            <DynamicInput
              key={input.id}
              id={input.id}
              label={input.label}
              value={input.value}
              isFocused={input.isFocused}
              onChange={handleChange}
              type={input.type}
              name={input.name}
            />
          ))}

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8C00FF] text-white rounded-lg font-semibold transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
