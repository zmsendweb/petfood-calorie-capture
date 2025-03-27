
import { PetProfile } from "@/data/types/petTypes";
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle 
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  CalendarClock, CheckCircle2, Edit, Heart, Shield, Star, Trash2, X 
} from "lucide-react";

interface PetProfileDisplayProps {
  pet: PetProfile;
  onEdit: () => void;
  onDelete: () => void;
}

export const PetProfileDisplay = ({ pet, onEdit, onDelete }: PetProfileDisplayProps) => {
  return (
    <Card className="overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-md transition-shadow">
      <div className="h-48 relative">
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
      
      <CardContent className="space-y-4">
        <div>
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
            {pet.temperament && (
              <div>
                <p className="text-gray-500">Temperament</p>
                <p className="capitalize">{pet.temperament}</p>
              </div>
            )}
          </div>
        </div>

        {/* Personality traits */}
        {pet.personality && pet.personality.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1">Personality</h4>
            <div className="flex flex-wrap gap-1">
              {pet.personality.map(trait => (
                <Badge key={trait} variant="secondary" className="text-xs">
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Likes and dislikes */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          {pet.likesAndPreferences && pet.likesAndPreferences.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                <Heart className="h-3 w-3 text-rose-500" /> Likes
              </h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                {pet.likesAndPreferences.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {pet.dislikesAndAversions && pet.dislikesAndAversions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                <X className="h-3 w-3 text-red-500" /> Dislikes
              </h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                {pet.dislikesAndAversions.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Health conditions */}
        {pet.healthConditions && pet.healthConditions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
              <Shield className="h-3 w-3 text-blue-500" /> Health Conditions
            </h4>
            <ul className="list-disc list-inside text-xs space-y-1">
              {pet.healthConditions.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Goals section */}
        {((pet.shortTermGoals && pet.shortTermGoals.length > 0) || 
          (pet.longTermGoals && pet.longTermGoals.length > 0)) && (
          <div className="border-t pt-3 mt-3">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500" /> Aspirational Goals
            </h4>
            
            <div className="space-y-3">
              {pet.shortTermGoals && pet.shortTermGoals.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-gray-600 mb-1">Short-term</h5>
                  <ul className="list-inside text-xs space-y-1">
                    {pet.shortTermGoals.map(goal => (
                      <li key={goal} className="flex items-start gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {pet.longTermGoals && pet.longTermGoals.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-gray-600 mb-1">Long-term</h5>
                  <ul className="list-inside text-xs space-y-1">
                    {pet.longTermGoals.map(goal => (
                      <li key={goal} className="flex items-start gap-1">
                        <CalendarClock className="h-3 w-3 text-purple-500 mt-0.5 shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {(pet.notes || pet.progressNotes) && (
          <div className="border-t pt-3">
            <h4 className="text-sm font-medium mb-1">Notes</h4>
            <p className="text-xs text-gray-600">
              {pet.progressNotes || pet.notes}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEdit}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
