import { BriefcaseIcon, CalendarBlankIcon } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExperienceCardLoadingState() {
  return (
    <div className="bg-card border-2 border-border p-5 shadow-retro flex flex-col gap-3 relative animate-pulse">
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
          <Skeleton className="h-6 w-3/4 max-w-[280px]" />
          <div className="flex items-center gap-1.5 pt-0.5">
            <BriefcaseIcon size={16} className="text-muted-foreground/30 shrink-0" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-background border-2 border-border px-2.5 py-0.5 shadow-retro">
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="bg-background border-2 border-border px-2.5 py-0.5 flex items-center gap-1.5 shadow-retro">
            <CalendarBlankIcon size={14} className="text-muted-foreground/30 shrink-0" />
            <Skeleton className="h-3.5 w-28" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-1">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
      </div>
    </div>
  );
}
