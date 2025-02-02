"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseConfig"; // Ensure you export `storage` from your Firebase config
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AuthContext";

const EditProfile = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(photoURL);

  useEffect(() => {
    if (user?.uid) {
      setName(user?.name || "");
      setNumber(user?.phoneNumber || "");
      setPreviewImage(user.photoURL || "/person.png");
    }
  }, [user]);

  const handleBack = () => {
    router.back();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Generate a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set the preview image URL
      };
      reader.readAsDataURL(file);
    }
  };

  
  const uploadImage = async () => {
    if (!selectedFile) return photoURL; // No new file, return the current photoURL

    const storageRef = ref(storage, `profileImages/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading file:", error);
          toast.error("Failed to upload image.");
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPhotoURL(downloadURL);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Upload image and get URL
      const updatedPhotoURL = await uploadImage();

      // Update Firebase Authentication profile

      // Update Firestore document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        photoURL: updatedPhotoURL,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen grad md:px-40 px-0 text-white flex flex-col items-center">
      <Navbar />
      <ProtectedRoute>
        <div className="md:w-5/12 w-full flex flex-col flex-grow">
          <div>
            <button
              onClick={handleBack}
              className="border border-white rounded-full p-1 m-2 md:hidden"
            >
              <img
                src="/back.png"
                alt="Go Back"
                className="w-[14px] h-[14px]"
              />
            </button>
          </div>

          <div className="flex justify-center">
            <div className="mt-4 relative">
              <img
                src={previewImage || "/person.png"}
                alt="Profile"
                className="relative bg-black right-2 w-[126px] h-[126px] rounded-full object-cover"
              />
              <div className="p-2 bg-[#8C00FF] rounded-[8px] absolute bottom-4 right-2">
                <label htmlFor="fileInput">
                  <img src="/edit.png" alt="Edit" className="w-[13px] h-[13px] cursor-pointer" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#1C1B19]  mt-10 pt-6 md:px-10 px-3 pb-10 flex flex-col gap-8 flex-grow">
            <div className="flex flex-col gap-3">
              <label className="urbanist-700 text-[14px]">Name</label>
              <input
                type="text"
                placeholder="Add Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-2 py-1 placeholder:font-semibold urbanist-700 text-black rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="urbanist-700 text-[14px]">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={number}
                readOnly
                className="px-2 py-1 read-only:bg-gray-300 placeholder:font-semibold urbanist-700 text-black rounded-xl"
              />
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={handleSaveChanges}
                className="bg-[#8C00FF] text-white py-2 px-10 urbanist-700 text-center text-black rounded-3xl text-[20px]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>

      <ToastContainer />
    </div>
  );
};

export default EditProfile;
