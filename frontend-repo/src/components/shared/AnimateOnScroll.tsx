import type { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export function AnimateOnScroll({ children, className }: AnimateOnScrollProps) {
  return <div className={className}>{children}</div>;
}

export function AnimatedItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
