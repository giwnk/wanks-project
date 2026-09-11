import { MapPinIcon, PulseIcon, TerminalIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function DescriptionSectionLoadingState() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-pulse">
      {/* Left Main Card Skeleton */}
      <div className="lg:col-span-7 xl:col-span-8 bg-card border-2 border-border p-5 sm:p-7 shadow-retro-md flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-9 sm:h-10 w-2/3 max-w-[320px]" />
        </div>

        <Separator />

        <div className="flex flex-col gap-2.5 my-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Buttons & Links Skeleton */}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-3">
          <div className="h-10 w-36 bg-background border-2 border-border shadow-retro" />
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 bg-background border-2 border-border shadow-retro" />
            <div className="h-10 w-10 bg-background border-2 border-border shadow-retro" />
          </div>
        </div>
      </div>

      {/* Right Quick Info Panel Skeleton */}
      <div className="lg:col-span-5 xl:col-span-4 bg-card border-2 border-border p-5 sm:p-6 shadow-retro-md flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-3.5">
          {/* Location */}
          <div className="bg-background border-2 border-border p-3.5 shadow-retro flex items-center gap-3">
            <div className="bg-muted/40 border-2 border-border p-2 shrink-0">
              <MapPinIcon size={20} className="text-muted-foreground/40" />
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>

          {/* Focus */}
          <div className="bg-background border-2 border-border p-3.5 shadow-retro flex items-center gap-3">
            <div className="bg-muted/40 border-2 border-border p-2 shrink-0">
              <TerminalIcon size={20} className="text-muted-foreground/40" />
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Status */}
          <div className="bg-background border-2 border-border p-3.5 shadow-retro flex items-center gap-3">
            <div className="bg-muted/40 border-2 border-border p-2 shrink-0">
              <PulseIcon size={20} className="text-muted-foreground/40" />
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
