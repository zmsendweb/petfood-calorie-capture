
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
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Link to={backTo}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-xl font-bold leading-tight">{title}</h1>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        {children}
        <MainNavigation />
      </div>
    </div>
  );
}
