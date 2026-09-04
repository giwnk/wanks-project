"use client";

import React from "react";
import ProjectCard from "@/features/home/components/ProjectCard";
import { FeaturedProject } from "@/shared/types/project.type";
import { FolderOpenIcon, WarningIcon } from "@phosphor-icons/react";

interface ProjectGridProps {
  projects?: FeaturedProject[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export function ProjectGrid({
  projects = [],
  isLoading = false,
  isError = false,
  errorMessage = "Gagal memuat daftar project.",
}: ProjectGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border-2 border-border p-5 shadow-retro animate-pulse flex flex-col gap-4 h-64"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-muted rounded border-2 border-border"></div>
              <div className="h-5 w-16 bg-muted rounded border-2 border-border"></div>
            </div>
            <div className="h-6 w-3/4 bg-muted rounded border-2 border-border"></div>
            <div className="h-4 w-1/2 bg-muted rounded border-2 border-border"></div>
            <div className="h-16 w-full bg-muted rounded border-2 border-border mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-destructive/10 border-2 border-destructive p-8 shadow-retro my-6 text-center flex flex-col items-center gap-3">
        <WarningIcon size={40} className="text-destructive" weight="fill" />
        <h3 className="font-sans font-bold text-lg text-destructive">Terjadi Kesalahan</h3>
        <p className="font-serif text-sm text-destructive/80 max-w-md">{errorMessage}</p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-card border-2 border-border p-12 shadow-retro my-6 text-center flex flex-col items-center gap-3">
        <div className="bg-primary/20 border-2 border-border p-3 shadow-retro">
          <FolderOpenIcon size={40} className="text-primary" weight="bold" />
        </div>
        <h3 className="font-sans font-bold text-xl">Project Tidak Ditemukan</h3>
        <p className="font-serif text-sm text-muted-foreground max-w-md">
          Tidak ada project yang cocok dengan pencarian atau filter yang dipilih. Coba ubah kata kunci atau reset filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
