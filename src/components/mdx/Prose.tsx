import { cn } from "@/lib/utils";
import React from "react";

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export default function Prose({ children, className }: ProseProps) {
  return (
    <div className={cn(
      "prose prose-stone dark:prose-invert max-w-none",
      // Headings
      "prose-headings:font-semibold prose-headings:tracking-tight",
      // Links
      "prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-primary",
      // Code blocks
      "prose-pre:rounded-lg prose-pre:border prose-pre:bg-muted",
      // Inline code
      "prose-code:rounded-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm",
      className
    )}>
      {children}
    </div>
  );
}