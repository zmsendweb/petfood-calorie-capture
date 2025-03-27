
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import { PetProfileForm } from "@/components/PetProfileForm";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { PetProfile } from "@/data/types/petTypes";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const PetProfiles = () => {
  const { petProfiles, addPetProfile, updatePetProfile, deletePetProfile } = usePetProfiles();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState<PetProfile | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'dog' | 'cat'>('all');

  const filteredProfiles = selectedType === 'all' 
    ? petProfiles 
    : petProfiles.filter(pet => pet.type === selectedType);

  const handleSaveNewPet = (petData: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => {
    addPetProfile(petData);
    setShowAddForm(false);
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
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Pet
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            {showAddForm && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
                <PetProfileForm onSave={handleSaveNewPet} />
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
                  <Card key={pet.id} className="overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-md transition-shadow">
                    <div className="h-40 relative">
                      <img 
                        src={pet.photo || `https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80`} 
                        alt={pet.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                        {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-start">
                        <span>{pet.name}</span>
                        <span className="text-sm font-normal">
                          {pet.age} {pet.ageUnit}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-gray-600">
                        {pet.breed ? pet.breed : "Mixed breed"}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div>
                          <p className="text-gray-500">Weight</p>
                          <p>{pet.weight} {pet.weightUnit}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Activity</p>
                          <p className="capitalize">{pet.activityLevel}</p>
                        </div>
                      </div>
                      {pet.notes && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{pet.notes}</p>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingPet(pet)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Pet Profile</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete {pet.name}'s profile? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>Cancel</Button>
                            <Button variant="destructive" onClick={() => handleDeletePet(pet.id)}>Delete</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 mb-4">No pet profiles found.</p>
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Pet
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dog" className="mt-0">
            {/* Dog-specific content will be shown via the filtered profiles */}
            {showAddForm && <PetProfileForm onSave={handleSaveNewPet} initialValues={{ type: "dog" }} />}
          </TabsContent>

          <TabsContent value="cat" className="mt-0">
            {/* Cat-specific content will be shown via the filtered profiles */}
            {showAddForm && <PetProfileForm onSave={handleSaveNewPet} initialValues={{ type: "cat" }} />}
          </TabsContent>
        </Tabs>

        <footer className="mt-12 border-t pt-6 text-xs text-gray-500">
          <p className="mb-2">
            Manage profiles for all your pets in one place. Track their age, weight, and dietary needs.
          </p>
          <p>
            Update your pet's information regularly as they grow to ensure accurate nutritional recommendations.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PetProfiles;
