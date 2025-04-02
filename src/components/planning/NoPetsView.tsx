
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NoPetsView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-8">
      <div className="container max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Planning Dashboard</h1>
        </div>
        
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">No Pets Found</h2>
          <p className="text-gray-600 mb-6">
            Please add a pet profile to start planning and tracking their progress.
          </p>
          <Link to="/pet-profiles">
            <Button>Add a Pet Profile</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
