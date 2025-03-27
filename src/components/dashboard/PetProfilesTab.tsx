
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Dog, Cat, Plus } from "lucide-react";
import { usePetProfiles } from "@/hooks/use-pet-profiles";

export const PetProfilesTab = () => {
  const { petProfiles } = usePetProfiles();

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Your Pet Profiles</h2>
            <p className="text-gray-600">
              Manage your pet profiles and track their dietary needs
            </p>
          </div>
          <Link to="/pet-profiles">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Manage Pets
            </Button>
          </Link>
        </div>

        {petProfiles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {petProfiles.slice(0, 3).map(pet => (
              <Card key={pet.id} className="overflow-hidden">
                <div className="h-32 relative">
                  <img 
                    src={pet.photo || `https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80`} 
                    alt={pet.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {pet.type === 'dog' ? (
                      <Dog className="h-5 w-5 bg-black/50 text-white p-1 rounded-full" />
                    ) : (
                      <Cat className="h-5 w-5 bg-black/50 text-white p-1 rounded-full" />
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold">{pet.name}</h3>
                  <p className="text-sm text-gray-500">
                    {pet.breed || pet.type} • {pet.age} {pet.ageUnit}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No pet profiles found. Add your first pet!</p>
            <Link to="/pet-profiles">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Pet Profile
              </Button>
            </Link>
          </div>
        )}
        
        {petProfiles.length > 3 && (
          <div className="text-center mt-4">
            <Link to="/pet-profiles">
              <Button variant="outline">
                View All Pets ({petProfiles.length})
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Link to="/standards" className="flex-1">
          <Card className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col justify-between">
            <h3 className="font-semibold">Dog Nutrition Standards</h3>
            <p className="text-sm text-gray-600 mt-2">
              Browse feeding guidelines for different dog breeds and ages
            </p>
          </Card>
        </Link>
        <Link to="/cat-standards" className="flex-1">
          <Card className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col justify-between">
            <h3 className="font-semibold">Cat Nutrition Standards</h3>
            <p className="text-sm text-gray-600 mt-2">
              Browse feeding guidelines for different cat breeds and ages
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
};
