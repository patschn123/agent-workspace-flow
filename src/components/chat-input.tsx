
import { useState } from "react";
import { NanoButton } from "./ui/nano-button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  className?: string;
}

export function ChatInput({ onSendMessage, placeholder = "Type a message...", className }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("flex items-center gap-2 p-3 border-t bg-white", className)}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <NanoButton 
        type="submit" 
        size="icon"
        disabled={!message.trim()}
      >
        <Send size={18} />
      </NanoButton>
    </form>
  );
}
