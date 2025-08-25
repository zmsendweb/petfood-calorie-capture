
import { ModernNavigation } from "@/components/navigation/ModernNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Scan, Image } from "lucide-react";

export function ImageRecognition() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <ModernNavigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Breed Identification</h1>
          <p className="text-muted-foreground">Upload a photo of your pet and our AI will identify the breed with detailed characteristics and care recommendations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-600" />
                Take Photo
              </CardTitle>
              <CardDescription>
                Use your camera to capture a photo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Open Camera
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                Upload Image
              </CardTitle>
              <CardDescription>
                Select an image from your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Choose File
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-purple-600" />
                AI Analysis
              </CardTitle>
              <CardDescription>
                Get instant breed identification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Start Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-orange-600" />
              Sample Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Your breed analysis results will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
