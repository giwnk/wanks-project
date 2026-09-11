import React from "react";
import { FolderStarIcon, ImageBrokenIcon, ImageIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface EmptyImageProjectProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: "compact" | "default" | "detail";
}

export default function EmptyImageProject({
  title = "No Preview Available",
  description = "Project image is missing or failed to load.",
  className,
  variant = "default",
}: EmptyImageProjectProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "w-full h-full min-h-[140px] flex flex-col items-center justify-center gap-2 p-4 bg-muted/30 border-border text-center select-none",
          className,
        )}
      >
        <div className="bg-background border-2 border-border p-2.5 shrink-0">
          <ImageBrokenIcon
            size={24}
            className="text-primary"
            weight="duotone"
          />
        </div>
        <span className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center gap-3.5 p-6 sm:p-10 bg-card border-2 border-border shadow-retro text-center select-none",
        className,
      )}
    >
      <div className="bg-accent text-accent-foreground border-2 border-border p-3.5 shadow-retro flex items-center justify-center">
        <ImageBrokenIcon size={36} weight="duotone" />
      </div>

      <div className="flex flex-col gap-1.5 max-w-md">
        <h4 className="font-sans font-extrabold text-base sm:text-xl text-foreground uppercase tracking-tight">
          {title}
        </h4>
        {description && (
          <p className="font-serif text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
