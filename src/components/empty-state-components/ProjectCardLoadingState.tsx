import { ImageIcon } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardLoadingState() {
  return (
    <div className="bg-card flex flex-col gap-3 border-2 p-4 border-border shadow-retro h-full justify-between animate-pulse">
      <div className="flex flex-col gap-3">
        {/* Top Bar Skeleton */}
        <div className="flex justify-between items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2 ml-auto">
            <Skeleton className="h-6 w-20 border-2 border-border" />
          </div>
        </div>

        {/* Thumbnail Box Skeleton */}
        <div className="border-2 border-border shadow-retro h-36 sm:h-40 bg-muted/40 flex items-center justify-center">
          <ImageIcon size={32} className="text-muted-foreground/30" />
        </div>

        {/* Title & Description Skeleton */}
        <div className="flex flex-col gap-2 py-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex flex-col gap-1.5 my-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-5/6" />
            <Skeleton className="h-3.5 w-4/6" />
          </div>
        </div>
      </div>

      {/* Tech Tags & Buttons Skeleton */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="size-6 bg-background border-2 border-border shadow-retro" />
            <div className="size-6 bg-background border-2 border-border shadow-retro" />
            <div className="size-6 bg-background border-2 border-border shadow-retro" />
          </div>
          <Skeleton className="h-4 w-28 ml-auto" />
        </div>

        <div className="flex items-center gap-2 w-full pt-1">
          <div className="h-9 flex-1 bg-background border-2 border-border shadow-retro flex items-center justify-center px-2">
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="h-9 flex-1 bg-background border-2 border-border shadow-retro flex items-center justify-center px-2">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
