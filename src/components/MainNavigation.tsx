
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
    { path: "/standards", label: "Standards", icon: Bone, submenu: [
      { path: "/standards", label: "Dog Standards", icon: Bone },
      { path: "/cat-standards", label: "Cat Standards", icon: Bone },
    ]},
    { path: "/pet-profiles", label: "Profiles", icon: Calendar },
    { path: "/planning", label: "Planning", icon: Search },
    { path: "/pet-recipes", label: "Recipes", icon: Bell },
    { path: "/features", label: "Features", icon: Book },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => {
              if (item.submenu) {
                return (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuTrigger className={isActive(item.path) || (item.submenu && item.submenu.some(subitem => isActive(subitem.path))) ? "bg-primary text-primary-foreground" : ""}>
                      <span className="flex items-center gap-1.5">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="flex flex-col w-[200px] gap-1 p-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.path}
                            to={subitem.path}
                            className={`block py-2 px-3 rounded-md ${isActive(subitem.path) ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
                          >
                            <span className="flex items-center gap-2">
                              <subitem.icon className="h-4 w-4" /> {subitem.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }
              
              return (
                <NavigationMenuItem key={item.path}>
                  <Link to={item.path}>
                    <Button 
                      variant={isActive(item.path) ? "default" : "ghost"} 
                      size="sm"
                      className="flex items-center gap-1.5"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              );
            })}
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
                <div className="flex flex-col w-[200px] gap-1 p-2">
                  {navItems.map((item) => {
                    // For items with submenu, show them and their children
                    if (item.submenu) {
                      return (
                        <div key={item.path} className="space-y-1">
                          <div className="font-semibold px-3 py-1.5 text-sm text-muted-foreground">
                            {item.label}
                          </div>
                          {item.submenu.map((subitem) => (
                            <Link 
                              key={subitem.path}
                              to={subitem.path} 
                              className={`block py-2 px-3 rounded-md ${isActive(subitem.path) ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
                            >
                              <span className="flex items-center gap-2">
                                <subitem.icon className="h-4 w-4" /> {subitem.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      );
                    }
                    
                    // Regular items
                    return (
                      <Link 
                        key={item.path}
                        to={item.path} 
                        className={`block py-2 px-3 rounded-md ${isActive(item.path) ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}`}
                      >
                        <span className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" /> {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
