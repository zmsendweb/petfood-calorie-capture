
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { FoodItem } from "@/hooks/use-fatsecret-api";

interface RecipeGeneratorProps {
  recipePrompt: string;
  setRecipePrompt: (prompt: string) => void;
  ingredients: FoodItem[];
  generateRecipe: () => void;
  isLoading: boolean;
  recipe: string;
  petType: "dog" | "cat";
}

export function RecipeGenerator({
  recipePrompt,
  setRecipePrompt,
  ingredients,
  generateRecipe,
  isLoading,
  recipe,
  petType
}: RecipeGeneratorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium mb-1">
          Recipe Instructions (Optional)
        </label>
        <Textarea
          id="prompt"
          placeholder={`Any specific instructions for this ${petType} recipe? (e.g., "High protein", "Low fat", "For senior dogs", etc.)`}
          value={recipePrompt}
          onChange={e => setRecipePrompt(e.target.value)}
          className="min-h-24"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">Selected ingredients: </span>
          <span className="text-sm text-muted-foreground">
            {ingredients.length === 0 
              ? "None" 
              : ingredients.map(i => i.food_name).join(", ")}
          </span>
        </div>
        <Button 
          onClick={generateRecipe} 
          disabled={isLoading || ingredients.length === 0}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Generate Recipe
        </Button>
      </div>
      
      {recipe && (
        <Card className="mt-4 bg-muted/50">
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <div className="whitespace-pre-line">{recipe}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
