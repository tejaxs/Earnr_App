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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">Become a Creator</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
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
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition duration-200"
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
