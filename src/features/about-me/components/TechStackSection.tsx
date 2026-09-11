"use client";

import { Separator } from "@/components/ui/separator";
import { useGetTechStack } from "../hooks/useGetTechStack";
import TechStackCard from "./TechStackCard";
import { CpuIcon } from "@phosphor-icons/react";
import SubHeader from "@/components/SubHeader";

export default function TechStackSection() {
  const { data, isLoading, error } = useGetTechStack();

  const sortedTechStack = data
    ? [...data].sort((a, b) => Number(b.is_core) - Number(a.is_core))
    : [];

  if (isLoading) {
    return (
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CpuIcon weight="fill" className="text-secondary size-5" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans">
            Tech Stack & Tools
          </h2>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-card border-2 border-border shadow-retro p-4 h-24 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CpuIcon weight="fill" className="text-secondary size-5" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans">
            Tech Stack & Tools
          </h2>
        </div>
        <Separator />
        <div className="bg-card border-2 border-border p-4 shadow-retro text-destructive font-mono text-xs font-bold">
          Gagal memuat tech stack: {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <SubHeader title="Tech Stack" iconName="StackIcon"/>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedTechStack.map((techStack) => (
          <TechStackCard key={techStack.id} {...techStack} />
        ))}
      </div>
    </section>
  );
}
