import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebaseConfig";
// import useAuth from "@/hooks/useAuth";
import { addDoc, collection, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Withdraw = ({ setShowModal }) => {
  const { user } = useAuth();
  console.log(user);
  
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
        await addDoc(collection(db, "WithDraw"), { phone, upi, coinsToWithdraw });
        await updateDoc(userDocRef, { amount: currentCoins-coinsToWithdraw });

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

  return (
    <div className="fixed inset-0 px-4 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full poppins-400 max-w-lg p-3 rounded-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl poppins-700 mb-4 text-black">Withdraw Amount</h2>
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
          <input
            type="text"
            name="upi"
            placeholder="Enter your UPI ID"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="tel"
            name="phone"
            value={user?.phoneNumber || ""}
            placeholder="Enter Phone Number"
            required
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
          <input
            type="tel"
            name="coins"
            placeholder="Enter Amount"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          
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
              className="px-4 py-2 bg-[#FFBE4E] text-white rounded-lg font-semibold transition duration-200"
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
