
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Trophy, Star, Sparkles, Loader2 } from "lucide-react";
import { showCatBreeds } from "@/data/show-breeds";
import { useRunwareImageGeneration } from "@/hooks/use-runware-image-generation";
import { useAuth } from "@/hooks/useAuth";
import { useBreedImages } from "@/hooks/useBreedImages";

interface ShowCatBreedsProps {
  onBreedSelect: (breed: any) => void;
}

export const ShowCatBreeds = ({ onBreedSelect }: ShowCatBreedsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  const { generateBreedImage, isGenerating } = useRunwareImageGeneration();
  const { isAdmin, user } = useAuth();
  const { storedImages, saveImage, isLoading } = useBreedImages();

  const filteredBreeds = showCatBreeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = sizeFilter === "all" || breed.size === sizeFilter;
    const matchesType = typeFilter === "all" || breed.coatType === typeFilter;
    return matchesSearch && matchesSize && matchesType;
  });

  const uniqueCoatTypes = [...new Set(showCatBreeds.map(breed => breed.coatType))];

  const handleGenerateImage = async (breedName: string) => {
    console.log(`ShowCatBreeds: Generating image for ${breedName}`);
    const imageUrl = await generateBreedImage(breedName);
    if (imageUrl) {
      saveImage(breedName, imageUrl);
      console.log(`ShowCatBreeds: Generated and saved image for ${breedName}:`, imageUrl);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search breeds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sizeFilter} onValueChange={setSizeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            <SelectItem value="Small">Small</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Large">Large</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Coat Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {uniqueCoatTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Breed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBreeds.map((breed, index) => (
          <Card key={breed.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{breed.name}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">#{index + 1}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">{breed.size}</Badge>
                <Badge variant="outline">{breed.coatType}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {!isLoading && storedImages[breed.name] ? (
                  <img 
                    src={storedImages[breed.name].imageUrl} 
                    alt={breed.name}
                    className="w-full h-full object-cover rounded-lg"
                    onLoad={() => {
                      console.log(`ShowCatBreeds: Successfully loaded image for ${breed.name}`);
                    }}
                    onError={(e) => {
                      console.error(`ShowCatBreeds: Failed to load stored image for ${breed.name}:`, storedImages[breed.name].imageUrl);
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Trophy className="h-8 w-8 text-gray-400" />
                    {isAdmin && user && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateImage(breed.name)}
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
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">Origin</p>
                  <p className="text-sm">{breed.origin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Temperament</p>
                  <p className="text-sm">{breed.temperament}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Show Standards</p>
                  <p className="text-xs text-gray-500">{breed.showStandards}</p>
                </div>
              </div>

              <Button 
                onClick={() => onBreedSelect(breed)} 
                className="w-full"
                size="sm"
              >
                Compare with AI
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
