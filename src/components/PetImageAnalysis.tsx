
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, Camera, Sparkles } from "lucide-react";
import { usePetImageAnalysis, PetAnalysis } from "@/hooks/use-pet-image-analysis";
import { CameraComponent } from "./Camera";

interface PetImageAnalysisProps {
  photo?: string;
  onAnalysisComplete?: (analysis: PetAnalysis) => void;
  onPhotoCapture?: (photo: string) => void;
}

export const PetImageAnalysis = ({ 
  photo, 
  onAnalysisComplete, 
  onPhotoCapture 
}: PetImageAnalysisProps) => {
  const { analyzePetImage, isAnalyzing } = usePetImageAnalysis();
  const [showCamera, setShowCamera] = useState(false);
  const [analysis, setAnalysis] = useState<PetAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!photo) return;
    
    const result = await analyzePetImage(photo);
    if (result) {
      setAnalysis(result);
      onAnalysisComplete?.(result);
    }
  };

  const handleCapture = (imageData: string) => {
    onPhotoCapture?.(imageData);
    setShowCamera(false);
  };

  return (
    <div className="space-y-4">
      {!photo && !showCamera && (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Camera className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4 text-center">
              Take a photo of your pet for AI-powered breed identification and analysis
            </p>
            <Button onClick={() => setShowCamera(true)}>
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </CardContent>
        </Card>
      )}

      {showCamera && (
        <CameraComponent onCapture={handleCapture} />
      )}

      {photo && !showCamera && (
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={photo} 
              alt="Pet for analysis" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute bottom-2 right-2 bg-white/80"
              onClick={() => setShowCamera(true)}
            >
              Retake
            </Button>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Pet
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {analysis && (
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Breed</p>
                <p className="font-semibold">{analysis.breed}</p>
                <Badge variant="secondary" className="mt-1">
                  {analysis.confidence} confidence
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Type</p>
                <p className="font-semibold capitalize">{analysis.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Estimated Age</p>
                <p>{analysis.estimatedAge}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Activity Level</p>
                <p className="capitalize">{analysis.activityLevel}</p>
              </div>
            </div>

            {analysis.personalityTraits.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Personality Traits</p>
                <div className="flex flex-wrap gap-1">
                  {analysis.personalityTraits.map((trait, index) => (
                    <Badge key={index} variant="outline">{trait}</Badge>
                  ))}
                </div>
              </div>
            )}

            {analysis.healthIndicators.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Health Indicators</p>
                <ul className="text-sm space-y-1">
                  {analysis.healthIndicators.map((indicator, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {indicator}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.nutritionRecommendations && (
              <div>
                <p className="text-sm font-medium text-gray-600">Nutrition Recommendations</p>
                <p className="text-sm text-gray-700 mt-1">{analysis.nutritionRecommendations}</p>
              </div>
            )}

            {analysis.additionalNotes && (
              <div>
                <p className="text-sm font-medium text-gray-600">Additional Notes</p>
                <p className="text-sm text-gray-700 mt-1">{analysis.additionalNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
