
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AppNavigation } from "@/components/AppNavigation";

export function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavigation />
      <div className="flex-1">
        <Hero />
        <Features />
      </div>
    </div>
  );
}
