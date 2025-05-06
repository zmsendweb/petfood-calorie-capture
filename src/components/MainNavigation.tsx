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
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function MainNavigation() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  return (
    <div className="container relative hidden h-16 items-center space-x-4 sm:block">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          My Pet Calorie Calculator
        </span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <Link
          to="/"
          className={`transition-colors hover:text-foreground/80 ${pathname === "/" ? "text-foreground font-medium" : "text-foreground/60"}`}
        >
          Home
        </Link>
        <Link
          to="/standards"
          className={`transition-colors hover:text-foreground/80 ${pathname.includes("/standards") ? "text-foreground font-medium" : "text-foreground/60"}`}
        >
          Dog Standards
        </Link>
        <Link
          to="/cat-standards"
          className={`transition-colors hover:text-foreground/80 ${pathname.includes("/cat-standards") ? "text-foreground font-medium" : "text-foreground/60"}`}
        >
          Cat Standards
        </Link>
        <Link
          to="/pet-profiles"
          className={`transition-colors hover:text-foreground/80 ${pathname.includes("/pet-profiles") ? "text-foreground font-medium" : "text-foreground/60"}`}
        >
          Pet Profiles
        </Link>
        <Link
          to="/planning"
          className={`transition-colors hover:text-foreground/80 ${pathname.includes("/planning") ? "text-foreground font-medium" : "text-foreground/60"}`}
        >
          Planning
        </Link>
        <Link
          to="/pet-recipes"
          className={`transition-colors hover:text-foreground/80 ${pathname.includes("/pet-recipes") ? "text-foreground font-medium" : "text-foreground/60"}`}
        >
          Pet Recipes
        </Link>
        <Link
          to="/features"
          className={`transition-colors hover:text-foreground/80 ${pathname.includes("/features") ? "text-foreground font-medium" : "text-foreground/60"}`}
        >
          Features
        </Link>
        <Link
          to="/contact"
          className={`transition-colors hover:text-foreground/80 ${pathname.includes("/contact") ? "text-foreground font-medium" : "text-foreground/60"}`}
        >
          Contact
        </Link>
        {isAdmin && (
          <Link
            to="/admin"
            className={`transition-colors hover:text-foreground/80 ${pathname.includes("/admin") ? "text-foreground font-medium" : "text-foreground/60"}`}
          >
            Admin
          </Link>
        )}
      </nav>
      
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarFallback>{user.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/pet-profiles">Pet Profiles</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/planning">Planning</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="outline">
            <Link to="/auth">Login</Link>
          </Button>
        )}
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="sm:hidden">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold">My Pet Calorie Calculator</span>
          </Link>
          <nav className="grid gap-6 pt-6 text-sm">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80"
            >
              Home
            </Link>
            <Link
              to="/standards"
              className="transition-colors hover:text-foreground/80"
            >
              Dog Standards
            </Link>
            <Link
              to="/cat-standards"
              className="transition-colors hover:text-foreground/80"
            >
              Cat Standards
            </Link>
            <Link
              to="/pet-profiles"
              className="transition-colors hover:text-foreground/80"
            >
              Pet Profiles
            </Link>
            <Link
              to="/planning"
              className="transition-colors hover:text-foreground/80"
            >
              Planning
            </Link>
             <Link
              to="/pet-recipes"
              className="transition-colors hover:text-foreground/80"
            >
              Pet Recipes
            </Link>
            <Link
              to="/features"
              className="transition-colors hover:text-foreground/80"
            >
              Features
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-foreground/80"
            >
              Contact
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="transition-colors hover:text-foreground/80"
              >
                Admin
              </Link>
            )}
            {!user ? (
              <Link
                to="/auth"
                className="transition-colors hover:text-foreground/80"
              >
                Login
              </Link>
            ) : (
              <Button variant="outline" onClick={() => signOut()}>
                Logout
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
