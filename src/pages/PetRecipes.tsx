
import { PetRecipeSuggestions, ReminderNotifications } from "@/components/pet-recipes";
import { Toaster } from "sonner";

export function PetRecipes() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pet Food Recipes</h1>
          <p className="text-muted-foreground mt-2">
            Create custom, nutritionally-balanced food recipes for your pets using ingredients you have at home.
          </p>
        </div>

        <ReminderNotifications />
        <PetRecipeSuggestions />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
