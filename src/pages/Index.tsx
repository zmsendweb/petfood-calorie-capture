import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter mb-4">Pet Nutrition Tracker</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your pet's meals, calculate nutritional needs, and get personalized feeding guidelines
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/dashboard">
            <Card className="hover:shadow-lg transition-all h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Meal Tracker</CardTitle>
                <CardDescription>
                  Log meals, track calories, and monitor your pet's diet
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-40 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?q=80" 
                    alt="Meal Tracker" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/standards">
            <Card className="hover:shadow-lg transition-all h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Dog Nutrition Standards</CardTitle>
                <CardDescription>
                  Learn about the nutritional needs of different dog breeds
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-40 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80" 
                    alt="Dog Nutrition" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/cat-standards">
            <Card className="hover:shadow-lg transition-all h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Cat Nutrition Standards</CardTitle>
                <CardDescription>
                  Learn about the nutritional needs of different cat breeds
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-40 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80" 
                    alt="Cat Nutrition" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/pet-profiles">
            <Card className="hover:shadow-lg transition-all h-full overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Pet Profiles</CardTitle>
                <CardDescription>
                  Create and manage profiles for all your pets
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-40 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?q=80" 
                    alt="Pet Profiles" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
