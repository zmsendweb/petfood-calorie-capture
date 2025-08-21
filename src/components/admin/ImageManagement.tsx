
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, Image, Trash2, RotateCcw, Bug } from "lucide-react";
import { getAllDogBreedNames, getAllCatBreedNames } from "@/utils/breedNames";
import { useRunwareImageGeneration } from "@/hooks/use-runware-image-generation";
import { useBreedImages } from "@/hooks/useBreedImages";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function ImageManagement() {
  const [selectedCategory, setSelectedCategory] = useState("dogs");
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const { generateBreedImage, isGenerating } = useRunwareImageGeneration();
  const { storedImages, saveImage, removeImage, clearAllImages, refreshImages, imageCount, debugStorage } = useBreedImages();
  const { user } = useAuth();

  const breedNames = selectedCategory === "dogs" ? getAllDogBreedNames() : getAllCatBreedNames();
  const totalBreedsCount = breedNames.length;

  const handleGenerateImage = async (breedName: string) => {
    setGeneratingFor(breedName);
    console.log(`ImageManagement: Starting image generation for: ${breedName}`);
    
    try {
      const imageUrl = await generateBreedImage(breedName);
      if (imageUrl) {
        const generatedBy = user?.email || 'admin';
        console.log(`ImageManagement: Generated image URL for ${breedName}:`, imageUrl);
        saveImage(breedName, imageUrl, generatedBy);
        console.log(`ImageManagement: Generated and saved image for ${breedName}`);
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

  const handleClearAll = () => {
    console.log('ImageManagement: Clearing all images');
    clearAllImages();
    toast.success('Cleared all images');
  };

  const generateAllMissingImages = async () => {
    const breedsWithoutImages = breedNames.filter(breedName => !storedImages[breedName]);
    console.log(`ImageManagement: Starting batch generation for ${breedsWithoutImages.length} breeds`);
    
    for (const breedName of breedsWithoutImages) {
      await handleGenerateImage(breedName);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('ImageManagement: Batch generation completed');
  };

  const missingImagesCount = breedNames.filter(breedName => !storedImages[breedName]).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Image Management
          <Badge variant="outline" className="ml-auto">
            {imageCount} total images
          </Badge>
        </CardTitle>
        <CardDescription>
          Generate and manage images for breed cards. Images are stored globally and visible to all users.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dogs">Dog Breeds</SelectItem>
              <SelectItem value="cats">Cat Breeds</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button 
              onClick={debugStorage}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Bug className="h-4 w-4" />
              Debug
            </Button>
            
            <Button 
              onClick={refreshImages}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Refresh
            </Button>
            
            <Button 
              onClick={handleClearAll}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
            
            <Button 
              onClick={generateAllMissingImages}
              disabled={isGenerating || generatingFor !== null || missingImagesCount === 0}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate All Missing
              {missingImagesCount > 0 && (
                <Badge variant="secondary">
                  {missingImagesCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            Total {selectedCategory === "dogs" ? "dog" : "cat"} breeds: {totalBreedsCount} | Missing images: {missingImagesCount}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {breedNames.map((breedName) => {
            const breedImage = storedImages[breedName];
            const hasStoredImage = breedImage && breedImage.imageUrl;
            
            return (
              <Card key={breedName} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{breedName}</h3>
                    <Badge variant="outline">All Breeds</Badge>
                  </div>
                  
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {hasStoredImage ? (
                      <img 
                        src={breedImage.imageUrl} 
                        alt={breedName}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          console.error(`ImageManagement: Failed to load image for ${breedName}:`, breedImage.imageUrl);
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log(`ImageManagement: Successfully loaded image for ${breedName}`);
                        }}
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        <Image className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">No image</p>
                      </div>
                    )}
                  </div>
                  
                  {hasStoredImage && (
                    <div className="text-xs text-gray-500">
                      Generated: {new Date(breedImage.generatedAt).toLocaleDateString()}
                      <br />
                      By: {breedImage.generatedBy}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {hasStoredImage && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveImage(breedName)}
                        className="flex-1"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    )}
                    
                    <Button
                      variant={hasStoredImage ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleGenerateImage(breedName)}
                      disabled={generatingFor === breedName}
                      className="flex-1"
                    >
                      {generatingFor === breedName ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3 mr-1" />
                          {hasStoredImage ? 'Regenerate' : 'Generate'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
