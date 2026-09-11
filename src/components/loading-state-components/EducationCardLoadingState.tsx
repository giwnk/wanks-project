import { CalendarBlankIcon, GraduationCapIcon } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EducationCardLoadingState() {
  return (
    <div className="bg-card border-2 border-border p-5 shadow-retro flex flex-col gap-3 animate-pulse">
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div className="flex items-start gap-3">
          <div className="bg-background border-2 border-border p-2 shrink-0 shadow-retro mt-0.5">
            <GraduationCapIcon size={20} className="text-muted-foreground/40" />
          </div>
          <div className="flex flex-col gap-1.5 min-w-[180px]">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>

        <div className="bg-background border-2 border-border px-2.5 py-1 font-mono text-xs flex items-center gap-1.5 shadow-retro">
          <CalendarBlankIcon size={14} className="text-muted-foreground/30 shrink-0" />
          <Skeleton className="h-3.5 w-24" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-1 pl-1">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-3/4" />
      </div>
    </div>
  );
}
