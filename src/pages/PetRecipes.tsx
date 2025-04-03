
import { PetRecipeSuggestions, ReminderNotifications } from "@/components/pet-recipes";
import { Toaster } from "sonner";
import { PageHeader } from "@/components/PageHeader";

export function PetRecipes() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <PageHeader 
        title="Pet Food Recipes" 
        description="Create custom, nutritionally-balanced food recipes for your pets"
      />

      <div className="space-y-8">
        <ReminderNotifications />
        <PetRecipeSuggestions />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
