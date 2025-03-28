
import { Card } from "../ui/card";
import { MealEntry } from "@/types/mealTypes";
import { usePetProfiles } from "@/hooks/use-pet-profiles";

export const MealCard = ({ meal }: { meal: MealEntry }) => {
  const { petProfiles } = usePetProfiles();
  const pet = meal.petId ? petProfiles.find(p => p.id === meal.petId) : null;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <img
          src={meal.photo}
          alt={`${meal.type} meal`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1 rounded-full bg-black/50 text-white text-sm backdrop-blur-sm">
            {meal.calories} cal
          </span>
        </div>
        {pet && (
          <div className="absolute top-2 left-2">
            <span className="px-3 py-1 rounded-full bg-primary/80 text-white text-sm backdrop-blur-sm">
              {pet.name}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold capitalize">{meal.type}</h3>
        {meal.foodName && (
          <p className="text-sm font-medium">{meal.foodName}</p>
        )}
        {meal.serving && (
          <p className="text-xs text-gray-500">{meal.serving}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          {new Date(meal.timestamp).toLocaleString()}
        </p>
      </div>
    </Card>
  );
};
