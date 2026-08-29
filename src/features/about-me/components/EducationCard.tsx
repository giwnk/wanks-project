"use client";

import { GraduationCapIcon, CalendarBlankIcon } from "@phosphor-icons/react";
import { Experience } from "../types/about-me.type";

export default function EducationCard(data: Experience) {
  return (
    <div className="bg-card border-2 border-border p-5 shadow-retro hover-retro-lift flex flex-col gap-3 transition-all">
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div className="flex items-start gap-3">
          <div className="bg-accent border-2 border-border p-2 shrink-0 shadow-retro mt-0.5">
            <GraduationCapIcon weight="fill" className="size-5 text-foreground" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans text-lg font-bold text-foreground leading-tight">
              {data.role}
            </h3>
            <span className="font-serif text-base font-semibold text-primary">
              {data.company}
            </span>
          </div>
        </div>

        <div className="bg-background border-2 border-border px-2.5 py-1 font-mono text-xs font-semibold text-muted-foreground flex items-center gap-1.5 shadow-retro">
          <CalendarBlankIcon weight="bold" className="size-3.5 text-primary" />
          <span>
            {data.start_date} - {data.end_date || "Present"}
          </span>
        </div>
      </div>

      {data.description && (
        <p className="font-serif font-medium text-sm text-accent-foreground leading-relaxed whitespace-pre-line pl-1">
          {data.description}
        </p>
      )}
    </div>
  );
}
