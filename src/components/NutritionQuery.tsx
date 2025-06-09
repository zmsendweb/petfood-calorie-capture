
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNutritionRAG } from "@/hooks/use-nutrition-rag";
import { Loader2, Sparkles, Heart, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function NutritionQuery() {
  const [query, setQuery] = useState("");
  const { data, loading, error, queryNutrition } = useNutritionRAG();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a nutrition question");
      return;
    }
    
    await queryNutrition(query);
  };

  const quickQuestions = [
    "What nutrients do senior dogs need?",
    "How much protein should a cat eat daily?",
    "What foods are toxic to pets?",
    "Best diet for weight management",
    "Puppy nutrition requirements"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Pet Nutrition Assistant
          </CardTitle>
          <CardDescription>
            Ask questions about pet nutrition, feeding guidelines, and dietary requirements. 
            Our AI assistant provides evidence-based answers for optimal pet health.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about pet nutrition... (e.g., 'What's the best diet for a senior dog with kidney issues?')"
              className="min-h-[100px]"
            />
            <Button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Get Nutrition Advice
                </>
              )}
            </Button>
          </form>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-50"
                  onClick={() => setQuery(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {data && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nutrition Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {data.answer}
              </div>
              
              {data.sources && data.sources.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Sources & References:</h4>
                  <ul className="space-y-1">
                    {data.sources.map((source, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {source}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Important Disclaimer</p>
              <p>
                This AI assistant provides general nutrition information and should not replace 
                professional veterinary advice. Always consult with your veterinarian for 
                specific health concerns or before making significant dietary changes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
