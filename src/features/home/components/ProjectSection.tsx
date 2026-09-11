"use client";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRightIcon, FolderStarIcon } from "@phosphor-icons/react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useGetProjects } from "../hooks/useGetProjects";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";
import SubHeader from "@/components/SubHeader";

import { ProjectSectionLoadingState } from "@/components/loading-state-components";

export default function ProjectSection() {
  const { data, isLoading, error } = useGetProjects();

  if (isLoading) {
    return <ProjectSectionLoadingState />;
  }

  if (error) {
    return (
      <div className="my-4 mx-4 sm:mx-10 lg:mx-20 p-4 font-mono text-xs text-destructive font-bold">
        Error loading project: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5 justify-center items-center">
            <FolderStarIcon
              weight="fill"
              className="text-secondary"
              size={20}
            />
            <h2 className="text-2xl text-accent-foreground font-semibold">
              Featured Projects
            </h2>
          </div>
        </div>
        <Separator />
        <div className="p-4 font-mono text-xs text-muted-foreground border border-dashed border-border">
          Belum ada data project (is_featured = true) di database.
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <SubHeader
          iconName="FolderStarIcon"
          title="Featured Projects"
        ></SubHeader>

        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-accent-foreground cursor-pointer text-sm flex items-center gap-1",
          )}
        >
          <span>Lihat Semua Project</span>
          <ArrowUpRightIcon />
        </Link>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {data?.map((project) => {
          return <ProjectCard key={project.id} {...project} />;
        })}
      </div>
    </section>
  );
}
