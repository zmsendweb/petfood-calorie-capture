
import { useState } from "react";
import { DogStandardsHeader } from "@/components/standards/DogStandardsHeader";
import { DogBreedFilters } from "@/components/standards/DogBreedFilters";
import { DogBreedCard } from "@/components/standards/DogBreedCard";
import { StandardsFooter } from "@/components/standards/StandardsFooter";
import { ModernNavigation } from "@/components/navigation/ModernNavigation";
import { dogStandards } from "@/data/dogStandards";
import { PetSize } from "@/utils/sizeCategoryImages";

export default function Standards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<PetSize | null>(null);
  const [showNutritionQuery, setShowNutritionQuery] = useState(false);
  const [ageFilter, setAgeFilter] = useState("adult");

  const filteredBreeds = dogStandards.filter((breed) => {
    const matchesSearch =
      searchTerm === "" ||
      breed.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize =
      selectedSize === null || breed.size === selectedSize;

    return matchesSearch && matchesSize;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <ModernNavigation />
      <div className="container mx-auto px-4 py-8">
        <DogStandardsHeader />
        <DogBreedFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          showNutritionQuery={showNutritionQuery}
          setShowNutritionQuery={setShowNutritionQuery}
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map((breed, index) => (
            <DogBreedCard key={breed.breed || index} dog={breed} ageFilter={ageFilter} />
          ))}
        </div>
        <StandardsFooter />
      </div>
    </div>
  );
}
