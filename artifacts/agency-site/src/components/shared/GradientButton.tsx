import React from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function GradientButton({ href, children, className, onClick, ...props }: GradientButtonProps) {
  const [, setLocation] = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (href) {
      e.preventDefault();
      
      const [path, hash] = href.split('#');
      
      if (path && window.location.pathname !== path) {
        setLocation(href);
      } else if (hash) {
        setLocation(href);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      } else {
        setLocation(href);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:brightness-110 border border-white/20 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 w-[200%] h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite] transition-opacity duration-300 pointer-events-none" style={{ backgroundSize: '50% 100%' }} />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}
