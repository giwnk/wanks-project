import { ArrowLeftIcon, ImageIcon } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProjectDetailLoadingState() {
  return (
    <div className="space-y-8 font-sans pb-12 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-44 bg-background border-2 border-border shadow-retro flex items-center justify-center gap-2 px-4">
          <ArrowLeftIcon className="size-4 text-muted-foreground/40 shrink-0" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Main Header Box Skeleton */}
      <div className="bg-card border-2 border-border p-6 sm:p-8 shadow-retro space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-6 w-24 bg-background border-2 border-border shadow-retro px-2 py-1" />
            <div className="h-6 w-20 bg-background border-2 border-border shadow-retro px-2 py-1" />
          </div>

          <Skeleton className="h-9 sm:h-12 w-3/4 max-w-[500px]" />
          <Skeleton className="h-5 w-1/2 max-w-[350px]" />
        </div>

        {/* Large Media Box Skeleton */}
        <div className="relative w-full aspect-video max-h-[500px] bg-muted/30 border-2 border-border flex items-center justify-center shadow-retro">
          <ImageIcon size={64} className="text-muted-foreground/30" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-dashed border-border">
          <div className="h-11 w-40 bg-background border-2 border-border shadow-retro" />
          <div className="h-11 w-40 bg-background border-2 border-border shadow-retro" />
        </div>
      </div>

      {/* Description & Tech Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 bg-card border-2 border-border p-6 shadow-retro">
          <Skeleton className="h-6 w-48" />
          <Separator />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>

        <div className="space-y-6 bg-card border-2 border-border p-6 shadow-retro">
          <Skeleton className="h-6 w-36" />
          <Separator />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
