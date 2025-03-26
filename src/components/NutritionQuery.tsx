
import { useState } from "react";
import { useNutritionRAG, PetType } from "@/hooks/use-nutrition-rag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, RefreshCw, Cat, Dog } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface NutritionQueryProps {
  defaultPetType?: PetType;
}

export function NutritionQuery({ defaultPetType = null }: NutritionQueryProps) {
  const [query, setQuery] = useState("");
  const [petType, setPetType] = useState<PetType>(defaultPetType);
  const { getAnswer, isLoading, result } = useNutritionRAG();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await getAnswer(query, petType);
    }
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
          
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
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
            <Button type="submit" disabled={isLoading || !query.trim()}>
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
              {isLoading ? "Searching..." : "Ask"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p>{result.answer}</p>
            </div>
            {result.sources.length > 0 && (
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
