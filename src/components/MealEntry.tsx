
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Image } from "lucide-react";

interface MealEntry {
  id: string;
  type: string;
  calories: number;
  photo: string;
  timestamp: Date;
}

export const MealEntryForm = ({
  onSave,
}: {
  onSave: (meal: MealEntry) => void;
}) => {
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [photo, setPhoto] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const meal: MealEntry = {
      id: Date.now().toString(),
      type: mealType,
      calories: Number(calories),
      photo: photo || "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80", // Default photo if none provided
      timestamp: new Date(),
    };
    onSave(meal);
    setCalories("");
    setPhoto("");
    setMealType("breakfast");
  };

  return (
    <Card className="p-6 max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Meal Type</Label>
          <div className="flex gap-2 flex-wrap">
            {["breakfast", "lunch", "dinner", "snack"].map((type) => (
              <Button
                key={type}
                type="button"
                variant={mealType === type ? "default" : "outline"}
                onClick={() => setMealType(type)}
                className="flex-1 capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Calories</Label>
          <Input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Enter calories"
            required
            min="0"
            className="transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label>Photo URL (Optional)</Label>
          <Input
            type="url"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Enter photo URL"
            className="transition-all duration-300"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 transition-colors"
          disabled={!calories}
        >
          Save Meal
        </Button>
      </form>
    </Card>
  );
};

export const MealCard = ({ meal }: { meal: MealEntry }) => {
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
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold capitalize">{meal.type}</h3>
        <p className="text-sm text-gray-500">
          {new Date(meal.timestamp).toLocaleString()}
        </p>
      </div>
    </Card>
  );
};
