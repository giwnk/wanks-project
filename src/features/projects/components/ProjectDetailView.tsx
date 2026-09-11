"use client";

import React from "react";
import Link from "next/link";
import { EmptyImageProject } from "@/components/empty-state-components";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  FolderStarIcon,
  GlobeIcon,
  LightbulbIcon,
  GearSixIcon,
  ArticleIcon,
  TagIcon,
  UserIcon,
  ClockIcon,
  ImageIcon,
  QuestionIcon,
  HandHeartIcon,
} from "@phosphor-icons/react";
import { FeaturedProject } from "@/shared/types/project.type";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/lib/DynamicIcon";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import Image from "next/image";
import SubHeader from "@/components/SubHeader";

import { getStorageUrl } from "@/lib/storage";

interface ProjectDetailViewProps {
  project: FeaturedProject;
}

function getSourceUrlInfo(url?: string | null) {
  if (!url) return null;
  const lower = url.toLowerCase();

  if (lower.includes("github.com")) {
    return { label: "GitHub Repository", iconName: "siGithub" };
  }
  if (lower.includes("figma.com")) {
    return { label: "Figma Design", iconName: "siFigma" };
  }
  return { label: "Source Code", iconName: "Code" };
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [imageError, setImageError] = useState(false);

  const thumbnailUrl = getStorageUrl(project.thumbnail_url);

  const statusLower = project.status?.toLowerCase();
  const statusBg =
    statusLower === "completed"
      ? "bg-secondary text-accent-foreground"
      : statusLower === "in progress" || statusLower === "progress"
        ? "bg-accent text-accent-foreground"
        : "bg-muted text-muted-foreground";

  const hasLive = Boolean(project.live_url);
  const hasSource = Boolean(project.source_url);
  const sourceInfo = getSourceUrlInfo(project.source_url);

  // Additional DB fields (if present in row)
  const clientName = project.client || project.client_name;
  const roleName = project.role || project.my_role;
  const duration = project.duration || project.timeline;
  const rawGallery = project.gallery_urls || project.gallery;
  const gallery = Array.isArray(rawGallery) ? rawGallery : [];

  const hasMetadataBar = Boolean(clientName || roleName || duration);

  // Parse content defensively (handles string, JSON string, or object)
  const rawProjectContent = project.content;
  let parsedContent: Record<string, unknown> | null = null;
  let rawContentString: string | null = null;

  if (typeof rawProjectContent === "string") {
    try {
      parsedContent = JSON.parse(rawProjectContent) as Record<string, unknown>;
    } catch {
      rawContentString = rawProjectContent;
    }
  } else if (
    typeof rawProjectContent === "object" &&
    rawProjectContent !== null
  ) {
    parsedContent = rawProjectContent as Record<string, unknown>;
  }

  const getStringVal = (val: unknown): string | undefined =>
    typeof val === "string" ? val : undefined;

  // Extract known content fields with multi-language / multi-format fallback
  const permasalahan =
    getStringVal(parsedContent?.permasalahan) ||
    getStringVal(parsedContent?.problem) ||
    getStringVal(parsedContent?.masalah);

  const perencanaan =
    getStringVal(parsedContent?.perencanaan) ||
    getStringVal(parsedContent?.planning) ||
    getStringVal(parsedContent?.solusi) ||
    getStringVal(parsedContent?.solution);

  const proses =
    getStringVal(parsedContent?.proses) ||
    getStringVal(parsedContent?.process) ||
    getStringVal(parsedContent?.pengerjaan);

  const hasil =
    getStringVal(parsedContent?.hasil) ||
    getStringVal(parsedContent?.result) ||
    getStringVal(parsedContent?.outcome) ||
    getStringVal(parsedContent?.impact);

  const hasStructuredSections = Boolean(
    permasalahan || perencanaan || proses || hasil,
  );

  // Fallback entries for any other key-value pairs if not structured
  const extraEntries =
    parsedContent && !hasStructuredSections
      ? Object.entries(parsedContent).filter(
          (entry): entry is [string, string] =>
            typeof entry[1] === "string" && entry[1].trim().length > 0,
        )
      : [];

  const hasAnyContent =
    hasStructuredSections ||
    Boolean(rawContentString?.trim()) ||
    extraEntries.length > 0;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto my-8">
      {/* 1. Back Navigation Button */}
      <div>
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "gap-2 border-2 border-border shadow-retro hover-retro-lift font-serif text-sm font-bold",
          )}
        >
          <ArrowLeftIcon size={16} weight="bold" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* 2. Main Header Card */}
      <div className="bg-card border-2 border-border p-6 sm:p-8 shadow-retro-md flex flex-col gap-3.5">
        {/* Category & Status Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {project.category && (
            <h6 className="text-sm font-semibold font-mono uppercase">
              {project.category}
            </h6>
          )}

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "border-2 border-border px-3 py-1 text-sm font-bold font-serif",
                statusBg,
              )}
            >
              {project.status}
            </span>
            {project.is_featured && (
              <div
                className="h-fit w-fit p-1 border-2 bg-primary text-primary-foreground flex items-center gap-1"
                title="Project Unggulan"
              >
                <FolderStarIcon weight="fill" size={16} />
              </div>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-foreground">
            {project.title}
          </h1>
          {project.subtitle && (
            <h4 className="font-serif text-xl font-semibold text-muted-foreground">
              {project.subtitle}
            </h4>
          )}
        </div>

        {/* Overview Description */}
        {project.description && (
          <p className="font-serif text-base leading-relaxed font-medium text-foreground bg-background p-4 border-2 border-border shadow-retro">
            {project.description}
          </p>
        )}

        {/* Technical Metadata Bar (Client, Role, Duration) */}
        {hasMetadataBar && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-muted/40 p-4 border-2 border-border">
            {clientName && (
              <div className="flex items-center gap-2 font-mono text-xs">
                <UserIcon
                  size={16}
                  className="text-primary shrink-0"
                  weight="bold"
                />
                <span className="text-muted-foreground font-semibold">
                  Klien:
                </span>
                <span className="font-bold">{clientName}</span>
              </div>
            )}

            {roleName && (
              <div className="flex items-center gap-2 font-mono text-xs">
                <TagIcon
                  size={16}
                  className="text-primary shrink-0"
                  weight="bold"
                />
                <span className="text-muted-foreground font-semibold">
                  Peran:
                </span>
                <span className="font-bold">{roleName}</span>
              </div>
            )}

            {duration && (
              <div className="flex items-center gap-2 font-mono text-xs">
                <ClockIcon
                  size={16}
                  className="text-primary shrink-0"
                  weight="bold"
                />
                <span className="text-muted-foreground font-semibold">
                  Durasi:
                </span>
                <span className="font-bold">{duration}</span>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tech) => (
                <div
                  key={tech.id || tech.name}
                  className="bg-accent border-2 border-border px-3 py-1.5 flex items-center gap-2 "
                >
                  <DynamicIcon
                    name={tech.icon_name}
                    size={18}
                    className="text-accent-foreground"
                  />
                  <span className="font-serif text-sm font-bold">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External Links */}
        {(hasLive || hasSource) && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {hasLive && (
              <Link
                href={project.live_url!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex-1 justify-center gap-2 font-sans font-bold text-sm border-2 border-border shadow-retro hover-retro-lift py-4",
                )}
              >
                <GlobeIcon size={18} weight="bold" />
                <span>Live Preview</span>
                <ArrowUpRightIcon size={16} weight="bold" />
              </Link>
            )}

            {hasSource && sourceInfo && (
              <Link
                href={project.source_url!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: hasLive ? "outline" : "default" }),
                  hasLive ? "flex-1" : "w-full",
                  "justify-center gap-2 font-sans font-bold text-sm border-2 border-border shadow-retro hover-retro-lift py-4",
                )}
              >
                <DynamicIcon
                  className="text-accent-foreground"
                  name={sourceInfo.iconName}
                  size={18}
                />
                <span>{sourceInfo.label}</span>
                <ArrowUpRightIcon size={16} weight="bold" />
              </Link>
            )}
          </div>
        )}
      </div>

      {/* 3. Main Thumbnail Banner */}
      <div className="bg-card border-2 border-border p-3 sm:p-4 shadow-retro-md flex flex-col gap-2">
        {project.thumbnail_url && !imageError ? (
          <div className="relative w-full overflow-hidden border-2 border-border bg-muted/20 flex items-center justify-center p-2">
            <Image
              src={thumbnailUrl}
              alt={project.title}
              width={1200}
              height={800}
              onError={() => setImageError(true)}
              className="w-full h-auto max-h-[650px] object-contain rounded-none"
              priority
            />
          </div>
        ) : (
          <EmptyImageProject variant="detail" />
        )}
      </div>

      {/* 4. Image Gallery (if present) */}
      {gallery.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-sans text-xl font-bold border-b-2 border-border pb-1 w-fit">
            Project Galery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gallery.map((imgUrl: string, idx: number) => {
              const fullGalleryUrl = getStorageUrl(imgUrl);
              return (
                <div
                  key={idx}
                  className="border-2 border-border p-2 shadow-retro flex items-center justify-center bg-muted/20"
                >
                  <Image
                    src={fullGalleryUrl}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-80 object-contain border-2 border-border"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Detailed Case Study & Content Sections */}
      {hasAnyContent && (
        <div className="flex flex-col gap-6">
          <SubHeader iconName="ListChecksIcon" title="Planning Detail" />

          {/* 1. Permasalahan (Chart 4) */}
          {permasalahan && (
            <div className="bg-chart-4/20 border-2 border-border p-6 shadow-retro flex flex-col gap-3">
              <div className="flex items-center gap-2 text-chart-4 font-sans font-bold text-lg">
                <QuestionIcon size={24} weight="bold" />
                <h3>1. Problem</h3>
              </div>
              <Separator className="border-border" />
              <p className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium text-foreground">
                {permasalahan}
              </p>
            </div>
          )}

          {/* 2. Perencanaan (Chart 1) */}
          {perencanaan && (
            <div className="bg-chart-1/20 border-2 border-border p-6 shadow-retro flex flex-col gap-3">
              <div className="flex items-center gap-2 text-chart-1 font-sans font-bold text-lg">
                <LightbulbIcon size={24} weight="bold" />
                <h3>2. Planning</h3>
              </div>
              <Separator className="border-border" />
              <p className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium text-foreground">
                {perencanaan}
              </p>
            </div>
          )}

          {/* 3. Pengerjaan / Proses (Chart 3) */}
          {proses && (
            <div className="bg-chart-3/20 border-2 border-border p-6 shadow-retro flex flex-col gap-3">
              <div className="flex items-center gap-2 text-chart-3 font-sans font-bold text-lg">
                <GearSixIcon size={24} weight="bold" />
                <h3>3. Development</h3>
              </div>
              <Separator className="border-border" />
              <p className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium text-foreground">
                {proses}
              </p>
            </div>
          )}

          {/* 4. Solusi / Hasil (Chart 2) */}
          {hasil && (
            <div className="bg-chart-2/20 border-2 border-border p-6 shadow-retro flex flex-col gap-3">
              <div className="flex items-center gap-2 text-chart-2 font-sans font-bold text-lg">
                <HandHeartIcon size={24} weight="bold" />
                <h3>4. Solution & Result</h3>
              </div>
              <Separator className="border-border" />
              <p className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium text-foreground">
                {hasil}
              </p>
            </div>
          )}

          {/* Raw string content */}
          {rawContentString && !hasStructuredSections && (
            <div className="bg-card border-2 border-border p-6 shadow-retro flex flex-col gap-3">
              <div className="flex items-center gap-2 font-sans font-bold text-lg">
                <ArticleIcon size={24} weight="bold" className="text-primary" />
                <h3>Deskripsi Detail Projek</h3>
              </div>
              <Separator className="border-border" />
              <p className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                {rawContentString}
              </p>
            </div>
          )}

          {/* Generic key-value content object */}
          {extraEntries.length > 0 && (
            <div className="flex flex-col gap-4">
              {extraEntries.map(([key, val]) => (
                <div
                  key={key}
                  className="bg-card border-2 border-border p-6 shadow-retro flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2 font-sans font-bold text-lg capitalize">
                    <ArticleIcon
                      size={24}
                      weight="bold"
                      className="text-primary"
                    />
                    <h3>{key.replace(/_/g, " ")}</h3>
                  </div>
                  <Separator className="border-border" />
                  <p className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                    {String(val)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
