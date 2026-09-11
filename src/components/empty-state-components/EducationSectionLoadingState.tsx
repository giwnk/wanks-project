import { StudentIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import EducationCardLoadingState from "./EducationCardLoadingState";

export default function EducationSectionLoadingState({ count = 2 }: { count?: number }) {
  return (
    <section className="flex flex-col gap-3 animate-pulse">
      <div className="bg-background shadow-retro border-2 border-border w-fit flex gap-1.5 items-center px-2.5 py-1">
        <StudentIcon weight="fill" className="text-muted-foreground/40 size-4 shrink-0" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <EducationCardLoadingState key={idx} />
        ))}
      </div>
    </section>
  );
}
