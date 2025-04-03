
import { PetRecipeSuggestions, ReminderNotifications } from "@/components/pet-recipes";
import { Toaster } from "sonner";
import { PageHeader } from "@/components/PageHeader";

export function PetRecipes() {
  return (
    <div className="container py-6 max-w-5xl mx-auto">
      <PageHeader 
        title="Pet Food Recipes" 
        description="Custom nutritionally-balanced recipes"
      />

      <div className="space-y-6">
        <ReminderNotifications />
        <PetRecipeSuggestions />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
