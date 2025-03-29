
// Simple notification state management
import { useState, useEffect } from "react";

type DismissedNotifications = {
  [key: string]: number; // timestamp of when it was dismissed
};

export const useNotifications = () => {
  const [dismissedNotifications, setDismissedNotifications] = useState<DismissedNotifications>(() => {
    const saved = localStorage.getItem("dismissedNotifications");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("dismissedNotifications", JSON.stringify(dismissedNotifications));
  }, [dismissedNotifications]);

  const dismissNotification = (id: string) => {
    setDismissedNotifications(prev => ({
      ...prev,
      [id]: Date.now()
    }));
  };

  const isDismissed = (id: string, maxAgeDays = 7) => {
    const timestamp = dismissedNotifications[id];
    if (!timestamp) return false;
    
    // Check if dismissal is older than maxAgeDays
    const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
    return Date.now() - timestamp < maxAgeMs;
  };

  return {
    dismissNotification,
    isDismissed,
    dismissedNotifications
  };
};
