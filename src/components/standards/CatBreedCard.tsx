
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PawPrint } from "lucide-react";
import { getSizeCategoryStyle } from "@/utils/sizeCategoryImages";
import { CatStandard } from "@/data/types/catTypes";

interface CatBreedCardProps {
  cat: CatStandard;
  ageFilter: string;
}

export const CatBreedCard = ({ cat, ageFilter }: CatBreedCardProps) => {
  // Determine cat's display category
  let displayCategory: string;
  
  if (cat.isExotic) {
    displayCategory = "Exotic";
  } else if (cat.isRare) {
    displayCategory = "Rare";
  } else {
    displayCategory = cat.size;
  }
  
  // Get the appropriate style for the category
  const sizeStyle = getSizeCategoryStyle(displayCategory);
  
  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl">{cat.breed}</span>
          <span className={`inline-flex items-center gap-2 text-sm font-normal px-3 py-1.5 rounded-full ${sizeStyle.bgColor} ${sizeStyle.color}`}>
            <PawPrint className="h-4 w-4" />
            {displayCategory}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">
              {ageFilter === "kitten" ? "Kitten" : ageFilter === "adult" ? "Adult" : "Senior"} Daily Calorie Range
            </p>
            <p className="font-semibold">
              {cat.ageSpecificCalories[ageFilter as keyof typeof cat.ageSpecificCalories].min} - {cat.ageSpecificCalories[ageFilter as keyof typeof cat.ageSpecificCalories].max} calories
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Recommended Meals
            </p>
            <p className="font-semibold">
              {cat.mealsByAge[ageFilter as keyof typeof cat.mealsByAge]} times per day
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nutrition Notes</p>
            <p className="text-sm">
              {cat.nutritionNotes[ageFilter as keyof typeof cat.nutritionNotes]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
