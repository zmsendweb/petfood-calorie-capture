
import { useParams, Link } from "react-router-dom";
import { AppNavigation } from "@/components/AppNavigation";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Camera, 
  BarChart3, 
  Utensils, 
  Users,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const featureData = {
  "calorie-calculator": {
    title: "Pet Calorie Calculator",
    description: "Advanced calorie calculation system for optimal pet nutrition",
    icon: Calculator,
    status: "stable",
    overview: "Our intelligent calorie calculator takes into account your pet's breed, age, weight, activity level, and health conditions to provide precise daily caloric needs.",
    features: [
      "Breed-specific metabolic calculations",
      "Age and life stage adjustments",
      "Activity level customization",
      "Weight management goals",
      "Special dietary requirements",
      "Portion size recommendations"
    ],
    benefits: [
      "Prevent obesity and malnutrition",
      "Optimize energy levels",
      "Support healthy growth",
      "Extend lifespan",
      "Reduce veterinary costs"
    ],
    howItWorks: [
      "Enter your pet's basic information",
      "Select activity level and goals",
      "Get personalized calorie recommendations",
      "Receive portion size guidance",
      "Track progress over time"
    ]
  },
  "image-recognition": {
    title: "AI Breed Identification",
    description: "Advanced computer vision for accurate pet breed identification",
    icon: Camera,
    status: "beta",
    overview: "Upload a photo of any dog or cat and our AI will identify the breed with detailed information about characteristics, care needs, and health considerations.",
    features: [
      "500+ breed recognition",
      "Mixed breed analysis",
      "Confidence scoring",
      "Detailed breed profiles",
      "Care recommendations",
      "Health predispositions"
    ],
    benefits: [
      "Understand your pet better",
      "Tailored care recommendations",
      "Early health screening",
      "Proper nutrition planning",
      "Behavioral insights"
    ],
    howItWorks: [
      "Take or upload a clear photo",
      "AI analyzes facial features and body structure",
      "Receive breed identification results",
      "Get detailed breed information",
      "Access personalized care tips"
    ]
  },
  "progress-tracking": {
    title: "Health Progress Tracking",
    description: "Comprehensive health monitoring and progress visualization",
    icon: BarChart3,
    status: "stable",
    overview: "Track your pet's health metrics over time with detailed charts, trends, and insights to ensure optimal wellbeing.",
    features: [
      "Weight tracking charts",
      "Activity monitoring",
      "Feeding history",
      "Health milestone tracking",
      "Veterinary visit logs",
      "Medication schedules"
    ],
    benefits: [
      "Early problem detection",
      "Data-driven decisions",
      "Veterinary collaboration",
      "Peace of mind",
      "Better health outcomes"
    ],
    howItWorks: [
      "Log daily measurements",
      "View progress charts",
      "Set health goals",
      "Receive trend alerts",
      "Share data with veterinarian"
    ]
  },
  "meal-planning": {
    title: "Smart Meal Planning",
    description: "Intelligent meal planning with nutritional optimization",
    icon: Utensils,
    status: "stable",
    overview: "Create balanced meal plans that meet your pet's specific nutritional needs while considering preferences, allergies, and health conditions.",
    features: [
      "Custom meal plans",
      "Nutritional analysis",
      "Portion control",
      "Allergy considerations",
      "Feeding schedules",
      "Shopping lists"
    ],
    benefits: [
      "Balanced nutrition",
      "Cost optimization",
      "Time savings",
      "Reduced food waste",
      "Better health outcomes"
    ],
    howItWorks: [
      "Set dietary preferences",
      "Choose meal frequency",
      "Generate meal plans",
      "Get portion recommendations",
      "Track feeding success"
    ]
  },
  "community": {
    title: "Pet Care Community",
    description: "Connect with pet owners and veterinary professionals",
    icon: Users,
    status: "coming-soon",
    overview: "Join a supportive community of pet owners where you can share experiences, ask questions, and get expert advice.",
    features: [
      "Discussion forums",
      "Expert Q&A sessions",
      "Local meetups",
      "Photo sharing",
      "Success stories",
      "Emergency support"
    ],
    benefits: [
      "Learn from others",
      "Get quick answers",
      "Find local resources",
      "Share experiences",
      "Build friendships"
    ],
    howItWorks: [
      "Create community profile",
      "Join relevant groups",
      "Ask questions or share tips",
      "Connect with experts",
      "Attend virtual events"
    ]
  }
};

export function FeatureDetails() {
  const { featureId } = useParams();
  const feature = featureData[featureId as keyof typeof featureData];

  if (!feature) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
        <AppNavigation />
        <div className="container mx-auto px-4 py-8">
          <PageHeader title="Feature Not Found" />
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">The feature you're looking for doesn't exist.</p>
              <Button asChild>
                <Link to="/features">Back to Features</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-2xl">Overview</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={feature.status === 'stable' ? 'default' : feature.status === 'beta' ? 'secondary' : 'outline'}>
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">{feature.overview}</p>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feature.howItWorks.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {feature.features.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="font-semibold text-gray-900">Ready to get started?</h3>
                  <p className="text-sm text-gray-600">
                    {feature.status === 'coming-soon' 
                      ? 'This feature is coming soon. Stay tuned for updates!'
                      : 'Start using this feature today to improve your pet\'s health and wellbeing.'
                    }
                  </p>
                  {feature.status !== 'coming-soon' && (
                    <Button className="w-full" asChild>
                      <Link to={featureId === 'calorie-calculator' ? '/calorie-calculator' : '#'}>
                        Get Started
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/features">View All Features</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
