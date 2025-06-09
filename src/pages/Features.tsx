
import { AppNavigation } from "@/components/AppNavigation";
import { PageHeader } from "@/components/PageHeader";
import { Features as FeaturesComponent } from "@/components/Features";

export function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="Pet Care Features" 
          description="Comprehensive tools and resources for optimal pet health and wellbeing"
          showBackButton={false}
        />
        <FeaturesComponent />
      </div>
    </div>
  );
}
