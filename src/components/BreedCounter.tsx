
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

interface BreedCounterProps {
  petType: 'dog' | 'cat';
}

export const BreedCounter = ({ petType }: BreedCounterProps) => {
  const counts = petType === 'dog' ? getDogBreedCount() : getCatBreedCount();
  const totalCount = petType === 'dog' ? dogStandards.length : catStandards.length;
  
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
          
          return (
            <Badge key={key} variant={variant}>
              {count} {key.charAt(0).toUpperCase() + key.slice(1)}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
