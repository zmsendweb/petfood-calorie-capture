
import { useState } from "react";
import { useNutritionRAG, PetType } from "@/hooks/use-nutrition-rag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, RefreshCw, Cat, Dog, AlertCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VoiceInput } from "./voice/VoiceInput";
import { toast } from "sonner";

interface NutritionQueryProps {
  defaultPetType?: PetType;
}

export function NutritionQuery({ defaultPetType = null }: NutritionQueryProps) {
  const [query, setQuery] = useState("");
  const [petType, setPetType] = useState<PetType>(defaultPetType);
  const { getAnswer, isLoading, result, error } = useNutritionRAG();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      try {
        await getAnswer(query, petType);
      } catch (err) {
        console.error("Error in nutrition query:", err);
        toast.error("Error", {
          description: "Failed to process your nutrition query. Please try again later."
        });
      }
    }
  };

  const handleVoiceInput = (text: string) => {
    setQuery(text);
  };

  return (
    <div className="w-full space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Nutrition Assistant</CardTitle>
          <CardDescription>
            Ask any question about pet nutrition and get answers based on veterinary standards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <ToggleGroup type="single" value={petType || ""} onValueChange={(value) => setPetType(value as PetType || null)}>
              <ToggleGroupItem value="cat" aria-label="Cat nutrition">
                <Cat className="mr-2 h-4 w-4" />
                Cat
              </ToggleGroupItem>
              <ToggleGroupItem value="dog" aria-label="Dog nutrition">
                <Dog className="mr-2 h-4 w-4" />
                Dog
              </ToggleGroupItem>
              <ToggleGroupItem value="" aria-label="Both pets">
                Both
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <form onSubmit={handleSubmit} className="flex items-start gap-2">
            <div className="flex-1">
              <Input
                placeholder={petType === "dog" 
                  ? "What nutritional needs do Labradors have?" 
                  : petType === "cat" 
                    ? "What nutritional needs do Maine Coons have?"
                    : "Ask about pet nutrition..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2">
              <VoiceInput 
                onTranscription={handleVoiceInput}
                placeholder="Ask a question..."
                isProcessing={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !query.trim()}
                className="whitespace-nowrap"
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <SearchIcon className="h-4 w-4 mr-2" />}
                {isLoading ? "Searching..." : "Ask"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-2">
              Please try again later or contact support if this issue persists.
            </p>
          </CardContent>
        </Card>
      )}

      {result && !error && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p>{result.answer}</p>
            </div>
            {result.sources && result.sources.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Sources:</h3>
                <ul className="mt-2 text-xs text-gray-500">
                  {result.sources.map((source, index) => (
                    <li key={index} className="mt-1">
                      {source.title} ({source.source})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
