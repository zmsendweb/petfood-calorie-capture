
import { useMemo, useState } from "react";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { EnhancedMealEntryForm, EnhancedMealCard } from "./EnhancedMealEntry";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { NutritionQuery } from "./NutritionQuery";
import { Link } from "react-router-dom";
import { Cat, Dog, Plus } from "lucide-react";
import { usePetProfiles } from "@/hooks/use-pet-profiles";

interface MealEntry {
  id: string;
  type: string;
  calories: number;
  photo: string;
  foodName?: string;
  brandName?: string;
  serving?: string;
  timestamp: Date;
  petId?: string;
}

export const Dashboard = ({ meals: initialMeals }: { meals: MealEntry[] }) => {
  const [meals, setMeals] = useState<MealEntry[]>(initialMeals);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<string>("meals");
  const { petProfiles } = usePetProfiles();

  const handleAddMeal = (meal: MealEntry) => {
    setMeals(prevMeals => [...prevMeals, meal]);
  };

  const dailyCalories = useMemo(() => {
    return meals
      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
      .reduce((acc, meal) => acc + meal.calories, 0);
  }, [meals, selectedDate]);

  const chartData = useMemo(() => {
    const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
    return mealTypes.map((type) => ({
      name: type,
      calories: meals
        .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
        .filter((meal) => meal.type === type)
        .reduce((acc, meal) => acc + meal.calories, 0),
    }));
  }, [meals, selectedDate]);

  // Calculate daily totals for calendar
  const calendarData = useMemo(() => {
    const dailyTotals = new Map<string, number>();
    meals.forEach(meal => {
      const dateKey = format(new Date(meal.timestamp), 'yyyy-MM-dd');
      dailyTotals.set(dateKey, (dailyTotals.get(dateKey) || 0) + meal.calories);
    });
    return dailyTotals;
  }, [meals]);

  // Selected date meals
  const selectedDateMeals = useMemo(() => {
    return meals
      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [meals, selectedDate]);

  const modifiers = {
    hasMeals: (date: Date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      return calendarData.has(dateKey);
    }
  };

  const modifiersStyles = {
    hasMeals: {
      fontWeight: 'bold',
      color: 'var(--primary)',
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="meals" className="flex-1">Meal Tracker</TabsTrigger>
          <TabsTrigger value="nutrition" className="flex-1">Nutrition Assistant</TabsTrigger>
          <TabsTrigger value="pets" className="flex-1">Pet Profiles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meals" className="space-y-6">
          <EnhancedMealEntryForm onSave={handleAddMeal} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">Daily Summary</h2>
              <div className="text-4xl font-bold text-primary">
                {dailyCalories} <span className="text-lg text-gray-500">calories</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {format(selectedDate, 'MMMM d, yyyy')}
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                modifiers={{
                  hasMeals: (date) => {
                    const dateKey = format(date, 'yyyy-MM-dd');
                    return meals.some(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === dateKey);
                  }
                }}
                modifiersStyles={{
                  hasMeals: {
                    fontWeight: 'bold',
                    color: 'var(--primary)',
                  }
                }}
                footer={
                  <div className="text-sm text-gray-500 text-center mt-2">
                    Days with recorded meals are highlighted
                  </div>
                }
              />
            </Card>
          </div>

          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Calories by Meal Type</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  {
                    name: "breakfast",
                    calories: meals
                      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
                      .filter((meal) => meal.type === "breakfast")
                      .reduce((acc, meal) => acc + meal.calories, 0),
                  },
                  {
                    name: "lunch",
                    calories: meals
                      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
                      .filter((meal) => meal.type === "lunch")
                      .reduce((acc, meal) => acc + meal.calories, 0),
                  },
                  {
                    name: "dinner",
                    calories: meals
                      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
                      .filter((meal) => meal.type === "dinner")
                      .reduce((acc, meal) => acc + meal.calories, 0),
                  },
                  {
                    name: "snack",
                    calories: meals
                      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
                      .filter((meal) => meal.type === "snack")
                      .reduce((acc, meal) => acc + meal.calories, 0),
                  },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#666" }}
                    tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                  />
                  <YAxis tick={{ fill: "#666" }} />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#8CA896" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Selected date meals section */}
          {meals
            .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
            .length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Recorded Meals for {format(selectedDate, 'MMMM d, yyyy')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals
                  .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map(meal => (
                    <EnhancedMealCard key={meal.id} meal={meal} />
                  ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nutrition">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Pet Nutrition Assistant</h2>
              <p className="text-gray-600 mb-4">
                Get personalized nutrition advice for your pets based on their specific needs.
              </p>
              <NutritionQuery />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pets">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">Your Pet Profiles</h2>
                  <p className="text-gray-600">
                    Manage your pet profiles and track their dietary needs
                  </p>
                </div>
                <Link to="/pet-profiles">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Manage Pets
                  </Button>
                </Link>
              </div>

              {petProfiles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {petProfiles.slice(0, 3).map(pet => (
                    <Card key={pet.id} className="overflow-hidden">
                      <div className="h-32 relative">
                        <img 
                          src={pet.photo || `https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80`} 
                          alt={pet.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          {pet.type === 'dog' ? (
                            <Dog className="h-5 w-5 bg-black/50 text-white p-1 rounded-full" />
                          ) : (
                            <Cat className="h-5 w-5 bg-black/50 text-white p-1 rounded-full" />
                          )}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold">{pet.name}</h3>
                        <p className="text-sm text-gray-500">
                          {pet.breed || pet.type} • {pet.age} {pet.ageUnit}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">No pet profiles found. Add your first pet!</p>
                  <Link to="/pet-profiles">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Pet Profile
                    </Button>
                  </Link>
                </div>
              )}
              
              {petProfiles.length > 3 && (
                <div className="text-center mt-4">
                  <Link to="/pet-profiles">
                    <Button variant="outline">
                      View All Pets ({petProfiles.length})
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Link to="/standards" className="flex-1">
                <Card className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col justify-between">
                  <h3 className="font-semibold">Dog Nutrition Standards</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Browse feeding guidelines for different dog breeds and ages
                  </p>
                </Card>
              </Link>
              <Link to="/cat-standards" className="flex-1">
                <Card className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col justify-between">
                  <h3 className="font-semibold">Cat Nutrition Standards</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Browse feeding guidelines for different cat breeds and ages
                  </p>
                </Card>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
