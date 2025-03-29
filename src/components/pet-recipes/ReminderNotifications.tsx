
import { useState, useEffect } from "react";
import { Clock, Bell, Heart, Star, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { useNotifications } from "@/hooks/use-notifications";

export function ReminderNotifications() {
  const { petProfiles } = usePetProfiles();
  const { isDismissed, dismissNotification } = useNotifications();
  const [showReminder, setShowReminder] = useState(true);
  
  // Notification ID for this component
  const NOTIFICATION_ID = "pet-recipes-reminder";
  
  // Check if notification was dismissed in the last 7 days
  useEffect(() => {
    if (isDismissed(NOTIFICATION_ID)) {
      setShowReminder(false);
    }
  }, [isDismissed]);
  
  // Psychological triggers - different messages for motivation
  const reminderMessages = [
    {
      title: "Don't miss out on tracking your pet's progress!",
      description: "Consistent tracking leads to 80% better achievement of health goals.",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      action: "Start Tracking"
    },
    {
      title: "Your pet's health milestones await!",
      description: "Pets with tracked nutrition plans live 2-3 years longer on average.",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      action: "View Health Dashboard"
    },
    {
      title: "Daily tracking reminder",
      description: "You haven't logged your pet's meals today. Don't break your streak!",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      action: "Log Meal Now"
    },
    {
      title: "Goal progress at risk",
      description: "Your pet's weight loss goal needs attention - stay on track!",
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      action: "Check Goals"
    }
  ];

  // Select a random message when component mounts
  const [currentMessage, setCurrentMessage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * reminderMessages.length);
    return reminderMessages[randomIndex];
  });

  // Show a toast notification after a delay, only if not dismissed
  useEffect(() => {
    if (isDismissed("toast-" + NOTIFICATION_ID)) return;
    
    const timeout = setTimeout(() => {
      toast.info(
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{currentMessage.title}</p>
            <p className="text-sm text-gray-500">{currentMessage.description}</p>
          </div>
        </div>,
        {
          duration: 0, // Make it stay until dismissed
          action: {
            label: "View",
            onClick: () => {
              toast.success("Navigating to tracking page");
            }
          },
          onDismiss: () => {
            dismissNotification("toast-" + NOTIFICATION_ID);
          }
        }
      );
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timeout);
  }, [currentMessage, isDismissed, dismissNotification]);

  const handleActionClick = () => {
    toast.success("Taking action on your pet's health journey!");
    dismissNotification(NOTIFICATION_ID);
    setShowReminder(false);
  };

  const handleDismiss = () => {
    dismissNotification(NOTIFICATION_ID);
    setShowReminder(false);
  };

  if (!showReminder) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100 relative">
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4 text-gray-500" />
      </button>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="bg-white p-2 rounded-full shadow-sm">
            {currentMessage.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{currentMessage.title}</h3>
            <p className="text-gray-600 mt-1">{currentMessage.description}</p>
            
            {petProfiles.length > 0 && (
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium">{petProfiles[0].name}</span> is waiting for your attention!
              </div>
            )}
            
            <div className="mt-3 flex justify-end">
              <Button 
                size="sm" 
                onClick={handleActionClick}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {currentMessage.action}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
