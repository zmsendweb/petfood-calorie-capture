
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/components/Dashboard";
import { MealEntry } from "@/types/mealTypes";
import { useEffect } from "react";
import { toast } from "sonner";
import { Calendar, Bell, Home, Bone, Search, Menu } from "lucide-react";
import { Toaster } from "sonner";
import { useNotifications } from "@/hooks/use-notifications";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Pet Nutrition Tracker</h1>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/standards">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bone className="h-4 w-4" />
                    Breed Standards
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pet-profiles">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Pet Profiles
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/planning">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Planning
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pet-recipes">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Pet Recipes
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Menu className="h-5 w-5" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col w-[200px] gap-2 p-4">
                    <Link to="/" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
                      <span className="flex items-center gap-2">
                        <Home className="h-4 w-4" /> Home
                      </span>
                    </Link>
                    <Link to="/standards" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
                      <span className="flex items-center gap-2">
                        <Bone className="h-4 w-4" /> Breed Standards
                      </span>
                    </Link>
                    <Link to="/pet-profiles" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Pet Profiles
                      </span>
                    </Link>
                    <Link to="/planning" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
                      <span className="flex items-center gap-2">
                        <Search className="h-4 w-4" /> Planning
                      </span>
                    </Link>
                    <Link to="/pet-recipes" className="block py-2 px-3 hover:bg-gray-100 rounded-md">
                      <span className="flex items-center gap-2">
                        <Bell className="h-4 w-4" /> Pet Recipes
                      </span>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Dashboard meals={initialMeals} />
      <Toaster position="top-right" />
    </div>
  );
}
