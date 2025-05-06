
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase as supabaseClient } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

interface VoiceInputProps {
  onTranscription: (text: string) => void;
  placeholder?: string;
  isProcessing?: boolean;
}

export function VoiceInput({ onTranscription, placeholder = "", isProcessing = false }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const isMobile = useIsMobile();

  // Clean up audio recording when component unmounts
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        const tracks = mediaRecorderRef.current.stream?.getTracks();
        if (tracks) {
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      console.log("Starting voice recording...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        
        // Stop tracks after recording
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.info("Recording started", { description: "Speak now..." });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error("Could not access microphone", { description: "Please check your browser permissions" });
    }
  };

  const stopRecording = () => {
    console.log("Stopping voice recording...");
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsTranscribing(true);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      console.log("Processing audio...");
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        try {
          const base64Audio = reader.result?.toString().split(',')[1];
          if (!base64Audio) throw new Error("Failed to convert audio to base64");

          console.log("Calling voice-to-text function...");
          const { data, error } = await supabaseClient.functions.invoke('voice-to-text', {
            body: { audio: base64Audio }
          });

          if (error) {
            console.error("Voice-to-text error:", error);
            throw new Error(error.message);
          }
          
          if (data?.text) {
            console.log("Transcription received:", data.text);
            onTranscription(data.text);
            toast.success("Voice transcribed successfully");
          } else {
            console.error("No transcription returned");
            toast.error("No transcription returned", { description: "Please try speaking more clearly" });
          }
        } catch (err) {
          console.error("Error in transcription processing:", err);
          toast.error("Voice transcription failed");
        } finally {
          setIsTranscribing(false);
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        setIsTranscribing(false);
        toast.error("Error processing voice recording");
      };
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast.error("Error processing voice input");
      setIsTranscribing(false);
    }
  };

  const buttonClassName = isMobile ? "w-10 h-10" : "";

  return (
    <div className="relative flex items-center">
      <Button
        type="button"
        variant={isRecording ? "destructive" : "outline"}
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isTranscribing || isProcessing}
        className={`rounded-full flex-shrink-0 ${buttonClassName}`}
        aria-label={isRecording ? "Stop recording" : "Start voice input"}
      >
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      
      {(isTranscribing || isProcessing) && (
        <div className="absolute -right-6 top-1/2 -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
      
      {placeholder && !isRecording && !isTranscribing && !isProcessing && (
        <span className="ml-2 text-sm text-muted-foreground hidden sm:inline-block">
          {placeholder}
        </span>
      )}
    </div>
  );
}
