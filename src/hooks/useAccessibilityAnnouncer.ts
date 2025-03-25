import { useState, useEffect } from "react";

/**
 * Hook for making accessibility announcements
 * @returns [announcement, announce] - Current announcement and function to make new announcements
 */
const useAccessibilityAnnouncer = (): [string, (message: string) => void] => {
  const [announcement, setAnnouncement] = useState("");

  // Reset announcement after it's been read
  useEffect(() => {
    if (announcement) {
      const timer = setTimeout(() => {
        setAnnouncement("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [announcement]);

  const announce = (message: string) => {
    setAnnouncement(message);
  };

  return [announcement, announce];
};

export default useAccessibilityAnnouncer;
