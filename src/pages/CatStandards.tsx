
import { useState } from "react";
import { CatStandardsHeader } from "@/components/standards/CatStandardsHeader";
import { CatBreedFilters } from "@/components/standards/CatBreedFilters";
import { CatBreedCard } from "@/components/standards/CatBreedCard";
import { StandardsFooter } from "@/components/standards/StandardsFooter";
import { AppNavigation } from "@/components/AppNavigation";
import { catStandards } from "@/data/catStandards";

export default function CatStandards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [energyLevelFilter, setEnergyLevelFilter] = useState("all");
  const [groomingNeedsFilter, setGroomingNeedsFilter] = useState("all");

  const filteredBreeds = catStandards.filter(breed => {
    const matchesSearch = breed.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = sizeFilter === "all" || breed.size === sizeFilter;
    const matchesEnergyLevel = energyLevelFilter === "all" || breed.energyLevel === energyLevelFilter;
    const matchesGroomingNeeds = groomingNeedsFilter === "all" || breed.groomingNeeds === groomingNeedsFilter;

    return matchesSearch && matchesSize && matchesEnergyLevel && matchesGroomingNeeds;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <CatStandardsHeader />
        <CatBreedFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sizeFilter={sizeFilter}
          setSizeFilter={setSizeFilter}
          energyLevelFilter={energyLevelFilter}
          setEnergyLevelFilter={setEnergyLevelFilter}
          groomingNeedsFilter={groomingNeedsFilter}
          setGroomingNeedsFilter={setGroomingNeedsFilter}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map((breed, index) => (
            <CatBreedCard key={breed.breed || index} {...breed} />
          ))}
        </div>
        <StandardsFooter />
      </div>
    </div>
  );
}
