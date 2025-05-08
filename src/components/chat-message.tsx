
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface ChatMessageProps {
  message: string;
  isNano?: boolean;
  userName?: string;
  timestamp: string;
  avatar?: string;
  className?: string;
}

export function ChatMessage({
  message,
  isNano = false,
  userName,
  timestamp,
  avatar,
  className,
}: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "py-2 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center",
          isNano ? "bg-light-sea-green text-white" : "bg-orange-peel text-white"
        )}>
          {avatar ? (
            <img src={avatar} alt="User avatar" className="w-full h-full rounded-full" />
          ) : (
            <span>{isNano ? "N" : userName?.charAt(0) || "U"}</span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-medium">
              {isNano ? "Nano" : userName || "User"}
            </span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          
          <div className={cn(
            "mt-1 p-3 rounded-lg",
            isNano ? "bg-mint-green" : "bg-muted"
          )}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
