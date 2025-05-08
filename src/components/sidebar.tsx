
import { useState } from "react";
import { NanoButton } from "./ui/nano-button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Home, Star, Users, Briefcase, Compass, Plus } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn("hidden md:block bg-white border-r relative", 
      collapsed ? "w-16" : "w-64", 
      className
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h1 className="text-xl font-bold text-primary">NanoSpace</h1>
          )}
          <NanoButton
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </NanoButton>
        </div>

        <div className="space-y-1">
          <SidebarItem icon={<Home size={20} />} label="Recents" active collapsed={collapsed} />
          <SidebarItem icon={<Star size={20} />} label="Starred" collapsed={collapsed} />
          <SidebarItem icon={<Users size={20} />} label="My Workspaces" collapsed={collapsed} />
          <SidebarItem icon={<Briefcase size={20} />} label="Team Workspaces" collapsed={collapsed} />
          <SidebarItem icon={<Compass size={20} />} label="Showcases" collapsed={collapsed} />
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <NanoButton className="w-full gap-2" variant="accent">
          <Plus size={16} />
          {!collapsed && "Create New"}
        </NanoButton>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

function SidebarItem({ icon, label, active, collapsed }: SidebarItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
        collapsed && "justify-center"
      )}
    >
      <div>{icon}</div>
      {!collapsed && <span>{label}</span>}
    </div>
  );
}
