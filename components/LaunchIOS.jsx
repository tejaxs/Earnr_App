import { Modal } from "@mui/material";
import React from "react";

const LaunchIOS = ({ open1, handleClose1 }) => {
  return (
    <Modal
      open={open1}
      onClose={handleClose1}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className=" flex justify-center items-center"
    >
      <div className="flex flex-col items-center justify-center gap-3  poppins-400 absolute z-10 h-2/6 bg-white text-black md:w-[350px] w-10/12 rounded-xl p-4 border-none">
        <h2 className="text-[20px] text-[#FFCD48] poppins-600">Earnr</h2>
        <p className="text-sm">
          1.Tap the share button in your browser.
        </p>
        <p className="text-sm">
          2. In the popup menu actions, scroll down and tap on the Add to Home
          Screen.
        </p>
        <p className="text-sm">
          3. Tap on the Add button on the Top-Right corner.
        </p>
      </div>
    </Modal>
  );
};

export default LaunchIOS;
