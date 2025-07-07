
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PawPrint, Sparkles, Loader2 } from "lucide-react";
import { getSizeCategoryStyle } from "@/utils/sizeCategoryImages";
import { DogStandard } from "@/data/types/dogTypes";
import { useRunwareImageGeneration } from "@/hooks/use-runware-image-generation";
import { useAuth } from "@/hooks/useAuth";
import { useBreedImages } from "@/hooks/useBreedImages";

interface DogBreedCardProps {
  dog: DogStandard;
  ageFilter: string;
}

export const DogBreedCard = ({ dog, ageFilter }: DogBreedCardProps) => {
  const { generateBreedImage, isGenerating } = useRunwareImageGeneration();
  const { isAdmin, user } = useAuth();
  const { storedImages, saveImage, isLoading } = useBreedImages();

  const handleGenerateImage = async (breedName: string) => {
    console.log(`DogBreedCard: Generating image for ${breedName}`);
    const imageUrl = await generateBreedImage(breedName);
    if (imageUrl) {
      saveImage(breedName, imageUrl);
      console.log(`DogBreedCard: Generated and saved image for ${breedName}:`, imageUrl);
    }
  };

  // Determine dog's display category
  let displayCategory: string;
  
  if (dog.isSpecialty) {
    displayCategory = "Specialty";
  } else if (dog.isRare) {
    displayCategory = "Rare";
  } else {
    displayCategory = dog.size;
  }
  
  // Get the appropriate style for the category
  const sizeStyle = getSizeCategoryStyle(displayCategory);
  
  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl">{dog.breed}</span>
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
            {!isLoading && storedImages[dog.breed] ? (
              <img 
                src={storedImages[dog.breed].imageUrl} 
                alt={dog.breed}
                className="w-full h-full object-cover rounded-lg"
                onLoad={() => {
                  console.log(`DogBreedCard: Successfully loaded image for ${dog.breed}`);
                }}
                onError={(e) => {
                  console.error(`DogBreedCard: Failed to load stored image for ${dog.breed}:`, storedImages[dog.breed].imageUrl);
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                {isAdmin && user && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateImage(dog.breed)}
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
              {ageFilter === "puppy" ? "Puppy" : ageFilter === "adult" ? "Adult" : "Senior"} Daily Calorie Range
            </p>
            <p className="font-semibold">
              {dog.ageSpecificCalories[ageFilter as keyof typeof dog.ageSpecificCalories].min} - {dog.ageSpecificCalories[ageFilter as keyof typeof dog.ageSpecificCalories].max} calories
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Recommended Meals
            </p>
            <p className="font-semibold">
              {dog.mealsPerDay[ageFilter as keyof typeof dog.mealsPerDay]} times per day
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nutrition Notes</p>
            <p className="text-sm">
              {dog.nutritionNotes[ageFilter as keyof typeof dog.nutritionNotes]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
