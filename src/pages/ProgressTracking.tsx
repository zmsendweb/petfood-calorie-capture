
import { ModernNavigation } from "@/components/navigation/ModernNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Weight, Activity, Heart } from "lucide-react";

export function ProgressTracking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <ModernNavigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Health Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your pet's health metrics over time with detailed charts and insights</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Weight className="h-5 w-5 text-green-600" />
                Weight Tracking
              </CardTitle>
              <CardDescription>
                Monitor weight changes and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Start Tracking
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Activity Monitoring
              </CardTitle>
              <CardDescription>
                Track daily activity and exercise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Log Activity
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Health Metrics
              </CardTitle>
              <CardDescription>
                Record vital signs and health data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Add Metrics
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Sample Progress Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Your progress charts will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
