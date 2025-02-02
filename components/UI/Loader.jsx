import React from "react";

const Loader = () => {
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="relative w-12 h-12">
        <div class="absolute inset-0 w-full h-full border-4 border-[#8C00FF] rounded-full animate-ping"></div>
        <div class="absolute inset-0 w-full h-full border-4 border-[#8C00FF] rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default Loader;
