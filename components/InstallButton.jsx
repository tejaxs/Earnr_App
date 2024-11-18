"use client";
import { useEffect, useState } from "react";
import Launch from "./Launch";

const InstallButton = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Check if the app is already in standalone mode
    const checkStandalone = () => {
      // For iOS (Safari)
      if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone) {
        setIsStandalone(true); // The app is already installed and launched in standalone mode
      } else {
        setIsStandalone(false); // The app is not in standalone mode
      }
    };

    // Run this check on component mount and window resize (in case of app mode change)
    checkStandalone();
    window.addEventListener("resize", checkStandalone);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent the default prompt
      setDeferredPrompt(event); // Save the event for later use
      setIsInstallable(true); // Make the install button visible
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Clean up the event listeners
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("resize", checkStandalone);
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

  const handleLaunchClick = () => {
    setOpen(true)
  };

  const handleClosee = () => {
    setIsVisible(false); // Close the install prompt row
  };

  return (
    isVisible && (
      <div className="fixed top-0 left-0 w-full px-2 py-2 bg-white shadow-lg md:hidden flex text-black items-center justify-between">
        <div onClick={handleClosee} className="poppins-600 cursor-pointer">
          X
        </div>
        <p className="text-xs poppins-600">GET Web App for easy access</p>
        {isInstallable && !isStandalone ? (
          <button
            onClick={handleInstallClick}
            className="bg-[#FFCD48] text-white px-2 py-1 rounded text-sm poppins-600"
          >
            GET APP
          </button>
        ) : (
          <button
            onClick={handleLaunchClick}
            className="bg-[#48A2FF] text-white px-2 py-1 rounded text-sm poppins-600"
          >
            Launch App
          </button>
        )}
        <Launch open={open}
        handleClose={handleClose}/>
      </div>
    )
  );
};

export default InstallButton;
