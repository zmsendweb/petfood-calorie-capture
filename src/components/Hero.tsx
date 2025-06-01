
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Award } from "lucide-react";

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Your Pet's Health, <span className="text-blue-600">Our Priority</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Complete nutrition tracking, breed standards, and health management for your beloved pets. 
          Track calories, discover recipes, and ensure your furry friends live their best life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-3">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3">
            Learn More
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Health Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your pet's nutrition, calories, and health metrics with precision and care.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Breed Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access comprehensive breed information and standards for dogs and cats.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Expert Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get AI-powered recommendations and expert advice for optimal pet care.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
