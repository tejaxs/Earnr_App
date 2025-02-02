
import React, { useState, useEffect } from "react";

const ActivityTimer = ({ activityDate, activityTime }) => {
  const [remainingTime, setRemainingTime] = useState("");

  // Function to format the remaining time
  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
  
    let timeString = "";
  
    // If days are greater than 0, show days and hours
    if (days > 0) {
      timeString = `${days}d ${hours}h`;
    }
    // If days are 0, but hours are greater than 0, show hours and minutes
    else if (hours > 0) {
      timeString = `${hours}h ${minutes}m`;
    }
    // If hours are 0, but minutes are greater than 0, show minutes and seconds
    else if (minutes > 0) {
      timeString = `${minutes}m ${seconds}s`;
    }
    // If minutes are 0, show only seconds
    else {
      timeString = `${seconds}s`;
    }
  
    return timeString;
  };
  


  useEffect(() => {
    const interval = setInterval(() => {
      // Combine the activity date and time into a Date object
      const deadline = new Date(`${activityDate}T${activityTime}:00`);

      // Get the current time
      const now = new Date();

      // Calculate the time difference
      const timeDifference = deadline - now;

      // If the deadline has passed, clear the interval
      if (timeDifference <= 0) {
        setRemainingTime("Expired");
        clearInterval(interval);
      } else {
        // Update the remaining time
        setRemainingTime(formatTime(timeDifference));
      }
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, [activityDate, activityTime]);

  return (
    <div className="activity-timer">
      {remainingTime}
    </div>
  );
};

export default ActivityTimer;
