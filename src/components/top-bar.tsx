
import { Bell, Search, User, Menu } from "lucide-react";
import { NanoButton } from "./ui/nano-button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onMenuToggle: () => void;
  className?: string;
}

export function TopBar({ onMenuToggle, className }: TopBarProps) {
  const [language, setLanguage] = useState<"en" | "de">("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  return (
    <header className={cn("bg-white border-b px-4 py-2 flex items-center justify-between", className)}>
      <div className="flex items-center">
        <NanoButton
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onMenuToggle}
        >
          <Menu size={20} />
        </NanoButton>
        <div className="md:hidden text-xl font-bold text-primary">NanoSpace</div>
      </div>
      
      <div className="hidden md:flex items-center relative max-w-md flex-1 mx-4">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input 
          type="search"
          placeholder={language === "en" ? "Search..." : "Suchen..."}
          className="w-full rounded-md border pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <NanoButton 
          variant="outline" 
          size="sm" 
          onClick={toggleLanguage}
        >
          {language === "en" ? "DE" : "EN"}
        </NanoButton>
        <NanoButton variant="ghost" size="icon">
          <Bell size={20} />
        </NanoButton>
        <NanoButton variant="ghost" size="icon">
          <User size={20} />
        </NanoButton>
      </div>
    </header>
  );
}
