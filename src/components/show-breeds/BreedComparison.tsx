
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Sparkles, Trophy, AlertCircle } from "lucide-react";
import { PetImageAnalysis } from "@/components/PetImageAnalysis";
import { useShowBreedComparison } from "@/hooks/use-show-breed-comparison";

interface BreedComparisonProps {
  selectedBreed: any;
  userPhoto: string;
  onPhotoCapture: (photo: string) => void;
}

export const BreedComparison = ({ selectedBreed, userPhoto, onPhotoCapture }: BreedComparisonProps) => {
  const { compareToShowStandard, isComparing, comparison } = useShowBreedComparison();

  const handleCompare = async () => {
    if (!selectedBreed || !userPhoto) return;
    await compareToShowStandard(userPhoto, selectedBreed);
  };

  if (!selectedBreed) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Select a Show Breed</h3>
          <p className="text-muted-foreground">
            Choose a breed from the Dogs or Cats tab to start comparing your pet against show standards.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selected Breed Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Selected Breed: {selectedBreed.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Show Standards</p>
              <p className="text-sm">{selectedBreed.showStandards}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Key Traits</p>
              <p className="text-sm">{selectedBreed.temperament}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Capture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Upload Your Pet's Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PetImageAnalysis 
            photo={userPhoto}
            onPhotoCapture={onPhotoCapture}
          />
          
          {userPhoto && (
            <div className="mt-4">
              <Button 
                onClick={handleCompare}
                disabled={isComparing}
                className="w-full"
              >
                {isComparing ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Comparing to Show Standards...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Compare to {selectedBreed.name} Standards
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {comparison && (
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Show Standard Comparison Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {comparison.overallScore}%
              </div>
              <p className="text-sm text-muted-foreground">
                Overall conformity to {selectedBreed.name} show standards
              </p>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comparison.detailedScores.map((score, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{score.category}</span>
                    <span className="text-sm font-bold">{score.score}%</span>
                  </div>
                  <Progress value={score.score} className="h-2" />
                  <p className="text-xs text-muted-foreground">{score.notes}</p>
                </div>
              ))}
            </div>

            {/* Strengths and Areas for Improvement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Show Quality Strengths
                </h4>
                <ul className="space-y-2">
                  {comparison.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Areas for Show Preparation
                </h4>
                <ul className="space-y-2">
                  {comparison.areasForImprovement.map((area, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Judge's Notes */}
            {comparison.judgeNotes && (
              <div>
                <h4 className="font-semibold mb-2">Professional Assessment</h4>
                <p className="text-sm bg-white/50 p-4 rounded-lg border">
                  {comparison.judgeNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
