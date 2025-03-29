
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Bone, Calendar, Search, Bell, Menu, Book, Mail, Info } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function MainNavigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/standards", label: "Breed Standards", icon: Bone },
    { path: "/pet-profiles", label: "Pet Profiles", icon: Calendar },
    { path: "/planning", label: "Planning", icon: Search },
    { path: "/pet-recipes", label: "Pet Recipes", icon: Bell },
    { path: "/features", label: "Features", icon: Book },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-2">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link to={item.path}>
                  <Button 
                    variant={isActive(item.path) ? "default" : "outline"} 
                    className="flex items-center gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              </NavigationMenuItem>
            ))}
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
                  {navItems.map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      className={`block py-2 px-3 rounded-md ${isActive(item.path) ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" /> {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
