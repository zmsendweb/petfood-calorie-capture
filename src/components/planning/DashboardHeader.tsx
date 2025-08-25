
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
          src="/lovable-uploads/adb5d1d0-22ce-469b-944d-8ca6d003ce52.png" 
          alt="My Pet Cal Logo" 
          className="h-auto w-[120px] hidden sm:block" 
        />
        <h1 className="text-3xl font-bold">Planning Dashboard</h1>
      </div>
    </div>
  );
};
