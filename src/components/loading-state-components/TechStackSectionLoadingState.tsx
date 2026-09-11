import { CpuIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import TechStackCardLoadingState from "./TechStackCardLoadingState";

export default function TechStackSectionLoadingState({ count = 8, isHome = false }: { count?: number; isHome?: boolean }) {
  return (
    <section className={`flex flex-col gap-3 animate-pulse ${isHome ? "my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20" : ""}`}>
      <div className="flex justify-between items-center">
        <div className="bg-background shadow-retro border-2 border-border w-fit flex gap-1.5 items-center px-2.5 py-1">
          <CpuIcon weight="fill" className="text-muted-foreground/40 size-4 shrink-0" />
          <Skeleton className="h-4 w-32 sm:w-40" />
        </div>
        {isHome && <Skeleton className="h-4 w-36" />}
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <TechStackCardLoadingState key={idx} />
        ))}
      </div>
    </section>
  );
}
