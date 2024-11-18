import { Modal } from "@mui/material";
import React from "react";

const Launch = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className=" flex justify-center items-center"
    >
      <div className="flex flex-col gap-3  poppins-400 absolute z-10 h-2/6 bg-white text-black md:w-[350px] w-10/12 rounded-xl p-4 border-none">
        <h2 className="text-[20px] text-[#FFCD48] poppins-600">Download Earnr</h2>
        <p className="text-sm">
          1. Tap the icon in top right corner of the browser and then select
          Open Earnr or Add to Home Screen
        </p>
        <p className="text-sm">
          2. If you have previously added the app, you can open it by tapping
          <img
            src="/logo.png"
            alt=""
            className="w-[20px] h-[17px] inline mx-1"
          />
          icon on your Homescreen or app drawer.
        </p>
      </div>
    </Modal>
  );
};

export default Launch;
