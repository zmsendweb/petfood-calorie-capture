
import { useState, useEffect } from "react";

type NotificationId = string;

export function useNotifications() {
  const [dismissedNotifications, setDismissedNotifications] = useState<Record<NotificationId, number>>({});

  // Load dismissed notifications from localStorage on mount
  useEffect(() => {
    try {
      const savedDismissed = localStorage.getItem('dismissedNotifications');
      if (savedDismissed) {
        setDismissedNotifications(JSON.parse(savedDismissed));
      }
    } catch (error) {
      console.error("Failed to load dismissed notifications", error);
    }
  }, []);

  // Save to localStorage whenever dismissedNotifications changes
  useEffect(() => {
    localStorage.setItem('dismissedNotifications', JSON.stringify(dismissedNotifications));
  }, [dismissedNotifications]);

  const isDismissed = (id: NotificationId): boolean => {
    const dismissedTime = dismissedNotifications[id];
    if (!dismissedTime) return false;
    
    // Check if 7 days have passed since dismissal
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - dismissedTime < sevenDaysInMs;
  };

  const dismissNotification = (id: NotificationId): void => {
    setDismissedNotifications(prev => ({
      ...prev,
      [id]: Date.now(),
    }));
  };

  return { isDismissed, dismissNotification };
}
