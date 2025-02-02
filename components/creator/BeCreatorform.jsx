import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicInput from "../UI/Input";


const BeCreatorform = ({ setShowModal }) => {
  const [inputs, setInputs] = useState([
    {
      id: "name",
      label: "Full Name",
      value: "",
      isFocused: false,
      type: "text",
      name: "name",
    },
    {
      id: "email",
      label: "Email Address",
      value: "",
      isFocused: false,
      type: "email",
      name: "email",
    },
    {
      id: "phone",
      label: "Phone Number",
      value: "",
      isFocused: false,
      type: "tel",
      name: "phone",
    },
    {
      id: "socialLink",
      label: "Link to Social Media Handle",
      value: "",
      isFocused: false,
      type: "url",
      name: "socialLink",
    },
  ]);
  const handleChange = (id, value, isFocused = false) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id
          ? { ...input, value, isFocused: isFocused ?? input.isFocused }
          : input
      )
    );
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      platform: e.target.platform.value,
      category: e.target.category.value,
      socialLink: e.target.socialLink.value,
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
      <div className="bg-black border border-[#4e4e4e] w-full poppins-400 max-w-lg md:p-10 p-3 rounded-lg overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl poppins-700 mb-4 ">
          Become a Creator
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4 text-black">
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

          <select
            name="platform"
            required
            className="w-full p-2 border  rounded-md bg-black text-white"
          >
            <option value="">Primary Platform for Content Creation</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="category"
            required
            className="w-full p-2 border   rounded-md bg-black text-white" 
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
              className="px-4 py-2 bg-[#8C00FF] text-white rounded-lg  font-semibold transition duration-200"
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
