
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, Image, Trash2 } from "lucide-react";
import { showDogBreeds, showCatBreeds } from "@/data/show-breeds";
import { useHailuoImageGeneration } from "@/hooks/use-hailuo-image-generation";
import { toast } from "sonner";

export function ImageManagement() {
  const [selectedCategory, setSelectedCategory] = useState("dogs");
  const [breedImages, setBreedImages] = useState<Record<string, string>>({});
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const { generateBreedImage, isGenerating } = useHailuoImageGeneration();

  const breeds = selectedCategory === "dogs" ? showDogBreeds : showCatBreeds;

  const handleGenerateImage = async (breedName: string) => {
    setGeneratingFor(breedName);
    const imageUrl = await generateBreedImage(breedName);
    if (imageUrl) {
      setBreedImages(prev => ({
        ...prev,
        [breedName]: imageUrl
      }));
      toast.success(`Generated image for ${breedName}`);
    }
    setGeneratingFor(null);
  };

  const handleRemoveImage = (breedName: string) => {
    setBreedImages(prev => {
      const updated = { ...prev };
      delete updated[breedName];
      return updated;
    });
    toast.success(`Removed image for ${breedName}`);
  };

  const generateAllMissingImages = async () => {
    const breedsWithoutImages = breeds.filter(breed => !breedImages[breed.name]);
    
    for (const breed of breedsWithoutImages) {
      await handleGenerateImage(breed.name);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Image Management
        </CardTitle>
        <CardDescription>
          Generate and manage images for show breed cards
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
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate All Missing
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
                  {breedImages[breed.name] ? (
                    <img 
                      src={breedImages[breed.name]} 
                      alt={breed.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Image className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No image</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {breedImages[breed.name] ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveImage(breed.name)}
                      className="flex-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  ) : null}
                  
                  <Button
                    variant={breedImages[breed.name] ? "outline" : "default"}
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
                        {breedImages[breed.name] ? 'Regenerate' : 'Generate'}
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
