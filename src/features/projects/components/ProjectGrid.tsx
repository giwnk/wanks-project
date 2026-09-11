"use client";

import React from "react";
import ProjectCard from "@/features/home/components/ProjectCard";
import { FeaturedProject } from "@/shared/types/project.type";
import { FolderDashedIcon, FolderOpenIcon, WarningIcon } from "@phosphor-icons/react";

interface ProjectGridProps {
  projects?: FeaturedProject[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

import { ProjectGridLoadingState } from "@/components/loading-state-components";

export function ProjectGrid({
  projects = [],
  isLoading = false,
  isError = false,
  errorMessage = "Gagal memuat daftar project.",
}: ProjectGridProps) {
  if (isLoading) {
    return <ProjectGridLoadingState count={4} />;
  }

  if (isError) {
    return (
      <div className="bg-destructive/10 border-2 border-destructive p-8 shadow-retro my-6 text-center flex flex-col items-center gap-3">
        <WarningIcon size={40} className="text-destructive" weight="fill" />
        <h3 className="font-sans font-bold text-lg text-destructive">
          Terjadi Kesalahan
        </h3>
        <p className="font-serif text-sm text-destructive/80 max-w-md">
          {errorMessage}
        </p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-card border-2 border-border p-12 shadow-retro my-6 text-center flex flex-col items-center gap-3">
        <div className="bg-primary/20 border-2 border-border p-3 shadow-retro">
          <FolderDashedIcon size={40} className="text-primary" weight="bold" />
        </div>
        <h3 className="font-sans font-bold text-xl">No projects found</h3>
        <p className="font-serif text-sm text-muted-foreground max-w-md">
          No results match your current search or filters. Try adjusting your
          keywords or clearing the filters.
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
