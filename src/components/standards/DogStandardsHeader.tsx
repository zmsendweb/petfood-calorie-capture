
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const DogStandardsHeader = () => {
  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Dog Breed Feeding Standards</h1>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Link to="/standards">
          <Button variant="default">
            Dog Standards
          </Button>
        </Link>
        <Link to="/cat-standards">
          <Button variant="outline">
            Cat Standards
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline">
            Back to Home
          </Button>
        </Link>
      </div>
    </>
  );
};
