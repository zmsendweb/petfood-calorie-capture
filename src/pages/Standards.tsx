
import { useState } from "react";
import { DogStandardsHeader } from "@/components/standards/DogStandardsHeader";
import { DogBreedFilters } from "@/components/standards/DogBreedFilters";
import { DogBreedCard } from "@/components/standards/DogBreedCard";
import { StandardsFooter } from "@/components/standards/StandardsFooter";
import { AppNavigation } from "@/components/AppNavigation";
import { dogStandards } from "@/data/dogStandards";

export default function Standards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [energyLevelFilter, setEnergyLevelFilter] = useState("all");

  const filteredBreeds = dogStandards.filter((breed) => {
    const matchesSearch =
      searchTerm === "" ||
      breed.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize =
      sizeFilter === "all" || breed.size.toLowerCase() === sizeFilter;
    const matchesEnergy =
      energyLevelFilter === "all" ||
      breed.energyLevel.toLowerCase() === energyLevelFilter;

    return matchesSearch && matchesSize && matchesEnergy;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <DogStandardsHeader />
        <DogBreedFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSize={sizeFilter}
          setSelectedSize={setSizeFilter}
          selectedEnergyLevel={energyLevelFilter}
          setSelectedEnergyLevel={setEnergyLevelFilter}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map((breed, index) => (
            <DogBreedCard key={breed.breed || index} {...breed} />
          ))}
        </div>
        <StandardsFooter />
      </div>
    </div>
  );
}
