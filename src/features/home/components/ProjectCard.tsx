"use client";
import { useState } from "react";
import { EmptyImageProject } from "@/components/empty-state-components";
import {
  ArrowUpRightIcon,
  CaretRightIcon,
  FolderStarIcon,
  GlobeIcon,
  ImageIcon,
} from "@phosphor-icons/react";
import { FeaturedProject } from "@/shared/types/project.type";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/lib/DynamicIcon";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getStorageUrl } from "@/lib/storage";

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
  const [imageError, setImageError] = useState(false);

  const statusLower = data.status?.toLowerCase();

  const imageUrl = getStorageUrl(data.thumbnail_url);

  const statusBg =
    statusLower === "completed"
      ? "bg-secondary text-accent-foreground"
      : statusLower === "in progress" || statusLower === "progress"
        ? "bg-accent text-accent-foreground"
        : "bg-muted text-muted-foreground";

  const hasLive = Boolean(data.live_url);
  const hasSource = Boolean(data.source_url);
  const sourceInfo = getSourceUrlInfo(data.source_url);

  return (
    <div className="bg-card flex flex-col gap-3 border-2 p-4 border-border shadow-retro cursor-pointer hover-retro-lift h-full justify-between">
      <div className="flex flex-col gap-3">
        {/* Top Bar: Category & Badges */}
        <div className="flex justify-between items-center gap-2">
          {data.category && (
            <h6 className="text-xs font-semibold font-mono uppercase">
              {data.category}
            </h6>
          )}
          <div className="flex justify-center items-center gap-2 ml-auto">
            {data.status && (
              <div
                className={cn(
                  "border-2 border-border px-2 py-0.5 text-sm font-bold font-serif",
                  statusBg,
                )}
              >
                {data.status}
              </div>
            )}
            {data.is_featured && (
              <div
                className="h-fit w-fit p-1 border-2 bg-primary text-primary-foreground flex items-center gap-1"
                title="Project Unggulan"
              >
                <FolderStarIcon weight="fill" size={16} />
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Image OR Empty State */}
        <div className="border-2 border-border shadow-retro overflow-hidden h-36 sm:h-40 relative group bg-muted/40">
          {data.thumbnail_url && !imageError ? (
            <>
              <Image
                fill
                src={imageUrl}
                alt={data.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </>
          ) : (
            <EmptyImageProject variant="compact" />
          )}
        </div>

        {/* Title, Subtitle, Description */}
        <div className="flex flex-col gap-0.5">
          <h2 className="font-sans text-xl font-bold text-foreground leading-snug">
            {data.title}
          </h2>
          {data.subtitle && (
            <h4 className="font-serif text-base font-semibold text-muted-foreground">
              {data.subtitle}
            </h4>
          )}
          {data.description && (
            <p className="font-serif text-sm my-3 font-medium text-foreground line-clamp-3 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        {/* Tech Stack Tags & Details Link */}
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-wrap gap-1.5 max-w-[70%]">
            {data.tags?.map((techStack) => (
              <div
                className="bg-accent flex items-center justify-center w-fit p-1 border-2 border-border"
                key={techStack.id || techStack.name}
                title={techStack.name}
              >
                <DynamicIcon
                  name={techStack.icon_name}
                  size={16}
                  className="text-accent-foreground"
                />
              </div>
            ))}
          </div>

          <Link
            href={`/projects/${data.slug}`}
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-accent-foreground cursor-pointer p-0 flex items-center gap-1 font-semibold font-serif text-sm ml-auto whitespace-nowrap",
            )}
          >
            <span>Lihat Selengkapnya</span>
            <CaretRightIcon size={18} weight="bold" />
          </Link>
        </div>

        {/* Live Preview & Source Buttons */}
        {(hasLive || hasSource) && (
          <>
            <Separator className="border text-muted my-1" />

            <div className="flex items-center gap-2 w-full">
              {hasLive && (
                <Link
                  href={data.live_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "flex-1 justify-center gap-1.5 font-sans font-bold text-sm border-2 border-border shadow-retro hover-retro-lift py-4",
                  )}
                >
                  <GlobeIcon size={16} weight="fill" />
                  <span>Live Preview</span>
                  <ArrowUpRightIcon size={14} weight="bold" />
                </Link>
              )}

              {hasSource && sourceInfo && (
                <Link
                  href={data.source_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({
                      variant: hasLive ? "outline" : "default",
                    }),
                    hasLive ? "flex-1" : "w-full",
                    "justify-center gap-1.5 font-sans font-bold text-sm border-2 border-border shadow-retro hover-retro-lift py-4",
                  )}
                >
                  <DynamicIcon
                    name={sourceInfo.iconName}
                    className="text-accent-foreground"
                    size={16}
                  />
                  <span>{sourceInfo.label}</span>
                  <ArrowUpRightIcon size={14} weight="bold" />
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
