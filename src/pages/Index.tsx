
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, Cat, LineChart } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Pet Nutrition Guide</h1>
        <p className="text-lg text-gray-700 max-w-md mx-auto">
          Access comprehensive feeding guidelines for different dog and cat breeds, including calorie requirements and special considerations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/standards">
            <Button className="w-full sm:w-auto" size="lg">
              <PawPrint className="mr-2" />
              Dog Standards
            </Button>
          </Link>
          <Link to="/cat-standards">
            <Button className="w-full sm:w-auto" size="lg" variant="secondary">
              <Cat className="mr-2" />
              Cat Standards
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="w-full sm:w-auto" size="lg" variant="outline">
              <LineChart className="mr-2" />
              Calorie Tracker
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
