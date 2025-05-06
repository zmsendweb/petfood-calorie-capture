
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link to="/">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/4b1f088b-a45c-451e-910a-581d714f877a.png" 
          alt="mypetcal logo" 
          className="h-8 w-auto hidden sm:block" 
        />
        <h1 className="text-3xl font-bold">Planning Dashboard</h1>
      </div>
    </div>
  );
};
