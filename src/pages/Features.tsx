
import { Features as FeaturesComponent } from "@/components/Features";
import { ModernNavigation } from "@/components/navigation/ModernNavigation";

export function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <ModernNavigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pet Care Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools and resources for optimal pet health and wellbeing
          </p>
        </div>
        <FeaturesComponent />
      </div>
    </div>
  );
}
