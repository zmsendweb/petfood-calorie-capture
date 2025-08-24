
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Search, Heart, Coffee, Sun, Moon, Utensils } from "lucide-react";
import { useRecipeGenerator } from "@/hooks/use-recipe-generator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllDogBreedNames, getAllCatBreedNames } from "@/utils/breedNames";

interface RecipeBrowserProps {
  onClose: () => void;
}

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritional_benefits: string;
  serving_size: string;
  storage: string;
  meal_type?: "breakfast" | "lunch" | "dinner";
}

const getMealTypeIcon = (mealType: string) => {
  switch (mealType?.toLowerCase()) {
    case 'breakfast': return <Coffee className="h-4 w-4" />;
    case 'lunch': return <Sun className="h-4 w-4" />;
    case 'dinner': return <Moon className="h-4 w-4" />;
    default: return <Sun className="h-4 w-4" />;
  }
};

const getMealTypeColor = (mealType: string) => {
  switch (mealType?.toLowerCase()) {
    case 'breakfast': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'lunch': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'dinner': return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const assignMealTypes = (recipes: Recipe[]): Recipe[] => {
  const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;
  return recipes.map((recipe, index) => ({
    ...recipe,
    meal_type: mealTypes[index % 3]
  }));
};

export function RecipeBrowser({ onClose }: RecipeBrowserProps) {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [breed, setBreed] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryNeeds, setDietaryNeeds] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  
  const { generateRecipes, isLoading } = useRecipeGenerator();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Get breed names from database
  const dogBreeds = getAllDogBreedNames();
  const catBreeds = getAllCatBreedNames();
  const availableBreeds = petType === "dog" ? dogBreeds : catBreeds;

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
      const recipesWithMealTypes = assignMealTypes(result.recipes);
      setRecipes(recipesWithMealTypes);
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
          <Select value={petType} onValueChange={(value: "dog" | "cat") => {
            setPetType(value);
            setBreed("");
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
            </SelectContent>
          </Select>

          <Select value={breed} onValueChange={setBreed}>
            <SelectTrigger>
              <SelectValue placeholder="Select breed" />
            </SelectTrigger>
            <SelectContent>
              {availableBreeds.slice(0, 50).map((breedName) => (
                <SelectItem key={breedName} value={breedName}>
                  {breedName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{recipe.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`flex items-center gap-1 ${getMealTypeColor(recipe.meal_type || '')}`}
                      >
                        {getMealTypeIcon(recipe.meal_type || '')}
                        <span className="capitalize">{recipe.meal_type}</span>
                      </Badge>
                    </div>
                  </div>
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

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {recipe.ingredients.map((ingredient: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside text-gray-600 space-y-1">
                      {recipe.instructions.map((instruction: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{instruction}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-3 border-t border-gray-100">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-xs text-gray-700 mb-1 uppercase tracking-wide">
                        Nutritional Benefits
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {recipe.nutritional_benefits}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-2 rounded">
                        <h4 className="font-medium text-xs text-blue-700 mb-1">Serving Size</h4>
                        <p className="text-xs text-blue-600">{recipe.serving_size}</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <h4 className="font-medium text-xs text-green-700 mb-1">Storage</h4>
                        <p className="text-xs text-green-600">{recipe.storage}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {petType} recipe
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {breed}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {recipes.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <Utensils className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No Recipes Yet</h3>
            <p>Select your pet's breed and click "Find Recipes" to discover healthy homemade meals!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
