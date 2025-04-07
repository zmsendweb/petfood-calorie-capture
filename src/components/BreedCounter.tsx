
import { Badge } from "@/components/ui/badge";
import { 
  getCatBreedCount, 
  catStandards,
  smallCatBreeds,
  mediumCatBreeds,
  largeCatBreeds,
  exoticCatBreeds,
  rareCatBreeds
} from "@/data/catStandards";

import {
  getDogBreedCount,
  dogStandards,
  smallDogBreeds,
  mediumDogBreeds,
  largeDogBreeds,
  specialtyDogBreeds,
  rareDogBreeds
} from "@/data/dogStandards";

import { PetSize, getSizeCategoryStyle } from "@/utils/sizeCategoryImages";

interface BreedCounterProps {
  petType: 'dog' | 'cat';
  onSizeSelect?: (size: PetSize | null) => void;
  selectedSize: PetSize | null;
}

export const BreedCounter = ({ petType, onSizeSelect, selectedSize }: BreedCounterProps) => {
  const counts = petType === 'dog' ? getDogBreedCount() : getCatBreedCount();
  const totalCount = petType === 'dog' ? dogStandards.length : catStandards.length;
  
  const handleSizeClick = (size: PetSize | null) => {
    if (!onSizeSelect) return;
    onSizeSelect(size);
  };
  
  // Define available sizes for each pet type
  const dogSizes: PetSize[] = ['Small', 'Medium', 'Large', 'Specialty', 'Rare'];
  const catSizes: PetSize[] = ['Small', 'Medium', 'Large', 'Exotic', 'Rare'];
  
  // Use the correct array based on pet type
  const availableSizes = petType === 'dog' ? dogSizes : catSizes;
  
  return (
    <div className="w-full rounded-lg bg-white/70 backdrop-blur-sm p-4 mb-6 shadow-sm">
      <h3 className="font-semibold mb-2 text-lg flex items-center">
        Breed Standards Library 
        <Badge variant="info" className="ml-2">
          {totalCount} Total {petType === 'dog' ? 'Dog' : 'Cat'} Breeds
        </Badge>
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {Object.entries(counts).map(([key, count]) => {
          if (key === 'total') return null;
          
          // Define variant types for the badges
          let variant: 
            | "default"
            | "secondary"
            | "destructive"
            | "outline" 
            | "success"
            | "warning"
            | "info"
            | "active"
            | "inactive" = "secondary";
            
          switch(key) {
            case 'small':
              variant = "success";
              break;
            case 'medium':
              variant = "warning";
              break;
            case 'large':
              variant = "info";
              break;
            case 'exotic':
              variant = "active";
              break;
            case 'rare':
              variant = "default";
              break;
            case 'specialty':
              variant = "inactive";
              break;
          }
          
          // Capitalize first letter of category for display
          const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
          
          // Check if this size category is valid for the current pet type
          const isValidSize = availableSizes.includes(displayKey as PetSize);
          
          // Skip display for categories that aren't applicable to the current pet
          if (!isValidSize) return null;
          
          const isSelected = selectedSize === displayKey;
          
          return (
            <Badge 
              key={key} 
              variant={variant}
              className={`cursor-pointer hover:opacity-80 ${isSelected ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handleSizeClick(displayKey as PetSize)}
            >
              {count} {displayKey}
            </Badge>
          );
        })}
        
        <Badge 
          variant="secondary"
          className={`cursor-pointer hover:opacity-80 ${selectedSize === null ? 'ring-2 ring-primary' : ''}`}
          onClick={() => handleSizeClick(null)}
        >
          View All
        </Badge>
      </div>
    </div>
  );
};
