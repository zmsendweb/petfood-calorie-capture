
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { FatSecretTest } from "@/components/FatSecretTest";
import { AppNavigation } from "@/components/AppNavigation";
import { useAuth } from "@/hooks/useAuth";

export function Index() {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <AppNavigation />
      <div className="flex-1">
        <Hero />
        <Features />
        {isAdmin && (
          <div className="container mx-auto px-4 py-8">
            <FatSecretTest />
          </div>
        )}
      </div>
    </div>
  );
}
