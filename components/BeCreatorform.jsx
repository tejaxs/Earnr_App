import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BeCreatorform = ({ setShowModal }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      platform: e.target.platform.value,
      category: e.target.category.value,
      socialLink: e.target.socialLink.value,
      callDate: e.target.callDate.value,
      callTime: e.target.callTime.value,
    };
    try {
 
        await addDoc(collection(db, "creatorForms"), formData);
        toast.success("We will Contact you shortly");
        setShowModal(false);
      } catch (e) {
        console.error("Error adding document: ", e);
        toast.error("Failed to Inquire. Please try again.");
      }
  };
  return (
    <div className="fixed inset-0 px-4 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full poppins-400 max-w-lg p-3 rounded-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl poppins-700 mb-4 text-black">Become a Creator</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4 text-black">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            name="platform"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Primary Platform for Content Creation</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="category"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Content Category</option>
            <option value="Vlogs">Vlogs</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Fashion">Fashion</option>
            <option value="Tech">Tech</option>
            <option value="Fitness">Fitness</option>
            <option value="Travel">Travel</option>
            <option value="Music">Music</option>
            <option value="Comedy">Comedy</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="url"
            name="socialLink"
            placeholder="Link to Social Media Handle"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {/* <div>Availability for a Call/Meet:</div>
          <input
            type="date"
            name="callDate"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="time"
            name="callTime"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          /> */}
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
              className="px-4 py-2 bg-[#FFBE4E] text-white rounded-lg  font-semibold transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeCreatorform;
