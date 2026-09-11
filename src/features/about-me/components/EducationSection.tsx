"use client";

import { Separator } from "@/components/ui/separator";
import EducationCard from "./EducationCard";
import { StudentIcon } from "@phosphor-icons/react";
import { useGetExperience } from "../hooks/useGetExperience";
import SubHeader from "@/components/SubHeader";

import { EducationSectionLoadingState } from "@/components/empty-state-components";

export default function EducationSection() {
  const { data, isLoading, error } = useGetExperience();

  const educationData = data?.filter(
    (exp) => exp.type?.toLowerCase() === "education"
  );

  if (isLoading) {
    return <EducationSectionLoadingState count={2} />;
  }

  if (error) {
    return (
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <StudentIcon weight="fill" className="text-secondary size-5" />
          <h2 className="text-2xl font-semibold font-sans">
            Pendidikan
          </h2>
        </div>
        <Separator />
        <div className="bg-card border-2 border-border p-4 shadow-retro text-destructive font-mono text-xs font-bold">
          Gagal memuat data pendidikan: {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <SubHeader title="Pendidikan" iconName="StudentIcon"/>

      <Separator />

      <div className="flex flex-col gap-4">
        {educationData && educationData.length > 0 ? (
          educationData.map((edu) => (
            <EducationCard key={edu.id} {...edu} />
          ))
        ) : (
          <div className="bg-card border-2 border-border p-5 shadow-retro font-mono text-xs text-muted-foreground text-center">
            Belum ada data pendidikan.
          </div>
        )}
      </div>
    </section>
  );
}
