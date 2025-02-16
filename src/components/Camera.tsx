
import { useState, useRef } from "react";
import { Camera, Image } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const CameraComponent = ({ onCapture }: { onCapture: (image: string) => void }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast.error("Unable to access camera");
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const image = canvas.toDataURL("image/jpeg");
        onCapture(image);
        stopCamera();
        toast.success("Photo captured!");
      }
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {!showCamera ? (
        <Button
          onClick={startCamera}
          className="w-full h-40 border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-300"
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
            className="w-full rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button onClick={capturePhoto} variant="secondary">
              <Camera className="w-4 h-4 mr-2" />
              Capture
            </Button>
            <Button onClick={stopCamera} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
