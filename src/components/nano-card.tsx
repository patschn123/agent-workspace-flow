
import React from "react";
import { cn } from "@/lib/utils";

interface NanoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  type: "Personal Nano" | "Team Nano" | "Showcase";
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NanoCard({ title, type, icon, className, onClick, ...props }: NanoCardProps) {
  return (
    <div 
      className={cn("nano-card p-4 cursor-pointer animate-fade-in", className)} 
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start">
        {icon && (
          <div className="mr-3 flex-shrink-0 bg-mint-green rounded-full p-2">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="mt-1 inline-block bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
            {type}
          </div>
        </div>
      </div>
    </div>
  );
}
