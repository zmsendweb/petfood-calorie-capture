
import { FoodItem } from "@/hooks/use-fatsecret-api";

interface FoodResultItemProps {
  food: FoodItem;
  onClick: () => void;
  getCaloriesRange: (food: FoodItem) => string;
}

export function FoodResultItem({ food, onClick, getCaloriesRange }: FoodResultItemProps) {
  return (
    <div 
      className="py-3 cursor-pointer hover:bg-gray-50 rounded px-2"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{food.food_name}</h3>
          {food.brand_name && (
            <p className="text-sm text-gray-500">{food.brand_name}</p>
          )}
        </div>
        <div className="text-sm font-semibold">{getCaloriesRange(food)}</div>
      </div>
    </div>
  );
}
