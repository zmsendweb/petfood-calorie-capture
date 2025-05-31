
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShowDogBreeds } from "@/components/show-breeds/ShowDogBreeds";
import { ShowCatBreeds } from "@/components/show-breeds/ShowCatBreeds";
import { BreedComparison } from "@/components/show-breeds/BreedComparison";
import { Camera, Trophy, Sparkles } from "lucide-react";

export default function ShowBreeds() {
  const [selectedBreed, setSelectedBreed] = useState<any>(null);
  const [userPhoto, setUserPhoto] = useState<string>("");

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <PageHeader 
        title="Show Breed Standards" 
        showBackButton={true}
        icon={Trophy}
      />
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          Discover the top 50 most popular show dog and cat breeds. Use AI vision to compare your pet against official breed standards.
        </p>
      </div>

      <Tabs defaultValue="dogs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dogs" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Show Dogs
          </TabsTrigger>
          <TabsTrigger value="cats" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Show Cats
          </TabsTrigger>
          <TabsTrigger value="compare" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Compare
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dogs" className="mt-6">
          <ShowDogBreeds onBreedSelect={setSelectedBreed} />
        </TabsContent>
        
        <TabsContent value="cats" className="mt-6">
          <ShowCatBreeds onBreedSelect={setSelectedBreed} />
        </TabsContent>
        
        <TabsContent value="compare" className="mt-6">
          <BreedComparison 
            selectedBreed={selectedBreed}
            userPhoto={userPhoto}
            onPhotoCapture={setUserPhoto}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
