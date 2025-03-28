
import { Button } from "@/components/ui/button";
import { Search, Barcode, MessageSquare } from "lucide-react";

interface SearchModesProps {
  searchMode: "keyword" | "barcode" | "nlp";
  setSearchMode: (mode: "keyword" | "barcode" | "nlp") => void;
}

export function SearchModes({ searchMode, setSearchMode }: SearchModesProps) {
  return (
    <div className="flex justify-center space-x-2">
      <Button
        variant={searchMode === "keyword" ? "default" : "outline"}
        onClick={() => setSearchMode("keyword")}
        size="sm"
      >
        <Search className="h-4 w-4 mr-2" />
        Keyword
      </Button>
      <Button
        variant={searchMode === "barcode" ? "default" : "outline"}
        onClick={() => setSearchMode("barcode")}
        size="sm"
      >
        <Barcode className="h-4 w-4 mr-2" />
        Barcode
      </Button>
      <Button
        variant={searchMode === "nlp" ? "default" : "outline"}
        onClick={() => setSearchMode("nlp")}
        size="sm"
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Description
      </Button>
    </div>
  );
}
