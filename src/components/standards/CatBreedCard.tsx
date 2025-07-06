
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PawPrint, Sparkles, Loader2 } from "lucide-react";
import { getSizeCategoryStyle } from "@/utils/sizeCategoryImages";
import { CatStandard } from "@/data/types/catTypes";
import { useRunwareImageGeneration } from "@/hooks/use-runware-image-generation";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

interface CatBreedCardProps {
  cat: CatStandard;
  ageFilter: string;
}

interface BreedImage {
  breedName: string;
  imageUrl: string;
  generatedAt: string;
}

export const CatBreedCard = ({ cat, ageFilter }: CatBreedCardProps) => {
  const [storedImages, setStoredImages] = useState<Record<string, BreedImage>>({});
  const { generateBreedImage, isGenerating } = useRunwareImageGeneration();
  const { isAdmin } = useAuth();

  // Load stored images from localStorage
  useEffect(() => {
    const loadStoredImages = () => {
      try {
        const stored = localStorage.getItem('admin-breed-images');
        if (stored) {
          const parsed = JSON.parse(stored);
          setStoredImages(parsed);
        }
      } catch (error) {
        console.error('Error loading stored images:', error);
      }
    };

    loadStoredImages();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-breed-images') {
        loadStoredImages();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(loadStoredImages, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleGenerateImage = async (breedName: string) => {
    const imageUrl = await generateBreedImage(breedName);
    if (imageUrl) {
      const newBreedImage: BreedImage = {
        breedName,
        imageUrl,
        generatedAt: new Date().toISOString()
      };
      
      const currentImages = JSON.parse(localStorage.getItem('admin-breed-images') || '{}');
      const updatedImages = {
        ...currentImages,
        [breedName]: newBreedImage
      };
      
      localStorage.setItem('admin-breed-images', JSON.stringify(updatedImages));
      setStoredImages(updatedImages);
    }
  };

  // Determine cat's display category
  let displayCategory: string;
  
  if (cat.isExotic) {
    displayCategory = "Exotic";
  } else if (cat.isRare) {
    displayCategory = "Rare";
  } else {
    displayCategory = cat.size;
  }
  
  // Get the appropriate style for the category
  const sizeStyle = getSizeCategoryStyle(displayCategory);
  
  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl">{cat.breed}</span>
          <span className={`inline-flex items-center gap-2 text-sm font-normal px-3 py-1.5 rounded-full ${sizeStyle.bgColor} ${sizeStyle.color}`}>
            <PawPrint className="h-4 w-4" />
            {displayCategory}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Breed Image */}
          <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            {storedImages[cat.breed] ? (
              <img 
                src={storedImages[cat.breed].imageUrl} 
                alt={cat.breed}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateImage(cat.breed)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3 mr-1" />
                        Generate Image
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500">
              {ageFilter === "kitten" ? "Kitten" : ageFilter === "adult" ? "Adult" : "Senior"} Daily Calorie Range
            </p>
            <p className="font-semibold">
              {cat.ageSpecificCalories[ageFilter as keyof typeof cat.ageSpecificCalories].min} - {cat.ageSpecificCalories[ageFilter as keyof typeof cat.ageSpecificCalories].max} calories
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Recommended Meals
            </p>
            <p className="font-semibold">
              {cat.mealsByAge[ageFilter as keyof typeof cat.mealsByAge]} times per day
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nutrition Notes</p>
            <p className="text-sm">
              {cat.nutritionNotes[ageFilter as keyof typeof cat.nutritionNotes]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
