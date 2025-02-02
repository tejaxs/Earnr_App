export default function DualRingLoader() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 relative">
          <div className="absolute w-full h-full border-4 border-[#8C00FF] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute w-8 h-8 top-2 left-2 border-4 border-[#8C00FF] border-t-transparent rounded-full animate-spin-reverse"></div>
        </div>
        <style jsx>{`
          .animate-spin {
            animation: spin 1.5s linear infinite;
          }
  
          .animate-spin-reverse {
            animation: spin-reverse 1.5s linear infinite;
          }
  
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
  
          @keyframes spin-reverse {
            0% {
              transform: rotate(360deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
        `}</style>
      </div>
    );
  }
  