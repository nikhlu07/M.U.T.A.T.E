import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface VaultCardProps {
  label?: string;
  children: ReactNode;
  className?: string;
  accentColor?: "infrared" | "aave-purple";
}

export const VaultCard = ({ label, children, className, accentColor = "infrared" }: VaultCardProps) => {
  const isAavePurple = accentColor === "aave-purple";
  
  return (
    <div className={cn("relative overflow-hidden group transition-all duration-500", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/80 to-canvas backdrop-blur-md -z-10" />
      
      <div className={cn(
        "h-full flex flex-col border border-ink/10 bg-canvas/40 shadow-[0_8px_32px_rgba(0,0,0,0.03)] p-6 md:p-8 relative transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:bg-canvas/60",
        isAavePurple ? "hover:border-aave-purple/30" : "hover:border-infrared/30"
      )}>
        <div className={cn(
          "absolute inset-0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
          isAavePurple ? "bg-gradient-to-r from-aave-purple/5" : "bg-gradient-to-r from-infrared/5"
        )} />
        
        {label && (
          <div className="mono mb-6 flex items-center justify-between uppercase relative z-10">
            <span>{label}</span>
          </div>
        )}

        <div className="relative z-10 flex-grow flex flex-col">
          {children}
        </div>

        {/* Enhanced Brutalist accents */}
        <div className={cn(
          "absolute top-0 left-0 w-3 h-3 border-t-[3px] border-l-[3px] border-ink/20 transition-all duration-300 group-hover:scale-110 group-hover:-translate-x-1 group-hover:-translate-y-1 z-20",
          isAavePurple ? "group-hover:border-aave-purple" : "group-hover:border-infrared"
        )} />
        <div className={cn(
          "absolute top-0 right-0 w-3 h-3 border-t-[3px] border-r-[3px] border-ink/20 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 z-20",
          isAavePurple ? "group-hover:border-aave-purple" : "group-hover:border-infrared"
        )} />
        <div className={cn(
          "absolute bottom-0 left-0 w-3 h-3 border-b-[3px] border-l-[3px] border-ink/20 transition-all duration-300 group-hover:scale-110 group-hover:-translate-x-1 group-hover:translate-y-1 z-20",
          isAavePurple ? "group-hover:border-aave-purple" : "group-hover:border-infrared"
        )} />
        <div className={cn(
          "absolute bottom-0 right-0 w-3 h-3 border-b-[3px] border-r-[3px] border-ink/20 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 group-hover:translate-y-1 z-20",
          isAavePurple ? "group-hover:border-aave-purple" : "group-hover:border-infrared"
        )} />
      </div>
    </div>
  );
};
