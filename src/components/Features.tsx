
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Camera, 
  BarChart3, 
  Bell, 
  Calendar, 
  Shield,
  Heart,
  Trophy,
  Utensils,
  Users
} from "lucide-react";

const features = [
  {
    id: "calorie-calculator",
    title: "Calorie Calculator",
    description: "Calculate your pet's daily calorie needs based on their weight, age, activity level, and breed characteristics for optimal health.",
    icon: Calculator,
    href: "/features/calorie-calculator",
    status: "stable",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  },
  {
    id: "image-recognition",
    title: "Breed Identification",
    description: "Upload a photo of your pet and our AI will identify the breed, providing detailed information about characteristics and care needs.",
    icon: Camera,
    href: "/features/image-recognition",
    status: "beta",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
  },
  {
    id: "progress-tracking",
    title: "Health Progress Tracking",
    description: "Monitor your pet's weight, activity levels, and health metrics over time with detailed charts and insights.",
    icon: BarChart3,
    href: "/features/progress-tracking",
    status: "stable",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
  },
  {
    id: "meal-planning",
    title: "Smart Meal Planning",
    description: "Create custom meal plans with portion control, nutritional balance, and feeding schedules tailored to your pet.",
    icon: Utensils,
    href: "/features/meal-planning",
    status: "stable",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  },
  {
    id: "breed-standards",
    title: "Breed Standards Database",
    description: "Access comprehensive breed information, standards, and characteristics for over 500+ dog and cat breeds.",
    icon: Shield,
    href: "/standards",
    status: "stable",
    color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
  },
  {
    id: "show-breeds",
    title: "Show Breed Showcase",
    description: "Explore top show breeds with detailed standards, compare your pet against breed ideals using AI analysis.",
    icon: Trophy,
    href: "/show-breeds",
    status: "stable",
    color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
  },
  {
    id: "pet-profiles",
    title: "Pet Profile Management",
    description: "Create detailed profiles for each of your pets with health records, preferences, and personalized care plans.",
    icon: Heart,
    href: "/pet-profiles",
    status: "stable",
    color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
  },
  {
    id: "community",
    title: "Pet Care Community",
    description: "Connect with other pet owners, share experiences, ask questions, and get advice from veterinary professionals.",
    icon: Users,
    href: "/features/community",
    status: "coming-soon",
    color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
  },
];

export function Features() {
  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Pet Care Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to keep your pets healthy, happy, and well-cared for. 
            From nutrition planning to breed information, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.id} className={`${feature.color} transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      <feature.icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold leading-tight">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge 
                    variant={feature.status === 'stable' ? 'default' : feature.status === 'beta' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {feature.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4 text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
                <Button asChild size="sm" className="w-full">
                  <Link to={feature.href}>
                    {feature.status === 'coming-soon' ? 'Learn More' : 'Try Feature'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Stable</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Beta</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
