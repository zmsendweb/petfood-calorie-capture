
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MainNavigation } from "@/components/MainNavigation";

interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  backTo?: string;
  children?: ReactNode;
}

export function PageHeader({ 
  title, 
  description, 
  showBackButton = true, 
  backTo = "/", 
  children 
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Link to={backTo}>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-2xl font-bold leading-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {children}
        <MainNavigation />
      </div>
    </div>
  );
}
