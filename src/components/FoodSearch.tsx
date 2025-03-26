
import { useState } from "react";
import { useFatSecretAPI, FoodItem, SearchResult } from "@/hooks/use-fatsecret-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, RefreshCw, Barcode, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FoodSearchProps {
  onSelectFood?: (food: FoodItem) => void;
}

export function FoodSearch({ onSelectFood }: FoodSearchProps) {
  const [query, setQuery] = useState("");
  const [nlpDescription, setNlpDescription] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [searchMode, setSearchMode] = useState<"keyword" | "barcode" | "nlp">("keyword");
  const [barcodeValue, setBarcodeValue] = useState("");
  
  const { 
    searchFoods, 
    scanBarcode, 
    getFoodDetails,
    parseFoodDescription,
    isLoading 
  } = useFatSecretAPI();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedFood(null);
    
    if (searchMode === "keyword" && query.trim()) {
      const result = await searchFoods(query);
      if (result?.foods?.food) {
        // Handle the case where there's only one food item (which comes as an object, not an array)
        const foodArray = Array.isArray(result.foods.food) 
          ? result.foods.food 
          : [result.foods.food];
        setSearchResults(foodArray);
      } else {
        setSearchResults([]);
        toast({
          title: "No results found",
          description: "Try a different search term",
          variant: "default"
        });
      }
    } else if (searchMode === "barcode" && barcodeValue.trim()) {
      const result = await scanBarcode(barcodeValue);
      if (result?.food_id) {
        const foodDetails = await getFoodDetails(result.food_id);
        if (foodDetails?.food) {
          setSelectedFood(foodDetails.food);
          if (onSelectFood) onSelectFood(foodDetails.food);
        }
      } else {
        toast({
          title: "Barcode not found",
          description: "This product is not in the FatSecret database",
          variant: "destructive"
        });
      }
    } else if (searchMode === "nlp" && nlpDescription.trim()) {
      const result = await parseFoodDescription(nlpDescription);
      if (result?.food) {
        // Search for the food based on the NLP result
        const searchResult = await searchFoods(result.food.food_name);
        if (searchResult?.foods?.food) {
          const foodArray = Array.isArray(searchResult.foods.food) 
            ? searchResult.foods.food 
            : [searchResult.foods.food];
          setSearchResults(foodArray);
          toast({
            title: "Food identified",
            description: `Found "${result.food.food_name}" (${result.food.food_quantity} ${result.food.food_unit})`,
            variant: "default"
          });
        }
      } else {
        toast({
          title: "Couldn't parse description",
          description: "Try being more specific about the food item",
          variant: "destructive"
        });
      }
    }
  };

  const handleSelectFood = async (foodId: string) => {
    const result = await getFoodDetails(foodId);
    if (result?.food) {
      setSelectedFood(result.food);
      if (onSelectFood) onSelectFood(result.food);
    }
  };

  const getCaloriesRange = (food: FoodItem): string => {
    if (!food.servings) return "N/A";
    
    const servingArray = Array.isArray(food.servings.serving) 
      ? food.servings.serving 
      : [food.servings.serving];
    
    const calories = servingArray.map(s => parseInt(s.calories.toString()));
    const min = Math.min(...calories);
    const max = Math.max(...calories);
    
    return min === max ? `${min} cal` : `${min}-${max} cal`;
  };

  return (
    <div className="w-full space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Food Search</CardTitle>
          <CardDescription>
            Search for foods to track calories for your pet's diet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center space-x-2">
            <Button
              variant={searchMode === "keyword" ? "default" : "outline"}
              onClick={() => setSearchMode("keyword")}
              size="sm"
            >
              <Search className="h-4 w-4 mr-2" />
              Keyword
            </Button>
            <Button
              variant={searchMode === "barcode" ? "default" : "outline"}
              onClick={() => setSearchMode("barcode")}
              size="sm"
            >
              <Barcode className="h-4 w-4 mr-2" />
              Barcode
            </Button>
            <Button
              variant={searchMode === "nlp" ? "default" : "outline"}
              onClick={() => setSearchMode("nlp")}
              size="sm"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Description
            </Button>
          </div>
          
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            {searchMode === "keyword" && (
              <Input
                placeholder="Search for pet food (e.g., Royal Canin, Purina)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
            )}
            
            {searchMode === "barcode" && (
              <Input
                placeholder="Enter barcode number"
                value={barcodeValue}
                onChange={(e) => setBarcodeValue(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
            )}
            
            {searchMode === "nlp" && (
              <Input
                placeholder="Describe the food (e.g., 1 cup of dry dog food)"
                value={nlpDescription}
                onChange={(e) => setNlpDescription(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
            )}
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {selectedFood ? (
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
                onClick={() => setSelectedFood(null)}
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
      ) : (
        searchResults.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                Found {searchResults.length} results for "{query}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {searchResults.map((food) => (
                  <div 
                    key={food.food_id}
                    className="py-3 cursor-pointer hover:bg-gray-50 rounded px-2"
                    onClick={() => handleSelectFood(food.food_id)}
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
                ))}
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
