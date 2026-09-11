import { FolderStarIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCardLoadingState from "./ProjectCardLoadingState";

export default function ProjectSectionLoadingState() {
  return (
    <section className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 flex flex-col gap-3 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="bg-background shadow-retro border-2 border-border w-fit flex gap-1.5 items-center px-2.5 py-1">
          <FolderStarIcon weight="fill" className="text-muted-foreground/40 size-4 shrink-0" />
          <Skeleton className="h-4 w-36 sm:w-44" />
        </div>
        <Skeleton className="h-4 w-32" />
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <ProjectCardLoadingState />
        <ProjectCardLoadingState />
      </div>
    </section>
  );
}
