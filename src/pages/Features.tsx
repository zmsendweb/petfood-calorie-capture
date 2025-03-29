
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import { ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNavigation } from "@/components/MainNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featuresList = [
  {
    id: "nutrition-tracking",
    title: "Pet Nutrition Tracking",
    description: "Track your pet's daily nutrition and calorie intake",
    icon: "🍽️",
  },
  {
    id: "breed-standards",
    title: "Breed Standards",
    description: "Comprehensive information about different dog and cat breeds",
    icon: "🐾",
  },
  {
    id: "meal-planning",
    title: "Meal Planning",
    description: "Plan balanced and nutritious meals for your pets",
    icon: "📅",
  },
  {
    id: "nutrition-assistant",
    title: "Nutrition Assistant",
    description: "AI-powered assistant to answer questions about pet nutrition",
    icon: "🤖",
  },
  {
    id: "pet-profiles",
    title: "Pet Profiles",
    description: "Create and manage detailed profiles for all your pets",
    icon: "📝",
  },
  {
    id: "pet-recipes",
    title: "Pet Recipes",
    description: "Browse and create homemade pet food recipes",
    icon: "🍳",
  },
];

export function Features() {
  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Features</h1>
        </div>
        
        <MainNavigation />
      </div>

      <div className="space-y-8">
        <p className="text-muted-foreground">
          Explore the powerful features available in our Pet Nutrition Platform. Click on any feature to learn more about how it works.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuresList.map((feature) => (
            <Link key={feature.id} to={`/features/${feature.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
