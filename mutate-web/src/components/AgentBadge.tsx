import { ReactNode } from "react";

interface AgentBadgeProps {
  children: ReactNode;
  dot?: boolean;
}

export const AgentBadge = ({ children, dot = true }: AgentBadgeProps) => (
  <span className="agent-badge pill">
    {dot && <span className="inline-block h-1.5 w-1.5 bg-infrared flash-dot" />}
    {children}
  </span>
);
