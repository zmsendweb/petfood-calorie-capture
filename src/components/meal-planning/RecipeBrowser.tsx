
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Search, Heart } from "lucide-react";
import { useRecipeGenerator } from "@/hooks/use-recipe-generator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecipeBrowserProps {
  onClose: () => void;
}

export function RecipeBrowser({ onClose }: RecipeBrowserProps) {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [breed, setBreed] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryNeeds, setDietaryNeeds] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  
  const { generateRecipes, isLoading } = useRecipeGenerator();
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!breed.trim()) {
      return;
    }

    const result = await generateRecipes({
      petType,
      breed,
      dietaryNeeds: dietaryNeeds || undefined
    });

    if (result?.recipes) {
      setRecipes(result.recipes);
    }
  };

  const toggleFavorite = (recipeId: string) => {
    setFavoriteRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.some((ingredient: string) => 
      ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recipe Library
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={petType} onValueChange={(value: "dog" | "cat") => setPetType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Enter breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />

          <Input
            placeholder="Dietary needs (optional)"
            value={dietaryNeeds}
            onChange={(e) => setDietaryNeeds(e.target.value)}
          />

          <Button onClick={handleSearch} disabled={isLoading || !breed.trim()}>
            {isLoading ? "Searching..." : "Find Recipes"}
          </Button>
        </div>

        {/* Recipe Search */}
        {recipes.length > 0 && (
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
        )}

        {/* Recipe Results */}
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{recipe.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(index.toString())}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favoriteRecipes.includes(index.toString()) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700">Ingredients:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {recipe.ingredients.slice(0, 5).map((ingredient: string, idx: number) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                      {recipe.ingredients.length > 5 && (
                        <li className="text-gray-400">...and {recipe.ingredients.length - 5} more</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700">Instructions:</h4>
                    <ol className="list-decimal list-inside text-gray-600 space-y-1">
                      {recipe.instructions.slice(0, 3).map((instruction: string, idx: number) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                      {recipe.instructions.length > 3 && (
                        <li className="text-gray-400">...{recipe.instructions.length - 3} more steps</li>
                      )}
                    </ol>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {recipe.serving_size}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {petType} recipe
                    </Badge>
                  </div>

                  {recipe.nutritional_benefits && (
                    <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <strong>Benefits:</strong> {recipe.nutritional_benefits.slice(0, 100)}...
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {recipes.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            Enter your pet's breed and click "Find Recipes" to discover healthy homemade meals!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
