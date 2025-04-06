
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PawPrint } from "lucide-react";
import { getSizeCategoryStyle } from "@/utils/sizeCategoryImages";
import { DogStandard } from "@/data/types/dogTypes";

interface DogBreedCardProps {
  dog: DogStandard;
  ageFilter: string;
}

export const DogBreedCard = ({ dog, ageFilter }: DogBreedCardProps) => {
  const sizeStyle = getSizeCategoryStyle(dog.size);
  
  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl">{dog.breed}</span>
          <span className={`inline-flex items-center gap-2 text-sm font-normal px-3 py-1.5 rounded-full ${sizeStyle.bgColor} ${sizeStyle.color}`}>
            <PawPrint className="h-4 w-4" />
            {dog.size}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">
              {ageFilter === "puppy" ? "Puppy" : ageFilter === "adult" ? "Adult" : "Senior"} Daily Calorie Range
            </p>
            <p className="font-semibold">
              {dog.ageSpecificCalories[ageFilter as keyof typeof dog.ageSpecificCalories].min} - {dog.ageSpecificCalories[ageFilter as keyof typeof dog.ageSpecificCalories].max} calories
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Recommended Meals
            </p>
            <p className="font-semibold">
              {dog.mealsPerDay[ageFilter as keyof typeof dog.mealsPerDay]} times per day
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nutrition Notes</p>
            <p className="text-sm">
              {dog.nutritionNotes[ageFilter as keyof typeof dog.nutritionNotes]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
