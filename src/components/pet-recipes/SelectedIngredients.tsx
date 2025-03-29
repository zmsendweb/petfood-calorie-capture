
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FoodItem } from "@/hooks/use-fatsecret-api";

interface SelectedIngredientsProps {
  ingredients: FoodItem[];
  removeIngredient: (foodId: string) => void;
}

export function SelectedIngredients({ ingredients, removeIngredient }: SelectedIngredientsProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Selected Ingredients:</h3>
      {ingredients.length === 0 ? (
        <p className="text-muted-foreground">No ingredients selected yet</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead className="w-24">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((food) => (
                <TableRow key={food.food_id}>
                  <TableCell className="font-medium">{food.food_name}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeIngredient(food.food_id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
