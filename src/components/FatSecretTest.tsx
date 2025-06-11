
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFatSecretAPI } from "@/hooks/use-fatsecret-api";

export function FatSecretTest() {
  const [testResult, setTestResult] = useState<string>("");
  const { searchFoods, isLoading } = useFatSecretAPI();

  const testAPI = async () => {
    console.log("Testing FatSecret API...");
    setTestResult("Testing...");
    
    try {
      const result = await searchFoods("apple");
      console.log("FatSecret API result:", result);
      
      if (result && result.foods) {
        setTestResult(`✅ API Working! Found ${result.foods.total_results || 0} results for "apple"`);
      } else {
        setTestResult("❌ API returned no results or unexpected format");
      }
    } catch (error) {
      console.error("FatSecret API test error:", error);
      setTestResult(`❌ API Error: ${error}`);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>FatSecret API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testAPI} disabled={isLoading}>
          {isLoading ? "Testing..." : "Test API"}
        </Button>
        {testResult && (
          <div className="p-3 bg-gray-100 rounded text-sm">
            {testResult}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
