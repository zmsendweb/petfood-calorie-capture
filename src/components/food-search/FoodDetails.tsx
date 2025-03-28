
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { toast } from "@/hooks/use-toast";

interface FoodDetailsProps {
  selectedFood: FoodItem;
  onBack: () => void;
  onSelectFood: (food: FoodItem) => void;
}

export function FoodDetails({ selectedFood, onBack, onSelectFood }: FoodDetailsProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>{selectedFood.food_name}</CardTitle>
            {selectedFood.brand_name && (
              <CardDescription>{selectedFood.brand_name}</CardDescription>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onBack}
          >
            Back to results
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {selectedFood.food_description && (
            <p className="text-sm text-gray-600">{selectedFood.food_description}</p>
          )}
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Serving Information:</h3>
            <div className="divide-y">
              {selectedFood.servings && (
                (Array.isArray(selectedFood.servings.serving) ? 
                  selectedFood.servings.serving : 
                  [selectedFood.servings.serving]
                ).map((serving, index) => (
                  <div key={index} className="py-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{serving.serving_description}</span>
                      <span className="text-sm font-semibold">{serving.calories} cal</span>
                    </div>
                    {serving.metric_serving_amount && (
                      <div className="text-xs text-gray-500">
                        {serving.metric_serving_amount} {serving.metric_serving_unit}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => {
            if (onSelectFood) {
              onSelectFood(selectedFood);
              toast({
                title: "Food added",
                description: `${selectedFood.food_name} has been added to the meal`,
                variant: "default"
              });
            }
          }}
        >
          Add to Meal
        </Button>
      </CardFooter>
    </Card>
  );
}
