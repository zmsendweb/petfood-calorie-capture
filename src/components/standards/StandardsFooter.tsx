
import { Separator } from "@/components/ui/separator";

export const StandardsFooter = () => {
  return (
    <footer className="mt-12 py-6">
      <Separator className="mb-6" />
      <div className="text-center text-sm text-gray-500">
        <p>The PetNutrition™ Breed Standards Library is regularly updated to reflect the latest nutritional research.</p>
        <p className="mt-2">© {new Date().getFullYear()} PetNutrition™ — All information should be verified with your veterinarian.</p>
      </div>
    </footer>
  );
};
