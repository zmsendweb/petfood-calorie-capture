
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, ChefHat } from "lucide-react";
import { FoodItem } from "@/hooks/use-fatsecret-api";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritional_benefits: string;
  serving_size: string;
  storage: string;
}

interface RecipeGeneratorProps {
  recipePrompt: string;
  setRecipePrompt: (prompt: string) => void;
  ingredients: FoodItem[];
  generateRecipe: () => void;
  isLoading: boolean;
  recipe: string;
  petType: "dog" | "cat";
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
  dogBreeds: string[];
  catBreeds: string[];
  generatedRecipes: Recipe[];
}

export function RecipeGenerator({
  recipePrompt,
  setRecipePrompt,
  ingredients,
  generateRecipe,
  isLoading,
  recipe,
  petType,
  selectedBreed,
  setSelectedBreed,
  dogBreeds,
  catBreeds,
  generatedRecipes
}: RecipeGeneratorProps) {
  const breeds = petType === "dog" ? dogBreeds : catBreeds;
  return (
    <div className="space-y-6">
      {/* Breed Selection */}
      <div className="space-y-2">
        <Label>Select Breed</Label>
        <Select value={selectedBreed} onValueChange={setSelectedBreed}>
          <SelectTrigger>
            <SelectValue placeholder={`Select a ${petType} breed`} />
          </SelectTrigger>
          <SelectContent>
            {breeds.map((breed) => (
              <SelectItem key={breed} value={breed}>
                {breed}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dietary Instructions */}
      <div>
        <Label htmlFor="prompt">Dietary Instructions (Optional)</Label>
        <Textarea
          id="prompt"
          placeholder={`Any specific dietary requirements? (e.g., "High protein", "Low fat", "For senior pets", etc.)`}
          value={recipePrompt}
          onChange={e => setRecipePrompt(e.target.value)}
          className="min-h-24 mt-2"
        />
      </div>
      
      {/* Ingredients Summary */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <span className="text-sm font-medium">Selected ingredients: </span>
        <span className="text-sm text-muted-foreground">
          {ingredients.length === 0 
            ? "None selected - recipes will use common healthy ingredients" 
            : ingredients.map(i => i.food_name).join(", ")}
        </span>
      </div>

      {/* Generate Button */}
      <Button 
        onClick={generateRecipe} 
        disabled={isLoading || !selectedBreed}
        className="w-full"
        size="lg"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ChefHat className="h-4 w-4 mr-2" />}
        Generate 10 Recipes for {selectedBreed}
      </Button>
      
      {/* Generated Recipes Display */}
      {generatedRecipes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generated Recipes</h3>
          <div className="grid gap-4">
            {generatedRecipes.map((recipe, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">INGREDIENTS</h4>
                    <ul className="text-sm space-y-1">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>• {ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">INSTRUCTIONS</h4>
                    <ol className="text-sm space-y-1">
                      {recipe.instructions.map((instruction, i) => (
                        <li key={i}>{i + 1}. {instruction}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 pt-2 border-t">
                    <div>
                      <h4 className="font-medium text-xs text-muted-foreground mb-1">BENEFITS</h4>
                      <p className="text-xs">{recipe.nutritional_benefits}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-xs text-muted-foreground mb-1">SERVING SIZE</h4>
                      <p className="text-xs">{recipe.serving_size}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-xs text-muted-foreground mb-1">STORAGE</h4>
                      <p className="text-xs">{recipe.storage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
