
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Bone, Calendar, Search, Bell, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function AppNavigation() {
  return (
    <>
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
    </>
  );
}
