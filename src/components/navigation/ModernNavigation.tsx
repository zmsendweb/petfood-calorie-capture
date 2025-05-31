
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Home, 
  BookOpen, 
  Heart, 
  Calendar, 
  ChefHat, 
  Sparkles, 
  Mail,
  Shield,
  LogOut,
  User,
  Trophy
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dog Standards", href: "/standards", icon: BookOpen },
  { name: "Cat Standards", href: "/cat-standards", icon: Heart },
  { name: "Show Breeds", href: "/show-breeds", icon: Trophy },
  { name: "Pet Profiles", href: "/pet-profiles", icon: User, protected: true },
  { name: "Planning", href: "/planning", icon: Calendar, protected: true },
  { name: "Pet Recipes", href: "/pet-recipes", icon: ChefHat, protected: true },
  { name: "Features", href: "/features", icon: Sparkles },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function ModernNavigation() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const visibleItems = navigationItems.filter(item => 
    !item.protected || (item.protected && user)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/4b1f088b-a45c-451e-910a-581d714f877a.png" 
            alt="mypetcal logo" 
            className="h-8 w-auto"
          />
          <span className="font-bold text-lg hidden sm:inline-block">
            mypetcal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isActivePath(item.href) 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                isActivePath("/admin") 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground"
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Admin</span>
              <Badge variant="secondary" className="ml-1 text-xs">Admin</Badge>
            </Link>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/pet-profiles" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Pet Profiles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/planning" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Planning
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <img 
                    src="/lovable-uploads/4b1f088b-a45c-451e-910a-581d714f877a.png" 
                    alt="mypetcal logo" 
                    className="h-8 w-auto"
                  />
                  <span className="font-bold text-lg">mypetcal</span>
                </div>
                
                <nav className="flex flex-col space-y-1">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isActivePath(item.href) 
                            ? "bg-accent text-accent-foreground" 
                            : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        isActivePath("/admin") 
                          ? "bg-accent text-accent-foreground" 
                          : "text-muted-foreground"
                      }`}
                    >
                      <Shield className="h-5 w-5" />
                      <span>Admin</span>
                      <Badge variant="secondary" className="ml-auto">Admin</Badge>
                    </Link>
                  )}
                </nav>

                {user && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-3 px-3 py-2 text-sm">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">My Account</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start mt-2 text-red-600 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
