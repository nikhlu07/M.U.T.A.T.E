import { cn } from "@/lib/utils";

interface StatusDotProps {
  color?: "infrared" | "ink" | "graphite" | "gold";
  className?: string;
}

const colorMap = {
  infrared: "bg-infrared",
  ink: "bg-ink",
  graphite: "bg-graphite",
  gold: "bg-gold",
};

export const StatusDot = ({ color = "infrared", className }: StatusDotProps) => (
  <span
    aria-hidden
    className={cn("inline-block h-2 w-2 flash-dot", colorMap[color], className)}
  />
);
