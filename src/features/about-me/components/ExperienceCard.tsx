"use client";

import { CalendarBlankIcon, BriefcaseIcon, BuildingOfficeIcon } from "@phosphor-icons/react";
import { Experience } from "../types/about-me.type";

export default function ExperienceCard(data: Experience) {
  return (
    <div className="bg-card border-2 border-border p-5 shadow-retro hover-retro-lift flex flex-col gap-3 relative">
      {/* Header Info */}
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-sans text-lg font-extrabold text-foreground leading-tight">
            {data.role}
          </h3>
          <span className="font-serif text-base font-semibold text-primary flex items-center gap-1.5">
            <BuildingOfficeIcon weight="bold" className="size-3.5" />
            {data.company}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {data.type && (
            <span className="bg-accent border-2 border-border px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase shadow-retro">
              {data.type}
            </span>
          )}
          <div className="bg-background border-2 border-border px-2.5 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5 shadow-retro">
            <CalendarBlankIcon weight="bold" className="size-3.5 text-primary" />
            <span>
              {data.start_date} - {data.end_date || "Present"}
            </span>
          </div>
        </div>
      </div>

      {/* Experience Description */}
      {data.description && (
        <p className="font-serif text-sm font-medium text-accent-foreground leading-relaxed whitespace-pre-line">
          {data.description}
        </p>
      )}
    </div>
  );
}
