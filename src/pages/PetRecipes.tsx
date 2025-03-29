
import { PetRecipeSuggestions, ReminderNotifications } from "@/components/pet-recipes";
import { Toaster } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MainNavigation } from "@/components/MainNavigation";

export function PetRecipes() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Pet Food Recipes</h1>
        </div>
        
        <MainNavigation />
      </div>

      <div className="space-y-8">
        <p className="text-muted-foreground">
          Create custom, nutritionally-balanced food recipes for your pets using ingredients you have at home.
        </p>

        <ReminderNotifications />
        <PetRecipeSuggestions />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
