import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus } from "lucide-react";
import { PetProfileForm } from "@/components/PetProfileForm";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { PetProfile } from "@/data/types/petTypes";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PetOnboarding } from "@/components/PetOnboarding";
import { PetProfileDisplay } from "@/components/PetProfileDisplay";

const PetProfiles = () => {
  const { petProfiles, addPetProfile, updatePetProfile, deletePetProfile } = usePetProfiles();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [editingPet, setEditingPet] = useState<PetProfile | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'dog' | 'cat'>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredProfiles = selectedType === 'all' 
    ? petProfiles 
    : petProfiles.filter(pet => pet.type === selectedType);

  const handleSaveNewPet = (petData: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => {
    addPetProfile(petData);
    setShowOnboarding(false);
    toast.success("Pet profile created successfully!");
  };

  const handleUpdatePet = (petData: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => {
    if (editingPet) {
      updatePetProfile(editingPet.id, petData);
      setEditingPet(null);
      toast.success("Pet profile updated successfully!");
    }
  };

  const handleDeletePet = (id: string) => {
    deletePetProfile(id);
    setConfirmDeleteId(null);
    toast.success("Pet profile deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-8">
      <div className="container max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Pet Profiles</h1>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setSelectedType(value as 'all' | 'dog' | 'cat')}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Pets</TabsTrigger>
              <TabsTrigger value="dog">Dogs</TabsTrigger>
              <TabsTrigger value="cat">Cats</TabsTrigger>
            </TabsList>
            <Button onClick={() => setShowOnboarding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Pet
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            {showOnboarding && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                <PetOnboarding 
                  onComplete={handleSaveNewPet}
                  onCancel={() => setShowOnboarding(false)}
                />
              </div>
            )}
            
            {editingPet && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                <PetProfileForm 
                  onSave={handleUpdatePet} 
                  initialValues={editingPet} 
                  isEditing={true} 
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map(pet => (
                  <PetProfileDisplay 
                    key={pet.id}
                    pet={pet}
                    onEdit={() => setEditingPet(pet)}
                    onDelete={() => setConfirmDeleteId(pet.id)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 mb-4">No pet profiles found.</p>
                  <Button onClick={() => setShowOnboarding(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Pet
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dog" className="mt-0">
            {showOnboarding && (
              <PetOnboarding 
                onComplete={handleSaveNewPet} 
                initialValues={{ type: "dog" }}
                onCancel={() => setShowOnboarding(false)}
              />
            )}
          </TabsContent>

          <TabsContent value="cat" className="mt-0">
            {showOnboarding && (
              <PetOnboarding 
                onComplete={handleSaveNewPet} 
                initialValues={{ type: "cat" }}
                onCancel={() => setShowOnboarding(false)}
              />
            )}
          </TabsContent>
        </Tabs>

        <footer className="mt-12 border-t pt-6 text-xs text-gray-500">
          <p className="mb-2">
            Create personalized profiles for all your pets. Track their preferences, health conditions, and set aspirational goals.
          </p>
          <p>
            Update your pet's information regularly to ensure the most accurate nutritional recommendations and progress tracking.
          </p>
        </footer>
      </div>

      <Dialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Pet Profile</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this pet's profile? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => confirmDeleteId && handleDeletePet(confirmDeleteId)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetProfiles;
