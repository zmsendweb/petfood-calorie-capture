
import { useState } from "react";
import { useFatSecretAPI, FoodItem } from "@/hooks/use-fatsecret-api";
import { toast } from "sonner";

export function useFoodSearch() {
  const [query, setQuery] = useState("");
  const [nlpDescription, setNlpDescription] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [barcodeValue, setBarcodeValue] = useState("");
  const [searchMode, setSearchMode] = useState<"keyword" | "barcode" | "nlp">("keyword");
  
  const { 
    searchFoods, 
    scanBarcode, 
    getFoodDetails,
    parseFoodDescription,
    isLoading 
  } = useFatSecretAPI();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchMode === "keyword" && query.trim()) {
      try {
        const result = await searchFoods(query);
        if (result?.foods?.food) {
          // Handle the case where there's only one food item (which comes as an object, not an array)
          const foodArray = Array.isArray(result.foods.food) 
            ? result.foods.food 
            : [result.foods.food];
          setSearchResults(foodArray);
          
          if (foodArray.length === 0) {
            toast.error("No results found", {
              description: "Try a different search term"
            });
          }
        } else {
          setSearchResults([]);
          toast.error("No results found", {
            description: "Try a different search term"
          });
        }
      } catch (error) {
        console.error("Food search error:", error);
        toast.error("Search error", {
          description: "Unable to search for foods at this time"
        });
      }
    } else if (searchMode === "barcode" && barcodeValue.trim()) {
      try {
        const result = await scanBarcode(barcodeValue);
        if (result?.food_id) {
          const foodDetails = await getFoodDetails(result.food_id);
          if (foodDetails?.food) {
            return foodDetails.food;
          }
        } else {
          toast.error("Barcode not found", {
            description: "This product is not in the FatSecret database"
          });
        }
      } catch (error) {
        console.error("Barcode scan error:", error);
        toast.error("Barcode scan error", {
          description: "Unable to scan barcode at this time"
        });
      }
    } else if (searchMode === "nlp" && nlpDescription.trim()) {
      try {
        const result = await parseFoodDescription(nlpDescription);
        if (result?.food) {
          // Search for the food based on the NLP result
          const searchResult = await searchFoods(result.food.food_name);
          if (searchResult?.foods?.food) {
            const foodArray = Array.isArray(searchResult.foods.food) 
              ? searchResult.foods.food 
              : [searchResult.foods.food];
            setSearchResults(foodArray);
            toast.success("Food identified", {
              description: `Found "${result.food.food_name}" (${result.food.food_quantity} ${result.food.food_unit})`
            });
          }
        } else {
          toast.error("Couldn't parse description", {
            description: "Try being more specific about the food item"
          });
        }
      } catch (error) {
        console.error("NLP description error:", error);
        toast.error("Description parsing error", {
          description: "Unable to parse food description at this time"
        });
      }
    }
    
    return null;
  };

  return {
    query,
    setQuery,
    nlpDescription,
    setNlpDescription,
    barcodeValue,
    setBarcodeValue,
    searchResults,
    searchMode,
    setSearchMode,
    handleSearch,
    isLoading,
    getFoodDetails
  };
}
