
import { Link, useParams } from "react-router-dom";
import { Toaster } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNavigation } from "@/components/MainNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Feature details content mapped by ID
const featureContent: Record<string, { title: string; icon: string; content: React.ReactNode }> = {
  "nutrition-tracking": {
    title: "Pet Nutrition Tracking",
    icon: "🍽️",
    content: (
      <div className="space-y-4">
        <p>Our Pet Nutrition Tracking system helps you monitor your pet's daily calorie intake and nutritional balance.</p>
        
        <h3 className="text-lg font-medium mt-4">How it works:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Log each meal your pet consumes</li>
          <li>Track calories, protein, fat, and carbohydrate intake</li>
          <li>View nutritional trends over time with intuitive charts</li>
          <li>Receive recommendations based on your pet's specific needs</li>
          <li>Set nutritional goals and monitor progress</li>
        </ul>
        
        <h3 className="text-lg font-medium mt-4">Benefits:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Prevent overfeeding and obesity</li>
          <li>Ensure balanced nutrition</li>
          <li>Address specific dietary requirements</li>
          <li>Manage weight-related health issues</li>
        </ul>
      </div>
    ),
  },
  "breed-standards": {
    title: "Breed Standards",
    icon: "🐾",
    content: (
      <div className="space-y-4">
        <p>Our comprehensive Breed Standards database provides detailed information about different dog and cat breeds.</p>
        
        <h3 className="text-lg font-medium mt-4">Features:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Detailed nutritional requirements by breed</li>
          <li>Size categorization (Small, Medium, Large)</li>
          <li>Common health considerations</li>
          <li>Breed-specific dietary recommendations</li>
          <li>Exercise requirements</li>
        </ul>
        
        <h3 className="text-lg font-medium mt-4">How to use:</h3>
        <p>Navigate to the Breed Standards section and select either dog or cat breeds. Browse through the list or use the search function to find specific breeds.</p>
      </div>
    ),
  },
  "meal-planning": {
    title: "Meal Planning",
    icon: "📅",
    content: (
      <div className="space-y-4">
        <p>Plan balanced and nutritious meals for your pets with our Meal Planning feature.</p>
        
        <h3 className="text-lg font-medium mt-4">Capabilities:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Create weekly meal plans</li>
          <li>Calculate portion sizes based on pet's needs</li>
          <li>Balance macronutrients and micronutrients</li>
          <li>Generate shopping lists</li>
          <li>Save favorite meal combinations</li>
        </ul>
        
        <h3 className="text-lg font-medium mt-4">Getting started:</h3>
        <p>Access the Planning dashboard from the main navigation. Input your pet's profile information to receive personalized recommendations.</p>
      </div>
    ),
  },
  "nutrition-assistant": {
    title: "Nutrition Assistant",
    icon: "🤖",
    content: (
      <div className="space-y-4">
        <p>Our AI-powered Nutrition Assistant helps answer your questions about pet nutrition.</p>
        
        <h3 className="text-lg font-medium mt-4">Capabilities:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Answer questions about pet diet and nutrition</li>
          <li>Provide information on food ingredients</li>
          <li>Offer guidance on dietary transitions</li>
          <li>Suggest alternatives for pets with allergies</li>
          <li>Help interpret nutritional labels</li>
        </ul>
        
        <h3 className="text-lg font-medium mt-4">How to use:</h3>
        <p>Find the Nutrition Assistant in the dashboard. Simply type your nutrition-related question, and the assistant will provide an evidence-based response.</p>
      </div>
    ),
  },
  "pet-profiles": {
    title: "Pet Profiles",
    icon: "📝",
    content: (
      <div className="space-y-4">
        <p>Create and manage detailed profiles for all your pets to personalize their nutrition plans.</p>
        
        <h3 className="text-lg font-medium mt-4">Profile information:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Age, weight, and breed details</li>
          <li>Activity level assessment</li>
          <li>Health conditions and allergies</li>
          <li>Dietary preferences and restrictions</li>
          <li>Growth or weight management goals</li>
        </ul>
        
        <h3 className="text-lg font-medium mt-4">Benefits:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Personalized nutrition recommendations</li>
          <li>Accurate calorie and portion calculations</li>
          <li>Track changes in weight and condition over time</li>
          <li>Manage multiple pets with different needs</li>
        </ul>
      </div>
    ),
  },
  "pet-recipes": {
    title: "Pet Recipes",
    icon: "🍳",
    content: (
      <div className="space-y-4">
        <p>Browse and create homemade pet food recipes that are nutritionally balanced and safe.</p>
        
        <h3 className="text-lg font-medium mt-4">Features:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Curated library of vet-approved recipes</li>
          <li>Nutritional analysis of each recipe</li>
          <li>Filter recipes by pet type, dietary needs, or ingredients</li>
          <li>Save and share favorite recipes</li>
          <li>Create your own recipes with nutritional validation</li>
        </ul>
        
        <h3 className="text-lg font-medium mt-4">Safety first:</h3>
        <p>All recipes are reviewed to ensure they meet basic nutritional requirements. Always consult with your veterinarian before making significant changes to your pet's diet.</p>
      </div>
    ),
  },
};

export function FeatureDetails() {
  const { featureId } = useParams<{ featureId: string }>();
  const feature = featureId && featureContent[featureId];
  
  if (!feature) {
    return (
      <div className="container py-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/features">
              <Button variant="ghost" size="sm" className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Features
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Feature Not Found</h1>
          </div>
          <MainNavigation />
        </div>
        <Card>
          <CardContent className="pt-6">
            <p>The requested feature information could not be found. Please return to the features page.</p>
            <Button className="mt-4" asChild>
              <Link to="/features">View All Features</Link>
            </Button>
          </CardContent>
        </Card>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/features">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Features
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{feature.title}</h1>
        </div>
        <MainNavigation />
      </div>

      <Card>
        <CardHeader>
          <div className="text-4xl mb-2">{feature.icon}</div>
          <CardTitle className="text-2xl">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {feature.content}
          
          <div className="mt-8">
            <Button asChild>
              <Link to="/">Try This Feature</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Toaster position="top-right" />
    </div>
  );
}
