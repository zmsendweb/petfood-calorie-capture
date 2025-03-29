
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFatSecretAPI, FoodItem } from "@/hooks/use-fatsecret-api";
import { useNutritionRAG } from "@/hooks/use-nutrition-rag";
import { Dog, Cat } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { IngredientsTab } from "./IngredientsTab";
import { RecipeGenerator } from "./RecipeGenerator";
import { NutritionAnalysis } from "./NutritionAnalysis";

export function PetRecipeSuggestions() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [ingredients, setIngredients] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [recipePrompt, setRecipePrompt] = useState("");
  const [recipe, setRecipe] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { searchFoods, isLoading: isSearching } = useFatSecretAPI();
  const { getAnswer, isLoading: isRagLoading } = useNutritionRAG();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const result = await searchFoods(searchQuery);
    if (result?.foods?.food) {
      const foodArray = Array.isArray(result.foods.food) 
        ? result.foods.food 
        : [result.foods.food];
      setSearchResults(foodArray);
    } else {
      setSearchResults([]);
      toast({
        title: "No results found",
        description: "Try a different search term"
      });
    }
  };

  const addIngredient = (food: FoodItem) => {
    if (!ingredients.some(item => item.food_id === food.food_id)) {
      setIngredients([...ingredients, food]);
      toast({
        title: "Ingredient added",
        description: `${food.food_name} added to your recipe`
      });
    } else {
      toast({
        title: "Ingredient already added",
        description: `${food.food_name} is already in your recipe`
      });
    }
  };

  const removeIngredient = (foodId: string) => {
    setIngredients(ingredients.filter(item => item.food_id !== foodId));
  };

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please add at least one ingredient to generate a recipe"
      });
      return;
    }

    setIsLoading(true);
    try {
      const ingredientList = ingredients.map(item => item.food_name).join(", ");
      const customPrompt = recipePrompt.trim() 
        ? recipePrompt 
        : `Create a simple homemade pet food recipe for a ${petType} using some or all of these ingredients: ${ingredientList}`;
      
      const result = await getAnswer(customPrompt, petType);
      
      if (result) {
        setRecipe(result.answer);
        
        const nutritionPrompt = `Analyze the nutritional value of this ${petType} recipe and explain if it meets basic nutritional needs: ${result.answer}`;
        const nutritionResult = await getAnswer(nutritionPrompt, petType);
        
        if (nutritionResult) {
          setNutritionInfo(nutritionResult.answer);
        }
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error generating recipe",
        description: "Something went wrong. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRecipeTab = () => {
    document.querySelector('[data-value="recipe"]')?.dispatchEvent(new Event('click'));
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {petType === "dog" ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}
          Pet Food Recipe Generator
        </CardTitle>
        <CardDescription>
          Create custom, nutritionally-balanced food recipes for your pets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Select Ingredients</TabsTrigger>
            <TabsTrigger value="recipe">Generate Recipe</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients">
            <IngredientsTab
              petType={petType}
              setPetType={setPetType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              handleSearch={handleSearch}
              isSearching={isSearching}
              ingredients={ingredients}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
            />
          </TabsContent>
          
          <TabsContent value="recipe">
            <RecipeGenerator
              recipePrompt={recipePrompt}
              setRecipePrompt={setRecipePrompt}
              ingredients={ingredients}
              generateRecipe={generateRecipe}
              isLoading={isLoading}
              recipe={recipe}
              petType={petType}
            />
          </TabsContent>
          
          <TabsContent value="nutrition">
            <NutritionAnalysis
              nutritionInfo={nutritionInfo}
              navigateToRecipeTab={navigateToRecipeTab}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
