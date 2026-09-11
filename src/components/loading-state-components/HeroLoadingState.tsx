import {
  CircleIcon,
  DownloadSimpleIcon,
  FoldersIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeroLoadingState() {
  return (
    <section className="bg-card flex flex-col gap-4 border-2 border-border my-4 sm:my-8 mx-4 sm:mx-10 lg:mx-20 h-fit p-5 sm:p-8 lg:p-10 shadow-retro-md animate-pulse">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
        {/* Left Main Content */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-3.5">
          {/* Status Tag Badge Skeleton */}
          <div className="bg-background shadow-retro border-2 border-border w-fit flex gap-1.5 items-center px-2.5 py-1">
            <CircleIcon weight="fill" className="size-3 text-muted-foreground/40 shrink-0" />
            <Skeleton className="h-3.5 w-52 sm:w-64" />
          </div>

          {/* Full Name Skeleton */}
          <div className="flex flex-col gap-2 max-w-full lg:max-w-3/4 py-1">
            <Skeleton className="h-9 sm:h-10 lg:h-12 w-full max-w-[340px]" />
            <Skeleton className="h-9 sm:h-10 lg:h-12 w-2/3 max-w-[220px]" />
          </div>

          {/* Tagline Skeleton */}
          <Skeleton className="h-6 sm:h-7 w-3/4 max-w-[300px] mt-1" />

          {/* About Me Skeleton */}
          <div className="w-full my-3 sm:my-5 flex flex-col gap-2.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="h-11 w-36 bg-background border-2 border-border shadow-retro flex items-center justify-center gap-2 px-4">
              <FoldersIcon weight="regular" className="size-5 text-muted-foreground/40 shrink-0" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="h-11 w-36 bg-background border-2 border-border shadow-retro flex items-center justify-center gap-2 px-4">
              <DownloadSimpleIcon weight="regular" className="size-5 text-muted-foreground/40 shrink-0" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          <Separator className="my-1 border-b-2 border-border/75 max-w-full" />

          {/* Social Links & Location Skeleton */}
          <div className="w-full flex flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 bg-background border-2 border-border shadow-retro flex items-center justify-center">
                <GithubLogoIcon className="size-5 text-muted-foreground/40" />
              </div>
              <div className="h-10 w-10 bg-background border-2 border-border shadow-retro flex items-center justify-center">
                <LinkedinLogoIcon className="size-5 text-muted-foreground/40" />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPinIcon weight="fill" className="size-5 sm:size-6 text-muted-foreground/40 shrink-0" />
              <Skeleton className="h-4 w-28 sm:w-32" />
            </div>
          </div>
        </div>

        {/* Right Avatar Box Skeleton */}
        <div className="lg:col-span-2 border-2 border-border w-fit shadow-retro p-3 sm:p-4 bg-background self-center justify-self-center mx-auto flex justify-center items-center">
          <div className="relative size-52 sm:size-60 rounded-none border-2 border-border bg-muted/30 p-2 shadow-retro-md">
            <div className="relative size-full bg-card border-2 border-border flex items-center justify-center">
              <UserIcon size={48} className="text-muted-foreground/30" />
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-2.5 border-b-2 border-border/75 max-w-full" />

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="border-2 flex flex-col justify-center bg-background p-3 items-center border-border shadow-retro gap-2 min-h-[72px]"
          >
            <Skeleton className="h-7 w-12" />
            <Skeleton className="h-4 w-24 sm:w-28" />
          </div>
        ))}
      </div>
    </section>
  );
}