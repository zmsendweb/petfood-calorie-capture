
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AppNavigation } from "@/components/AppNavigation";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <AdminPanel />
      </div>
    </div>
  );
}
