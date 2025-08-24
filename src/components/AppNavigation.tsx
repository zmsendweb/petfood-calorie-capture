
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Menu, User, Home, Book, ListChecks, Flame, Settings, LogOut } from "lucide-react";

export function AppNavigation() {
  const { signOut, user, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Optionally, redirect to the home page or login page
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    { 
      name: "Standards", 
      href: "/standards",
      submenu: [
        { name: "Dog Standards", href: "/standards" },
        { name: "Cat Standards", href: "/cat-standards" }
      ]
    },
    { name: "Show Breeds", href: "/show-breeds" },
    { 
      name: "Pet Management", 
      href: "/pet-profiles",
      submenu: [
        { name: "Pet Profiles", href: "/pet-profiles" },
        { name: "Planning Dashboard", href: "/planning" },
        { name: "Pet Recipes", href: "/pet-recipes" }
      ]
    },
    { 
      name: "Features", 
      href: "/features",
      submenu: [
        { name: "All Features", href: "/features" },
        { name: "Calorie Calculator", href: "/calorie-calculator" }
      ]
    }
  ];

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <div className="flex items-center">
            <SheetTrigger asChild className="mr-4 sm:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <Link to="/" className="mr-6 flex items-center font-semibold">
              Pawsitive
            </Link>
          </div>
          <SheetContent side="left" className="pr-0">
            <SheetHeader className="text-left">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore Pawsitive and manage your account.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <Link to={item.href} className="flex items-center py-2 hover:underline">
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.name} to={subItem.href} className="flex items-center py-2 hover:underline">
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <SheetHeader className="text-left">
              <SheetTitle>Account</SheetTitle>
            </SheetHeader>
            {user ? (
              <div className="grid gap-4 py-4">
                <Link to="/account" className="flex items-center py-2 hover:underline">
                  Account
                </Link>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                <Link to="/auth" className="flex items-center py-2 hover:underline">
                  Sign In
                </Link>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <NavigationMenu className="hidden sm:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.submenu ? (
                  <>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name} className="row-span-1">
                            <NavigationMenuLink asChild>
                              <Link
                                to={subItem.href}
                                className="group block space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Explore {subItem.name}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || "Avatar"} />
                  <AvatarFallback>
                    {user?.email ? user.email[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link to="/account" className="flex items-center gap-2">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem>
                  <Link to="/admin" className="flex items-center gap-2">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/auth">
            <Button variant="outline" size="sm" className="hidden sm:inline-block">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
