"use client"
import { useEffect, useState } from "react";

const InstallButton = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent the default prompt
      setDeferredPrompt(event); // Save the event for later use
      setIsInstallable(true); // Make the install button visible
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Clean up the event listener
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }

        // Reset the deferred prompt
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false); // Close the install prompt row
  };
  console.log(isInstallable,isVisible);
  
  return (
    isInstallable && isVisible && (
      <div className="fixed top-0 left-0 w-full px-2 py-2 bg-white shadow-lg flex  text-black items-center justify-between">
        <div onClick={handleClose} className="poppins-600">
          X
        </div>
        <p className="text-sm border poppins-600">GET Web App for easy access</p>
        <button
          onClick={handleInstallClick}
          className="bg-[#FFCD48] text-white px-2 py-1 rounded text-sm poppins-600"
        >
          GET APP
        </button>
      </div>
    )
  );
};

export default InstallButton;
