import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppNavigation } from "@/components/AppNavigation";
import { 
  Calculator, 
  Camera, 
  BarChart3, 
  Bell, 
  Calendar, 
  Shield,
  Smartphone,
  Database,
  Users,
  Zap,
  Heart,
  Trophy
} from "lucide-react";

const features = [
  {
    id: "calorie-calculator",
    title: "Calorie Calculator",
    description: "Calculate your pet's daily calorie needs based on their weight, age, and activity level.",
    icon: Calculator,
    href: "/features/calorie-calculator",
    status: "stable",
  },
  {
    id: "image-recognition",
    title: "Image Recognition",
    description: "Identify different dog and cat breeds using image recognition technology.",
    icon: Camera,
    href: "/features/image-recognition",
    status: "beta",
  },
  {
    id: "progress-tracking",
    title: "Progress Tracking",
    description: "Track your pet's progress over time with detailed charts and graphs.",
    icon: BarChart3,
    href: "/features/progress-tracking",
    status: "alpha",
  },
  {
    id: "reminders",
    title: "Reminders",
    description: "Set reminders for feeding, medication, and vet appointments.",
    icon: Bell,
    href: "/features/reminders",
    status: "stable",
  },
  {
    id: "planning-tools",
    title: "Planning Tools",
    description: "Plan your pet's meals and activities for the week.",
    icon: Calendar,
    href: "/features/planning-tools",
    status: "stable",
  },
  {
    id: "breed-standards",
    title: "Breed Standards",
    description: "Access breed standards and information for various dog and cat breeds.",
    icon: Shield,
    href: "/features/breed-standards",
    status: "stable",
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Access all features on the go with our mobile app.",
    icon: Smartphone,
    href: "/features/mobile-app",
    status: "planned",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description: "Analyze your pet's data to identify trends and patterns.",
    icon: Database,
    href: "/features/data-analysis",
    status: "alpha",
  },
   {
    id: "community-forums",
    title: "Community Forums",
    description: "Connect with other pet owners and share tips and advice.",
    icon: Users,
    href: "/features/community-forums",
    status: "planned",
  },
  {
    id: "ai-recommendations",
    title: "AI Recommendations",
    description: "Get personalized recommendations for your pet based on their data.",
    icon: Zap,
    href: "/features/ai-recommendations",
    status: "beta",
  },
  {
    id: "favorite-breeds",
    title: "Favorite Breeds",
    description: "Discover and compare your favorite dog and cat breeds.",
    icon: Heart,
    href: "/features/favorite-breeds",
    status: "stable",
  },
  {
    id: "show-breeds",
    title: "Showcase of Breeds",
    description: "Explore a detailed showcase of various dog and cat breeds.",
    icon: Trophy,
    href: "/features/show-breeds",
    status: "stable",
  },
];

export function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.id} className="transform hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <feature.icon className="h-5 w-5" />
                    {feature.title}
                  </CardTitle>
                  {feature.status && (
                    <Badge variant="secondary">{feature.status}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
                <Link to={feature.href} className="inline-block mt-4 text-primary hover:underline">
                  Learn More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
