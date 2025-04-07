
import { useState } from "react";
import { NutritionQuery } from "@/components/NutritionQuery";
import { dogStandards } from "@/data/dogStandards";
import { PetSize } from "@/utils/sizeCategoryImages";
import { BreedCounter } from "@/components/BreedCounter";
import { 
  DogBreedCard, 
  DogBreedFilters, 
  DogStandardsHeader,
  StandardsFooter 
} from "@/components/standards";

const Standards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState<PetSize | null>(null);
  const [showNutritionQuery, setShowNutritionQuery] = useState(false);
  const [ageFilter, setAgeFilter] = useState("adult");

  // Filter dogs based on search term and selected size
  const filteredStandards = dogStandards.filter(dog => {
    // Check if search term matches breed or size
    const searchMatches = 
      searchTerm === "" || 
      dog.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dog.size.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!searchMatches) return false;
    
    // Handle size filtering
    if (selectedSize === null) return true;
    
    if (selectedSize === "Specialty") {
      return dog.isSpecialty === true;
    }
    
    if (selectedSize === "Rare") {
      return dog.isRare === true;
    }
    
    return dog.size === selectedSize;
  });

  // Create a unique ID for each dog to prevent React key duplications
  const getUniqueId = (dog: (typeof dogStandards)[0], index: number) => {
    return `${dog.breed}-${dog.size}-${index}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-8">
      <div className="container max-w-6xl">
        <DogStandardsHeader />

        {/* Pass the selectedSize and setSelectedSize function to BreedCounter */}
        <BreedCounter 
          petType="dog" 
          selectedSize={selectedSize} 
          onSizeSelect={setSelectedSize} 
        />

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

        {showNutritionQuery && (
          <div className="mb-6">
            <NutritionQuery defaultPetType="dog" />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStandards.map((standard, index) => (
            <DogBreedCard 
              key={getUniqueId(standard, index)} 
              dog={standard} 
              ageFilter={ageFilter} 
            />
          ))}
        </div>

        {filteredStandards.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No breeds found matching your search.</p>
          </div>
        )}

        <StandardsFooter />
      </div>
    </div>
  );
};

export default Standards;
