
import { AppNavigation } from "@/components/AppNavigation";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Sparkles } from "lucide-react";

export function ImageRecognition() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="AI Breed Identification" 
          description="Upload a photo of your pet and our AI will identify the breed with detailed characteristics and care recommendations"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                Take Photo
              </CardTitle>
              <CardDescription>
                Use your camera to capture a clear photo of your pet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                <Camera className="h-5 w-5 mr-2" />
                Open Camera
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                Upload Photo
              </CardTitle>
              <CardDescription>
                Choose an existing photo from your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" variant="outline">
                <Upload className="h-5 w-5 mr-2" />
                Upload Image
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Upload Photo</h3>
                <p className="text-sm text-gray-600">Take or upload a clear photo of your pet</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">Our AI analyzes facial features and body structure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-gray-600">Receive breed identification and care recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
