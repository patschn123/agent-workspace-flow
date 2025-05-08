
import { Home, Star, Users, Briefcase, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BottomNavProps {
  className?: string;
  language: "en" | "de";
}

export function BottomNav({ className, language }: BottomNavProps) {
  const [active, setActive] = useState("recents");
  
  const items = [
    {
      id: "recents",
      icon: <Home size={20} />,
      label: language === "en" ? "Recents" : "Neueste",
    },
    {
      id: "starred",
      icon: <Star size={20} />,
      label: language === "en" ? "Starred" : "Favoriten",
    },
    {
      id: "my-workspaces",
      icon: <Users size={20} />,
      label: language === "en" ? "My Spaces" : "Meine Spaces",
    },
    {
      id: "team-workspaces",
      icon: <Briefcase size={20} />,
      label: language === "en" ? "Teams" : "Teams",
    },
    {
      id: "showcases",
      icon: <Compass size={20} />,
      label: language === "en" ? "Showcases" : "Showcases",
    },
  ];

  return (
    <nav className={cn("bottom-nav", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={cn(
            "bottom-nav-item", 
            active === item.id && "text-primary"
          )}
        >
          {item.icon}
          <span className="mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
