"use client";

import { Separator } from "@/components/ui/separator";
import { useGetExperience } from "../hooks/useGetExperience";
import ExperienceCard from "./ExperienceCard";
import { SuitcaseIcon } from "@phosphor-icons/react";
import SubHeader from "@/components/SubHeader";

export default function ExperienceSection() {
  const { data, isLoading, error } = useGetExperience();

  // Filter pengalamaan kerja (bukan education)
  const workExperienceData = data?.filter(
    (exp) => exp.type?.toLowerCase() !== "education"
  );

  if (isLoading) {
    return (
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <SuitcaseIcon weight="fill" className="text-secondary size-5" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans">
            Pengalaman Kerja
          </h2>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-card border-2 border-border shadow-retro p-5 h-32 animate-pulse"
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
          <SuitcaseIcon weight="fill" className="text-secondary size-5" />
          <h2 className="text-xl sm:text-2xl font-bold font-sans">
            Pengalaman Kerja
          </h2>
        </div>
        <Separator />
        <div className="bg-card border-2 border-border p-4 shadow-retro text-destructive font-mono text-xs font-bold">
          Gagal memuat pengalaman: {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <SubHeader title="Pengalaman Kerja" iconName="BriefcaseIcon"/>

      <Separator />

      <div className="flex flex-col gap-4">
        {workExperienceData && workExperienceData.length > 0 ? (
          workExperienceData.map((experience) => (
            <ExperienceCard key={experience.id} {...experience} />
          ))
        ) : (
          <div className="bg-card border-2 border-border p-5 shadow-retro font-mono text-xs text-muted-foreground text-center">
            Belum ada data pengalaman kerja.
          </div>
        )}
      </div>
    </section>
  );
}
