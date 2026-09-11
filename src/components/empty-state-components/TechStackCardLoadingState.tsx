import { CpuIcon } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechStackCardLoadingState() {
  return (
    <div className="bg-card border-2 border-border p-4 shadow-retro flex items-center gap-3.5 animate-pulse">
      <div className="bg-background border-2 border-border p-2.5 shadow-retro shrink-0 flex items-center justify-center">
        <CpuIcon size={24} className="text-muted-foreground/30" />
      </div>

      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
