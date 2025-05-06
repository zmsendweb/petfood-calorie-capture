
import { useState, useRef, useEffect } from "react";
import { Camera, Image } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export const CameraComponent = ({ onCapture }: { onCapture: (image: string) => void }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  // Clean up function to stop camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      console.log("Starting camera...");
      
      // Use environment-facing camera on mobile devices
      const constraints = {
        video: isMobile 
          ? { facingMode: { ideal: "environment" } }
          : true
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        console.log("Camera started successfully");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError("Unable to access camera. Please check your browser permissions.");
      toast.error("Unable to access camera", {
        description: "Please ensure camera permissions are enabled for this site"
      });
    }
  };

  const stopCamera = () => {
    console.log("Stopping camera...");
    if (stream) {
      stream.getTracks().forEach(track => {
        console.log(`Stopping track: ${track.kind}`);
        track.stop();
      });
      setStream(null);
      setShowCamera(false);
      console.log("Camera stopped");
    }
  };

  const capturePhoto = () => {
    console.log("Capturing photo...");
    if (videoRef.current) {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        console.log(`Canvas dimensions: ${canvas.width}x${canvas.height}`);
        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0);
          const image = canvas.toDataURL("image/jpeg");
          console.log("Photo captured successfully");
          onCapture(image);
          stopCamera();
          toast.success("Photo captured!");
        } else {
          console.error("Failed to get canvas context");
          toast.error("Failed to capture photo");
        }
      } catch (error) {
        console.error("Error capturing photo:", error);
        toast.error("Failed to capture photo");
      }
    } else {
      console.error("Video reference is null");
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {cameraError && (
        <div className="p-4 mb-4 text-sm text-red-600 bg-red-50 rounded-md">
          {cameraError}
        </div>
      )}
      
      {!showCamera ? (
        <Button
          onClick={startCamera}
          className="w-full h-40 border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-300"
          type="button"
        >
          <Camera className="w-6 h-6 mr-2" />
          Take Photo
        </Button>
      ) : (
        <div className="relative animate-fade-in">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-lg shadow-lg"
            style={{ maxHeight: "60vh" }}
            onLoadedMetadata={() => console.log("Video metadata loaded")}
            onPlay={() => console.log("Video playback started")}
            onError={(e) => {
              console.error("Video error:", e);
              setCameraError("Error with video stream");
            }}
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button 
              onClick={capturePhoto} 
              variant="secondary"
              className="shadow-md"
              type="button"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture
            </Button>
            <Button 
              onClick={stopCamera} 
              variant="outline"
              className="bg-white/90 shadow-md"
              type="button"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
