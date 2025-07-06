
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, Image, Trash2 } from "lucide-react";
import { showDogBreeds, showCatBreeds } from "@/data/show-breeds";
import { useRunwareImageGeneration } from "@/hooks/use-runware-image-generation";
import { useBreedImages } from "@/hooks/useBreedImages";
import { toast } from "sonner";

export function ImageManagement() {
  const [selectedCategory, setSelectedCategory] = useState("dogs");
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const { generateBreedImage, isGenerating } = useRunwareImageGeneration();
  const { storedImages, saveImage, removeImage } = useBreedImages();

  const breeds = selectedCategory === "dogs" ? showDogBreeds : showCatBreeds;

  const handleGenerateImage = async (breedName: string) => {
    setGeneratingFor(breedName);
    console.log(`ImageManagement: Starting image generation for: ${breedName}`);
    
    try {
      const imageUrl = await generateBreedImage(breedName);
      if (imageUrl) {
        saveImage(breedName, imageUrl);
        console.log(`ImageManagement: Generated and saved image for ${breedName}:`, imageUrl);
        toast.success(`Generated and saved image for ${breedName}`);
      } else {
        console.error(`ImageManagement: Failed to generate image for ${breedName} - no URL returned`);
        toast.error(`Failed to generate image for ${breedName}`);
      }
    } catch (error) {
      console.error(`ImageManagement: Error generating image for ${breedName}:`, error);
      toast.error(`Error generating image for ${breedName}`);
    } finally {
      setGeneratingFor(null);
    }
  };

  const handleRemoveImage = (breedName: string) => {
    console.log(`ImageManagement: Removing image for: ${breedName}`);
    removeImage(breedName);
    toast.success(`Removed image for ${breedName}`);
  };

  const generateAllMissingImages = async () => {
    const breedsWithoutImages = breeds.filter(breed => !storedImages[breed.name]);
    console.log(`ImageManagement: Starting batch generation for ${breedsWithoutImages.length} breeds`);
    
    for (const breed of breedsWithoutImages) {
      await handleGenerateImage(breed.name);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('ImageManagement: Batch generation completed');
  };

  const getTotalStoredImages = () => {
    return Object.keys(storedImages).length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Image Management
          <Badge variant="outline" className="ml-auto">
            {getTotalStoredImages()} stored images
          </Badge>
        </CardTitle>
        <CardDescription>
          Generate and manage images for show breed cards. Images are permanently stored and will appear on the frontend.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dogs">Dog Breeds</SelectItem>
              <SelectItem value="cats">Cat Breeds</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={generateAllMissingImages}
            disabled={isGenerating || generatingFor !== null}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate All Missing
            {breeds.filter(breed => !storedImages[breed.name]).length > 0 && (
              <Badge variant="secondary">
                {breeds.filter(breed => !storedImages[breed.name]).length}
              </Badge>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {breeds.map((breed) => (
            <Card key={breed.name} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{breed.name}</h3>
                  <Badge variant="outline">{breed.size}</Badge>
                </div>
                
                <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {storedImages[breed.name] ? (
                    <img 
                      src={storedImages[breed.name].imageUrl} 
                      alt={breed.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        console.error(`ImageManagement: Failed to load image for ${breed.name}:`, storedImages[breed.name].imageUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log(`ImageManagement: Successfully loaded image for ${breed.name}`);
                      }}
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Image className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No image</p>
                    </div>
                  )}
                </div>
                
                {storedImages[breed.name] && (
                  <div className="text-xs text-gray-500">
                    Generated: {new Date(storedImages[breed.name].generatedAt).toLocaleDateString()}
                  </div>
                )}
                
                <div className="flex gap-2">
                  {storedImages[breed.name] && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveImage(breed.name)}
                      className="flex-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  )}
                  
                  <Button
                    variant={storedImages[breed.name] ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleGenerateImage(breed.name)}
                    disabled={generatingFor === breed.name}
                    className="flex-1"
                  >
                    {generatingFor === breed.name ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3 mr-1" />
                        {storedImages[breed.name] ? 'Regenerate' : 'Generate'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
