"use client";
import {
  ArrowUpRightIcon,
  CaretRightIcon,
  FolderStarIcon,
  GlobeIcon,
} from "@phosphor-icons/react";
import { FeaturedProject } from "../types/home.type";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/lib/dynamic-icon";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function getSourceUrlInfo(url?: string | null) {
  if (!url) return null;
  const lower = url.toLowerCase();

  if (lower.includes("github.com")) {
    return { label: "GitHub", iconName: "siGithub" };
  }
  if (lower.includes("figma.com")) {
    return { label: "Figma", iconName: "siFigma" };
  }
  if (lower.includes("dribbble.com")) {
    return { label: "Dribbble", iconName: "DribbbleLogo" };
  }
  if (lower.includes("behance.net")) {
    return { label: "Behance", iconName: "BehanceLogo" };
  }
  return { label: "Source Code", iconName: "Code" };
}

export default function ProjectCard(data: FeaturedProject) {
  const statusLower = data.status?.toLowerCase();

  const statusBg =
    statusLower === "completed"
      ? "bg-secondary"
      : statusLower === "in progress" || statusLower === "progress"
        ? "bg-accent"
        : "bg-primary";

  const hasLive = Boolean(data.live_url);
  const hasSource = Boolean(data.source_url);
  const sourceInfo = getSourceUrlInfo(data.source_url);

  return (
    <div className="bg-card flex flex-col gap-1 border-2 p-4 border-border shadow-retro cursor-pointer hover-retro-lift h-fit">
      <div className="flex justify-between items-center">
        <h6 className="text-xs font-semibold font-mono">{data.category}</h6>
        <div className="flex justify-center items-center gap-2.5">
          <div
            className={cn(
              "border-2 border-border p-1 text-xs font-semibold",
              statusBg,
            )}
          >
            {data.status}
          </div>
          {data.is_featured === true && (
            <div className="h-fit w-fit p-0.5 shadow-retro border-2 bg-primary">
              <FolderStarIcon weight="fill" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <h2 className="font-sans text-xl font-bold">{data.title}</h2>
        <h4 className="font-mono text-xs font-medium">{data.subtitle}</h4>
        <p className="font-serif text-sm my-3 font-medium">
          {data.description}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1.5 max-w-3/4">
          {data.tags?.map((techStack) => {
            return (
              <div
                className="bg-accent flex items-center justify-center w-fit p-1 border-2 hover-retro-lift"
                key={techStack.id}
              >
                <DynamicIcon
                  key={techStack.id}
                  name={techStack.icon_name}
                  size={16}
                  className="text-accent-foreground"
                />
              </div>
            );
          })}
        </div>
        <Link
          href={`/projects/${data.slug}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-accent-foreground cursor-pointer p-0 flex items-center gap-1 font-semibold font-serif text-sm",
          )}
        >
          <span>Lihat Selengkapnya</span>
          <CaretRightIcon size={20} weight="bold" />
        </Link>
      </div>

      {(hasLive || hasSource) && (
        <>
          <Separator className={"border text-muted my-2"} />

          <div className="flex items-center gap-2 w-full">
            {/* Live Preview Button */}
            {hasLive && (
              <Link
                href={data.live_url!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex-1 justify-center gap-1.5 font-sans font-bold text-xs border-2 border-border shadow-retro hover-retro-lift",
                )}
              >
                <GlobeIcon size={16} weight="bold" />
                <span>Live Preview</span>
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            )}

            {/* Source URL Button (Primary jika TIDAK ADA live_url, Outline jika ADA live_url) */}
            {hasSource && sourceInfo && (
              <Link
                href={data.source_url!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: hasLive ? "outline" : "default" }),
                  hasLive ? "flex-1" : "w-full",
                  "justify-center gap-1.5 font-sans font-bold text-xs border-2 border-border shadow-retro hover-retro-lift",
                )}
              >
                <DynamicIcon name={sourceInfo.iconName} className="text-accent-foreground" size={16} />
                <span>{sourceInfo.label}</span>
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
