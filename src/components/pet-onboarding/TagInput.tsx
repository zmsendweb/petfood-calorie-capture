
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export const TagInput: React.FC<TagInputProps> = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder || "Add new item..."}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <Button type="button" onClick={handleAddTag}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1">
            {tag}
            <button
              type="button"
              className="ml-2 text-xs opacity-70 hover:opacity-100"
              onClick={() => handleRemoveTag(tag)}
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
