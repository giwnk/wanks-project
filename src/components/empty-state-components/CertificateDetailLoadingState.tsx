import { ArrowLeftIcon, CertificateIcon } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function CertificateDetailLoadingState() {
  return (
    <div className="space-y-8 font-sans pb-12 animate-pulse">
      {/* Navigation Button Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-52 bg-background border-2 border-border shadow-retro flex items-center justify-center gap-2 px-4">
          <ArrowLeftIcon className="size-4 text-muted-foreground/40 shrink-0" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Main Certificate Card Header Skeleton */}
      <div className="bg-card border-2 border-border p-6 sm:p-8 shadow-retro space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-6 w-28 bg-background border-2 border-border shadow-retro px-3 py-1" />
            <div className="h-6 w-24 bg-background border-2 border-border shadow-retro px-3 py-1" />
          </div>

          <Skeleton className="h-9 sm:h-12 w-3/4 max-w-[550px]" />

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t-2 border-dashed border-border">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>

        {/* Large Image Preview Container Skeleton */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[500px] bg-muted/30 border-2 border-border overflow-hidden flex items-center justify-center shadow-retro">
          <CertificateIcon size={64} className="text-muted-foreground/30" />
        </div>

        {/* Metadata Details Grid & Action Buttons Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-background border-2 border-border p-5 shadow-retro space-y-3">
            <Skeleton className="h-4 w-40" />
            <Separator />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          <div className="bg-background border-2 border-border p-5 shadow-retro flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-3.5 w-full" />
            </div>
            <div className="h-11 w-full bg-background border-2 border-border shadow-retro" />
          </div>
        </div>
      </div>
    </div>
  );
}
