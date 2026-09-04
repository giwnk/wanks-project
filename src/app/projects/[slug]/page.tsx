"use client";

import React, { use } from "react";
import Link from "next/link";
import { ProjectDetailView } from "@/features/projects/components/ProjectDetailView";
import { useGetProjectBySlug } from "@/features/projects/hooks/useGetProjectBySlug";
import { ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = use(params);
  const { data: project, isLoading, isError, error } = useGetProjectBySlug(slug);

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      {isLoading && (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto my-8 animate-pulse">
          <div className="h-10 w-48 bg-muted rounded border-2 border-border"></div>
          <div className="bg-card border-2 border-border p-8 shadow-retro-md flex flex-col gap-4">
            <div className="h-6 w-32 bg-muted rounded border-2 border-border"></div>
            <div className="h-10 w-3/4 bg-muted rounded border-2 border-border"></div>
            <div className="h-20 w-full bg-muted rounded border-2 border-border"></div>
          </div>
        </div>
      )}

      {isError && (
        <div className="max-w-2xl mx-auto my-12 bg-card border-2 border-border p-8 shadow-retro text-center flex flex-col items-center gap-4">
          <div className="p-3 bg-destructive/20 border-2 border-border text-destructive shadow-retro">
            <WarningIcon size={40} weight="fill" />
          </div>
          <h2 className="font-sans text-2xl font-bold">Project Tidak Ditemukan</h2>
          <p className="font-serif text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Maaf, project yang Anda cari tidak ditemukan atau telah dihapus."}
          </p>
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "default" }),
              "gap-2 border-2 border-border shadow-retro hover-retro-lift font-mono text-xs font-bold mt-2"
            )}
          >
            <ArrowLeftIcon size={16} weight="bold" />
            <span>Kembali ke Daftar Project</span>
          </Link>
        </div>
      )}

      {!isLoading && !isError && project && (
        <ProjectDetailView project={project} />
      )}
    </main>
  );
}
