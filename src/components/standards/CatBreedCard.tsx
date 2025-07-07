
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PawPrint, Sparkles, Loader2 } from "lucide-react";
import { getSizeCategoryStyle } from "@/utils/sizeCategoryImages";
import { CatStandard } from "@/data/types/catTypes";
import { useRunwareImageGeneration } from "@/hooks/use-runware-image-generation";
import { useAuth } from "@/hooks/useAuth";
import { useBreedImages } from "@/hooks/useBreedImages";

interface CatBreedCardProps {
  cat: CatStandard;
  ageFilter: string;
}

export const CatBreedCard = ({ cat, ageFilter }: CatBreedCardProps) => {
  const { generateBreedImage, isGenerating } = useRunwareImageGeneration();
  const { isAdmin, user } = useAuth();
  const { storedImages, saveImage, isLoading } = useBreedImages();

  const handleGenerateImage = async (breedName: string) => {
    console.log(`CatBreedCard: Starting image generation for "${breedName}"`);
    const imageUrl = await generateBreedImage(breedName);
    if (imageUrl) {
      const generatedBy = user?.email || 'anonymous';
      console.log(`CatBreedCard: Generated image URL for "${breedName}":`, imageUrl);
      saveImage(breedName, imageUrl, generatedBy);
      console.log(`CatBreedCard: Saved image for "${breedName}"`);
    } else {
      console.error(`CatBreedCard: Failed to generate image for "${breedName}"`);
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
  
  // Check if we have a stored image
  const breedImage = storedImages[cat.breed];
  const hasStoredImage = !isLoading && breedImage && breedImage.imageUrl;
  
  console.log(`CatBreedCard: Rendering ${cat.breed}, hasStoredImage: ${hasStoredImage}`);
  
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
            {hasStoredImage ? (
              <img 
                src={breedImage.imageUrl} 
                alt={cat.breed}
                className="w-full h-full object-cover rounded-lg"
                onLoad={() => {
                  console.log(`CatBreedCard: Successfully loaded image for ${cat.breed}`);
                }}
                onError={(e) => {
                  console.error(`CatBreedCard: Failed to load image for ${cat.breed}:`, breedImage.imageUrl);
                  console.error('Image error event:', e);
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500">No image</span>
                {/* Show generate button only for admin users */}
                {isAdmin && user && (
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
