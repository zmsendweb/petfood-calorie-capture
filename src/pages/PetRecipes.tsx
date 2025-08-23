
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeGenerator } from "@/components/pet-recipes/RecipeGenerator";
import { IngredientsTab } from "@/components/pet-recipes/IngredientsTab";
import { AppNavigation } from "@/components/AppNavigation";
import { useFatSecretAPI, FoodItem } from "@/hooks/use-fatsecret-api";
import { useRecipeGenerator } from "@/hooks/use-recipe-generator";
import { ChefHat, Sparkles, Heart, BookOpen } from "lucide-react";

export function PetRecipes() {
  const [activeTab, setActiveTab] = useState("generator");
  const [recipePrompt, setRecipePrompt] = useState("");
  const [ingredients, setIngredients] = useState<FoodItem[]>([]);
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [generatedRecipes, setGeneratedRecipes] = useState<any[]>([]);
  
  const { searchFoods, isLoading: isFoodSearchLoading } = useFatSecretAPI();
  const { generateRecipes, isLoading: isRecipeGenerating } = useRecipeGenerator();

  const generateRecipe = async () => {
    if (!selectedBreed) {
      return;
    }
    
    const ingredientNames = ingredients.map(ingredient => ingredient.food_name);
    const result = await generateRecipes({
      petType,
      breed: selectedBreed,
      ingredients: ingredientNames,
      dietaryNeeds: recipePrompt || undefined
    });
    
    if (result && result.recipes) {
      setGeneratedRecipes(result.recipes);
    }
  };

  const addIngredient = (ingredient: FoodItem) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  const removeIngredient = (ingredientId: string) => {
    setIngredients(prev => prev.filter(item => item.food_id !== ingredientId));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const result = await searchFoods(searchQuery);
      if (result && result.foods) {
        const foods = Array.isArray(result.foods.food) ? result.foods.food : [result.foods.food];
        setSearchResults(foods || []);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handlePetTypeChange = (type: "dog" | "cat") => {
    setPetType(type);
  };

  // Popular breed options
  const dogBreeds = [
    "Labrador Retriever", "Golden Retriever", "German Shepherd", "Bulldog", "Poodle",
    "Beagle", "Rottweiler", "Yorkshire Terrier", "Dachshund", "Siberian Husky"
  ];
  
  const catBreeds = [
    "Persian", "Maine Coon", "Ragdoll", "British Shorthair", "Abyssinian",
    "Siamese", "American Shorthair", "Scottish Fold", "Sphynx", "Russian Blue"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Pet Recipe Central
            </CardTitle>
            <Tabs defaultValue={activeTab} className="w-[400px]" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="generator">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generator
                </TabsTrigger>
                <TabsTrigger value="ingredients">
                  <Heart className="mr-2 h-4 w-4" />
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="library">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Recipe Library
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="generator" className="space-y-4">
              <RecipeGenerator 
                recipePrompt={recipePrompt}
                setRecipePrompt={setRecipePrompt}
                ingredients={ingredients}
                generateRecipe={generateRecipe}
                isLoading={isRecipeGenerating}
                recipe={recipe}
                petType={petType}
                selectedBreed={selectedBreed}
                setSelectedBreed={setSelectedBreed}
                dogBreeds={dogBreeds}
                catBreeds={catBreeds}
                generatedRecipes={generatedRecipes}
              />
            </TabsContent>
            <TabsContent value="ingredients">
              <IngredientsTab 
                petType={petType}
                setPetType={handlePetTypeChange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                handleSearch={handleSearch}
                isSearching={isFoodSearchLoading || isSearching}
                ingredients={ingredients}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
              />
            </TabsContent>
            <TabsContent value="library">
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Generate recipes using the Generator tab to build your recipe library!
                </p>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
