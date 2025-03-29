
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NutritionAnalysisProps {
  nutritionInfo: string;
  navigateToRecipeTab: () => void;
}

export function NutritionAnalysis({ nutritionInfo, navigateToRecipeTab }: NutritionAnalysisProps) {
  return (
    <>
      {nutritionInfo ? (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Nutritional Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-line">{nutritionInfo}</div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Generate a recipe first to see nutritional analysis</p>
          <Button 
            variant="outline" 
            onClick={navigateToRecipeTab}
          >
            Go to Recipe Generator
          </Button>
        </div>
      )}
    </>
  );
}
