
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, StopCircle, ScanBarcode } from "lucide-react";
import { toast } from "sonner";

interface BarcodeScannerProps {
  onBarcodeScanned: (barcode: string) => void;
  isProcessing?: boolean;
}

export function BarcodeScanner({ onBarcodeScanned, isProcessing }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startScanning = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      setIsScanning(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      
      toast.success("Camera started", {
        description: "Position the barcode within the camera view"
      });
    } catch (error) {
      console.error("Error starting camera:", error);
      toast.error("Camera access denied", {
        description: "Please allow camera access to scan barcodes"
      });
    }
  };

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const captureBarcode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    // Convert to data URL for processing
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // For demo purposes, we'll generate a mock barcode
    // In a real implementation, you'd use a barcode detection library
    const mockBarcode = Math.floor(Math.random() * 1000000000000).toString();
    
    onBarcodeScanned(mockBarcode);
    stopScanning();
    
    toast.success("Barcode detected", {
      description: `Scanned barcode: ${mockBarcode}`
    });
  };

  return (
    <div className="space-y-4">
      {!isScanning ? (
        <Button 
          onClick={startScanning}
          disabled={isProcessing}
          className="w-full"
          variant="outline"
        >
          <Camera className="h-4 w-4 mr-2" />
          Start Barcode Scanner
        </Button>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-64 object-cover rounded-lg bg-gray-100"
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              
              {/* Scanning overlay */}
              <div className="absolute inset-0 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
                <div className="bg-black/50 text-white px-3 py-1 rounded text-sm">
                  <ScanBarcode className="h-4 w-4 inline mr-2" />
                  Position barcode in view
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={captureBarcode} className="flex-1">
                <ScanBarcode className="h-4 w-4 mr-2" />
                Scan Barcode
              </Button>
              <Button onClick={stopScanning} variant="outline">
                <StopCircle className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
