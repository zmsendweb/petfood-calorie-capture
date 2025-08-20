import { catStandards } from "@/data/catStandards";
import { dogStandards } from "@/data/dogStandards";
import { showCatBreeds } from "@/data/show-breeds/catBreeds";
import { showDogBreeds } from "@/data/show-breeds/dogBreeds";

// Extract all cat breed names from all data sources
export const getAllCatBreedNames = (): string[] => {
  const standardsNames = catStandards.map(cat => cat.breed);
  const showNames = showCatBreeds.map(cat => cat.name);
  
  // Combine and deduplicate
  const allNames = [...new Set([...standardsNames, ...showNames])];
  return allNames.sort();
};

// Extract all dog breed names from all data sources
export const getAllDogBreedNames = (): string[] => {
  const standardsNames = dogStandards.map(dog => dog.breed);
  const showNames = showDogBreeds.map(dog => dog.name);
  
  // Combine and deduplicate
  const allNames = [...new Set([...standardsNames, ...showNames])];
  return allNames.sort();
};

// Check if a breed name is a cat breed
export const isCatBreed = (breedName: string): boolean => {
  const catNames = getAllCatBreedNames();
  return catNames.some(catBreed => 
    breedName.toLowerCase().includes(catBreed.toLowerCase()) || 
    catBreed.toLowerCase().includes(breedName.toLowerCase())
  );
};

// Check if a breed name is a dog breed
export const isDogBreed = (breedName: string): boolean => {
  const dogNames = getAllDogBreedNames();
  return dogNames.some(dogBreed => 
    breedName.toLowerCase().includes(dogBreed.toLowerCase()) || 
    dogBreed.toLowerCase().includes(breedName.toLowerCase())
  );
};

// Get all breed names (cats and dogs combined)
export const getAllBreedNames = (): { cats: string[], dogs: string[] } => {
  return {
    cats: getAllCatBreedNames(),
    dogs: getAllDogBreedNames()
  };
};