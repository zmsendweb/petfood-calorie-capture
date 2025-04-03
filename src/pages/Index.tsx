
import { Link } from "react-router-dom";
import { Dashboard } from "@/components/Dashboard";
import { MealEntry } from "@/types/mealTypes";
import { useEffect } from "react";
import { toast } from "sonner";
import { Bell } from "lucide-react";
import { Toaster } from "sonner";
import { useNotifications } from "@/hooks/use-notifications";
import { PageHeader } from "@/components/PageHeader";

export function Index() {
  // Initialize with an empty array of meals
  const initialMeals: MealEntry[] = [];
  const { isDismissed, dismissNotification } = useNotifications();
  const REMINDER_NOTIFICATION_ID = "index-page-reminder";
  
  // Add a reminder notification after component mounts
  useEffect(() => {
    if (isDismissed(REMINDER_NOTIFICATION_ID)) return;
    
    const timeout = setTimeout(() => {
      toast(
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Don't miss your pet's progress tracking!</p>
            <p className="text-sm text-gray-500">
              Pets with consistent tracking achieve goals 3x faster.
            </p>
          </div>
        </div>,
        {
          duration: 0, // Stay until dismissed
          closeButton: true, // Ensure close button is visible
          action: {
            label: "Track Now",
            onClick: () => {
              toast.success("Great decision for your pet's health!");
              dismissNotification(REMINDER_NOTIFICATION_ID);
            }
          },
          onDismiss: () => {
            dismissNotification(REMINDER_NOTIFICATION_ID);
          }
        }
      );
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [isDismissed, dismissNotification]);
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <PageHeader 
        title="Pet Nutrition Tracker"
        showBackButton={false}
      />
      
      <Dashboard meals={initialMeals} />
      <Toaster position="top-right" />
    </div>
  );
}
