
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { SearchModes } from "./SearchModes";
import { SearchForm } from "./SearchForm";
import { FoodSearchResults } from "./FoodSearchResults";
import { useFoodSearch } from "./useFoodSearch";

interface FoodSearchProps {
  onSelectFood?: (food: FoodItem) => void;
}

export function FoodSearch({ onSelectFood }: FoodSearchProps) {
  const {
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
  } = useFoodSearch();

  const handleSelectFood = (food: FoodItem) => {
    if (onSelectFood) {
      onSelectFood(food);
    }
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
          <SearchModes searchMode={searchMode} setSearchMode={setSearchMode} />
          
          <SearchForm
            searchMode={searchMode}
            query={query}
            setQuery={setQuery}
            nlpDescription={nlpDescription}
            setNlpDescription={setNlpDescription}
            barcodeValue={barcodeValue}
            setBarcodeValue={setBarcodeValue}
            handleSearch={handleSearch}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <FoodSearchResults 
          searchResults={searchResults} 
          query={query} 
          onSelectFood={handleSelectFood}
          getFoodDetails={getFoodDetails}
        />
      )}
    </div>
  );
}
