import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase as supabaseClient } from "@/integrations/supabase/client";

interface VoiceInputProps {
  onTranscription: (text: string) => void;
  placeholder?: string;
  isProcessing?: boolean;
}

export function VoiceInput({ onTranscription, placeholder = "Voice input...", isProcessing = false }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
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
      toast.info("Recording started. Speak now.");
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsTranscribing(true);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        if (!base64Audio) throw new Error("Failed to convert audio to base64");

        const { data, error } = await supabaseClient.functions.invoke('voice-to-text', {
          body: { audio: base64Audio }
        });

        if (error) throw new Error(error.message);
        
        if (data?.text) {
          onTranscription(data.text);
          toast.success("Voice transcribed successfully");
        } else {
          toast.error("No transcription returned");
        }
        setIsTranscribing(false);
      };
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast.error("Error processing voice input");
      setIsTranscribing(false);
    }
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant={isRecording ? "destructive" : "outline"}
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isTranscribing || isProcessing}
        className="rounded-full"
      >
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      {(isTranscribing || isProcessing) && (
        <div className="absolute -right-6 top-1/2 -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
      {placeholder && !isRecording && !isTranscribing && !isProcessing && (
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {placeholder}
        </span>
      )}
    </div>
  );
}
