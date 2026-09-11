import { CertificateIcon } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CertificateCardLoadingState() {
  return (
    <div className="bg-card flex flex-col gap-4 border-2 border-border p-5 shadow-retro h-full justify-between animate-pulse">
      <div className="flex flex-col gap-3">
        {/* Certificate Image Preview Skeleton */}
        <div className="relative w-full h-44 bg-muted/30 border-2 border-border overflow-hidden flex items-center justify-center">
          <CertificateIcon size={48} className="text-muted-foreground/30" />
          <div className="absolute top-2 left-2 bg-background border-2 border-border px-2.5 py-1 flex items-center gap-1.5 shadow-retro">
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        {/* Certificate Title Skeleton */}
        <div className="flex flex-col gap-1.5 py-1">
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Metadata Skeleton */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t-2 border-dashed border-border pt-3">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-3.5 w-28" />
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex items-center gap-2 pt-2 border-t-2 border-border mt-auto">
        <div className="flex-1 h-9 bg-background border-2 border-border shadow-retro flex items-center justify-center">
          <Skeleton className="h-3.5 w-16" />
        </div>
        <div className="flex-1 h-9 bg-background border-2 border-border shadow-retro flex items-center justify-center">
          <Skeleton className="h-3.5 w-20" />
        </div>
      </div>
    </div>
  );
}
