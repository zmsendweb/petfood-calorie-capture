
import { AppNavigation } from "@/components/AppNavigation";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Calendar, ShoppingCart, Clock } from "lucide-react";

export function MealPlanning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="Smart Meal Planning" 
          description="Create custom meal plans with nutritional balance and feeding schedules tailored to your pet"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Weekly Meal Plan
              </CardTitle>
              <CardDescription>
                Generate a complete weekly feeding schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Create Meal Plan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-600" />
                Recipe Library
              </CardTitle>
              <CardDescription>
                Browse healthy recipes for your pet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Browse Recipes
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                Shopping List Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Automatically generate shopping lists based on your meal plans and portion sizes.
              </p>
              <Button>
                Generate List
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Feeding Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Set up automatic reminders for feeding times and meal preparation.
              </p>
              <Button variant="outline">
                Set Reminders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
