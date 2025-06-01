
import { useState } from "react";
import { CatStandardsHeader } from "@/components/standards/CatStandardsHeader";
import { CatBreedFilters } from "@/components/standards/CatBreedFilters";
import { CatBreedCard } from "@/components/standards/CatBreedCard";
import { StandardsFooter } from "@/components/standards/StandardsFooter";
import { AppNavigation } from "@/components/AppNavigation";
import { catStandards } from "@/data/catStandards";
import { PetSize } from "@/utils/sizeCategoryImages";

export default function CatStandards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<PetSize | null>(null);
  const [showNutritionQuery, setShowNutritionQuery] = useState(false);
  const [ageFilter, setAgeFilter] = useState("adult");

  const filteredBreeds = catStandards.filter(breed => {
    const matchesSearch = breed.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = selectedSize === null || breed.size === selectedSize;

    return matchesSearch && matchesSize;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <CatStandardsHeader />
        <CatBreedFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          showNutritionQuery={showNutritionQuery}
          setShowNutritionQuery={setShowNutritionQuery}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map((breed, index) => (
            <CatBreedCard key={breed.breed || index} cat={breed} ageFilter={ageFilter} />
          ))}
        </div>
        <StandardsFooter />
      </div>
    </div>
  );
}
