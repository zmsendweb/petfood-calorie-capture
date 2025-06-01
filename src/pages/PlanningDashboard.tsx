
import { AppNavigation } from "@/components/AppNavigation";
import { DashboardContent } from "@/components/planning/DashboardContent";

export default function PlanningDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <DashboardContent />
      </div>
    </div>
  );
}
