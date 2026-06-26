import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16 relative", align === "center" && "text-center", className)}>
      <div className={cn(
        "absolute -top-6 -z-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl",
        align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
      )} />
      <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
