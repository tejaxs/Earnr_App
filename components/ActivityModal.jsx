import { Modal } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

const ActivityModal = ({
  open,
  handleClose,
  name,
  reward,
  goal,
  icon,
  time,
}) => {
  // useEffect(() => {
  //   // Prevent scrolling when the modal is open
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
  // }, [isOpen]);

  // if (!isOpen) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="flex flex-col justify-between absolute z-10 top-10 h-5/6 bg-white text-black md:w-[350px] w-10/12 rounded-xl py-4"
        style={{
          backgroundImage: "url(/image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-between m-2 p-3 bg-white rounded-3xl">
          <div>
            <img src={icon} alt="" className="w-[42px] h-[46px]" />
            <div className="relative">
              <p className="absolute -right-11 top-1 text-[14px] bg-[#FFBE4E] rounded-3xl px-8 poppins-600 m-1 ">
                {time}
              </p>
            </div>
          </div>
          <div>
            <h2 className="urbanist-700 md:text-[20px] text-[14px]">{goal}</h2>
            <p className="urbanist-500 md:text-base text-[14px]">{name}</p>
          </div>
          <div>
            <h2 className="urbanist-700 md:text-[20px] text-[14px]">
              {reward}
            </h2>
            <p className="urbanist-500 text-[14px]">Earnr Coins</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            target="_blank"
            href={
              "https://www.instagram.com/reel/DA6RGRaRz8b/?igsh=MThrcDl6ZG4wemtkdw== "
            }
            className="bg-[#FF4B4B] border-2 border-white rounded-full urbanist-500 text-white px-8 py-2"
          >
            Start Activity
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityModal;
