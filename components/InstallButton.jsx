"use client";
import { useEffect, useState } from "react";
import Launch from "./Launch";
import LaunchIOS from "./LaunchIOS";

const InstallButton = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);
  const [platform, setPlatform] = useState("Android");

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);
  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        setPlatform("Android");
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        setPlatform("iOS");
      } else {
        setPlatform("Other");
      }
    };
    detectPlatform();
  }, []);
  console.log(platform);

  useEffect(() => {
    // Check if the app is already in standalone mode
    const checkStandalone = () => {
      // For iOS (Safari)
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        navigator.standalone
      ) {
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
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
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
    setOpen(true);
  };

  const handleClosee = () => {
    setIsVisible(false); // Close the install prompt row
  };

  return (
    isVisible && (
      <div>
        {platform === "iOS" ? (
          <div>
            <button
                onClick={()=>setOpen1(true)}
                className="bg-[#FFCD48] text-center urbanist-700 py-2 px-6 text-black rounded-3xl w-full text-[20px]"
              >
                GET APP
              </button>
          </div>
        ) : (
          <div>
            {isInstallable && !isStandalone ? (
              <button
                onClick={handleInstallClick}
                className="bg-[#FFCD48] text-center urbanist-700 py-2 px-6 text-black rounded-3xl w-full text-[20px]"
              >
                GET APP
              </button>
            ) : (
              <button
                onClick={handleLaunchClick}
                className="bg-[#FFCD48] text-center urbanist-700 py-2 px-6 text-black rounded-3xl w-full text-[20px]"
              >
                Launch App
              </button>
            )}
          </div>
        )}

        <Launch open={open} handleClose={handleClose} />
        <LaunchIOS open1={open1} handleClose1={handleClose1} />
      </div>
    )
  );
};

export default InstallButton;
