
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { VoiceInput } from "../voice/VoiceInput";
import { BarcodeScanner } from "./BarcodeScanner";

interface SearchFormProps {
  searchMode: "keyword" | "barcode" | "nlp";
  query: string;
  setQuery: (query: string) => void;
  nlpDescription: string;
  setNlpDescription: (desc: string) => void;
  barcodeValue: string;
  setBarcodeValue: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function SearchForm({
  searchMode,
  query,
  setQuery,
  nlpDescription,
  setNlpDescription,
  barcodeValue,
  setBarcodeValue,
  handleSearch,
  isLoading
}: SearchFormProps) {
  const handleVoiceInput = (text: string) => {
    if (searchMode === "keyword") {
      setQuery(text);
    } else if (searchMode === "barcode") {
      const numericOnly = text.replace(/\D/g, '');
      setBarcodeValue(numericOnly);
    } else if (searchMode === "nlp") {
      setNlpDescription(text);
    }
  };

  const handleBarcodeScanned = (barcode: string) => {
    setBarcodeValue(barcode);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        {searchMode === "keyword" && (
          <>
            <Input
              placeholder="Search for pet food (e.g., Royal Canin, Purina)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <VoiceInput 
              onTranscription={handleVoiceInput} 
              placeholder="Speak to search..."
              isProcessing={isLoading}
            />
          </>
        )}
        
        {searchMode === "barcode" && (
          <>
            <Input
              placeholder="Enter barcode number"
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <VoiceInput 
              onTranscription={handleVoiceInput} 
              placeholder="Speak barcode digits..."
              isProcessing={isLoading}
            />
          </>
        )}
        
        {searchMode === "nlp" && (
          <>
            <Input
              placeholder="Describe the food (e.g., 1 cup of dry dog food)"
              value={nlpDescription}
              onChange={(e) => setNlpDescription(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <VoiceInput 
              onTranscription={handleVoiceInput} 
              placeholder="Describe food..."
              isProcessing={isLoading}
            />
          </>
        )}
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* Barcode Scanner - only show in barcode mode */}
      {searchMode === "barcode" && (
        <BarcodeScanner 
          onBarcodeScanned={handleBarcodeScanned}
          isProcessing={isLoading}
        />
      )}
    </div>
  );
}
