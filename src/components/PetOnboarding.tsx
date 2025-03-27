
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, ArrowRight, Camera, Check, Heart, Paw, Shield, Star, X } from "lucide-react";
import { PetProfile } from "@/data/types/petTypes";
import { CameraComponent } from "./Camera";
import { toast } from "sonner";

interface PetOnboardingProps {
  onComplete: (petData: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => void;
  initialValues?: Partial<PetProfile>;
}

export const PetOnboarding = ({ onComplete, initialValues = {} }: PetOnboardingProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  
  const [formData, setFormData] = useState<Partial<PetProfile>>({
    name: "",
    type: "dog",
    breed: "",
    age: 1,
    ageUnit: "years",
    weight: 10,
    weightUnit: "kg",
    gender: "unknown",
    activityLevel: "moderate",
    photo: "",
    notes: "",
    personality: [],
    temperament: "balanced",
    likesAndPreferences: [],
    dislikesAndAversions: [],
    healthConditions: [],
    shortTermGoals: [],
    longTermGoals: [],
    ...initialValues
  });

  // Helper for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Helper for select inputs
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Helper for number inputs
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  // Helper for array fields
  const handleArrayItem = (field: string, value: string, add = true) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[] || [];
      
      if (add) {
        if (!value.trim() || currentArray.includes(value.trim())) return prev;
        return { ...prev, [field]: [...currentArray, value.trim()] };
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) };
      }
    });
  };

  // Handle photo capture
  const handleCapture = (photoDataUrl: string) => {
    setFormData(prev => ({ ...prev, photo: photoDataUrl }));
    setShowCamera(false);
  };

  // Complete onboarding
  const handleComplete = () => {
    toast.success("Pet profile created successfully!");
    onComplete(formData as Omit<PetProfile, "id" | "createdAt" | "updatedAt">);
  };

  // Cancel onboarding
  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? Your progress will be lost.")) {
      navigate("/pet-profiles");
    }
  };

  // Navigating between steps
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // New field inputs
  const [newLike, setNewLike] = useState("");
  const [newDislike, setNewDislike] = useState("");
  const [newHealth, setNewHealth] = useState("");
  const [newShortGoal, setNewShortGoal] = useState("");
  const [newLongGoal, setNewLongGoal] = useState("");

  // Personality traits options
  const personalityTraits = [
    "Playful", "Affectionate", "Independent", "Loyal", "Cautious", 
    "Social", "Curious", "Vocal", "Quiet", "Protective"
  ];

  // Array of steps content for the wizard
  const steps = [
    // Step 1: Basic Info
    <div key="step1" className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Let's get to know your pet!</h2>
        <p className="text-muted-foreground">Start with the basics about your furry friend.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Pet's Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="What's your pet's name?"
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="type">Type of Pet</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="breed">Breed</Label>
            <Input 
              id="breed" 
              name="breed" 
              value={formData.breed} 
              onChange={handleChange} 
              placeholder="What breed is your pet?"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="age">Age</Label>
            <div className="flex gap-2">
              <Input 
                id="age" 
                name="age" 
                type="number" 
                value={formData.age} 
                onChange={handleNumberChange} 
                min={0} 
                step={0.1} 
                required 
                className="flex-1"
              />
              <Select 
                value={formData.ageUnit} 
                onValueChange={(value) => handleSelectChange("ageUnit", value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="gender">Gender</Label>
            <Select 
              value={formData.gender} 
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="weight">Weight</Label>
            <div className="flex gap-2">
              <Input 
                id="weight" 
                name="weight" 
                type="number" 
                value={formData.weight} 
                onChange={handleNumberChange} 
                min={0} 
                step={0.1} 
                required 
                className="flex-1"
              />
              <Select 
                value={formData.weightUnit} 
                onValueChange={(value) => handleSelectChange("weightUnit", value)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Select 
              value={formData.activityLevel} 
              onValueChange={(value) => handleSelectChange("activityLevel", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>,

    // Step 2: Personality & Preferences
    <div key="step2" className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Tell us about {formData.name}'s personality</h2>
        <p className="text-muted-foreground">This helps us understand their unique character.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Personality Traits</Label>
          <div className="grid grid-cols-2 gap-2">
            {personalityTraits.map((trait) => (
              <div key={trait} className="flex items-center space-x-2">
                <Checkbox 
                  id={`trait-${trait}`} 
                  checked={(formData.personality || []).includes(trait)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleArrayItem('personality', trait, true);
                    } else {
                      handleArrayItem('personality', trait, false);
                    }
                  }}
                />
                <label
                  htmlFor={`trait-${trait}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {trait}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="temperament">Overall Temperament</Label>
          <Select 
            value={formData.temperament || "balanced"} 
            onValueChange={(value) => handleSelectChange("temperament", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select temperament" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="calm">Calm & Relaxed</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="energetic">Energetic & Excitable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Likes & Preferences</Label>
          <div className="flex gap-2">
            <Input 
              value={newLike} 
              onChange={(e) => setNewLike(e.target.value)} 
              placeholder="What does your pet love?"
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                handleArrayItem('likesAndPreferences', newLike, true);
                setNewLike('');
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(formData.likesAndPreferences || []).map((item) => (
              <div key={item} className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded-full text-sm">
                <Heart className="h-3 w-3" />
                {item}
                <button 
                  type="button" 
                  onClick={() => handleArrayItem('likesAndPreferences', item, false)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label>Dislikes & Aversions</Label>
          <div className="flex gap-2">
            <Input 
              value={newDislike} 
              onChange={(e) => setNewDislike(e.target.value)} 
              placeholder="What does your pet dislike?"
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                handleArrayItem('dislikesAndAversions', newDislike, true);
                setNewDislike('');
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(formData.dislikesAndAversions || []).map((item) => (
              <div key={item} className="flex items-center gap-1 bg-destructive/10 px-2 py-1 rounded-full text-sm">
                <X className="h-3 w-3 text-destructive" />
                {item}
                <button 
                  type="button" 
                  onClick={() => handleArrayItem('dislikesAndAversions', item, false)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,

    // Step 3: Health & Aspirations
    <div key="step3" className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Health & Future Goals</h2>
        <p className="text-muted-foreground">Help us create a tailored plan for {formData.name}.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label>Health Conditions</Label>
          <div className="flex gap-2">
            <Input 
              value={newHealth} 
              onChange={(e) => setNewHealth(e.target.value)} 
              placeholder="Any health conditions?"
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                handleArrayItem('healthConditions', newHealth, true);
                setNewHealth('');
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(formData.healthConditions || []).map((item) => (
              <div key={item} className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full text-sm">
                <Shield className="h-3 w-3 text-blue-500" />
                {item}
                <button 
                  type="button" 
                  onClick={() => handleArrayItem('healthConditions', item, false)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label>Short-term Goals (next 3 months)</Label>
          <div className="flex gap-2">
            <Input 
              value={newShortGoal} 
              onChange={(e) => setNewShortGoal(e.target.value)} 
              placeholder="A goal for your pet"
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                handleArrayItem('shortTermGoals', newShortGoal, true);
                setNewShortGoal('');
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(formData.shortTermGoals || []).map((item) => (
              <div key={item} className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full text-sm">
                <Star className="h-3 w-3 text-primary" />
                {item}
                <button 
                  type="button" 
                  onClick={() => handleArrayItem('shortTermGoals', item, false)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label>Long-term Goals (beyond 3 months)</Label>
          <div className="flex gap-2">
            <Input 
              value={newLongGoal} 
              onChange={(e) => setNewLongGoal(e.target.value)} 
              placeholder="A longer-term aspiration"
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                handleArrayItem('longTermGoals', newLongGoal, true);
                setNewLongGoal('');
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(formData.longTermGoals || []).map((item) => (
              <div key={item} className="flex items-center gap-1 bg-purple-500/10 px-2 py-1 rounded-full text-sm">
                <Star className="h-3 w-3 text-purple-500" />
                {item}
                <button 
                  type="button" 
                  onClick={() => handleArrayItem('longTermGoals', item, false)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="progressNotes">Additional Notes</Label>
          <Textarea 
            id="progressNotes" 
            name="progressNotes" 
            value={formData.progressNotes || ''} 
            onChange={handleChange} 
            placeholder="Any other information that might help us personalize the plan..."
            rows={3}
          />
        </div>
      </div>
    </div>,

    // Step 4: Photo & Finish
    <div key="step4" className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Add a photo of {formData.name}</h2>
        <p className="text-muted-foreground">This helps personalize your pet's profile.</p>
      </div>

      <div className="space-y-4">
        {showCamera ? (
          <CameraComponent onCapture={handleCapture} />
        ) : (
          <div className="flex flex-col items-center gap-4">
            {formData.photo ? (
              <div className="w-full h-64 relative rounded-lg overflow-hidden border">
                <img 
                  src={formData.photo} 
                  alt={formData.name || "Pet"} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-muted rounded-lg border border-dashed">
                <div className="text-center">
                  <Camera className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No photo added yet</p>
                </div>
              </div>
            )}
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowCamera(true)}
              className="gap-2"
            >
              <Camera className="h-4 w-4" />
              {formData.photo ? "Change Photo" : "Take Photo"}
            </Button>
          </div>
        )}

        <div className="space-y-1">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea 
            id="notes" 
            name="notes" 
            value={formData.notes || ''} 
            onChange={handleChange} 
            placeholder="Anything else we should know about your pet?"
            rows={3}
          />
        </div>

        <div className="pt-4">
          <p className="text-sm text-muted-foreground">Ready to create {formData.name}'s personalized profile? Click Finish to continue.</p>
        </div>
      </div>
    </div>
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Create Pet Profile</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            Step {step} of {steps.length}
          </div>
        </div>
        <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        {steps[step - 1]}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleCancel} className="text-muted-foreground">
              Cancel
            </Button>
          )}
        </div>
        <div>
          {step < steps.length ? (
            <Button onClick={nextStep} className="gap-2">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="gap-2">
              <Check className="h-4 w-4" /> Finish
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

// Helper components
const Plus = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);
