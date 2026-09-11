"use client";

import { useGetProfile } from "../hooks/useGetProfile";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/lib/DynamicIcon";
import { MapPinIcon, PulseIcon, TerminalIcon } from "@phosphor-icons/react";
import { getStorageUrl } from "@/lib/storage";
import { DescriptionSectionLoadingState } from "@/components/loading-state-components";

function getSocialIconName(label: string) {
  const l = label.toLowerCase();
  if (l.includes("github")) return "siGithub";
  if (l.includes("linkedin")) return "LinkedinLogoIcon";
  if (l.includes("instagram")) return "siInstagram";
  if (l.includes("twitter") || l.includes("x")) return "siX";
  return "LinkSimple";
}

export default function DescriptionSection() {
  const { data, isLoading, error } = useGetProfile();
  const socialLinks = data?.social_links;

  const imageUrl = getStorageUrl(data?.resume_url)

  const normalizedSocialLinks = Array.isArray(socialLinks)
    ? socialLinks
    : socialLinks?.url
      ? [socialLinks]
      : [
          { label: "GitHub", url: "https://github.com/giwnk" },
          {
            label: "LinkedIn",
            url: "https://linkedin.com/in/ananda-giwank-abhinaya",
          },
        ];

  if (isLoading) {
    return <DescriptionSectionLoadingState />;
  }

  if (error) {
    return (
      <section className="bg-card border-2 border-border p-6 shadow-retro-md text-destructive font-mono text-xs font-bold">
        Error loading profile: {error.message}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Card 1 (Kiri): Kartu Utama Deskripsi & Bio */}
      <div className="lg:col-span-7 xl:col-span-8 bg-card border-2 border-border p-5 sm:p-7 shadow-retro-md flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg md:text-2xl font-bold text-primary font-sans">
            {data?.tagline}
          </h3>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase text-foreground tracking-tight">
            {data?.full_name}
          </h2>
        </div>

        <Separator />

        {/* Bio / About Me Paragraphs */}
        <div className="font-serif font-semibold text-sm md:text-base text-accent-foreground leading-relaxed">
          <p>{data?.about_me}</p>
        </div>

        {/* Action Row: Download CV & Social Links */}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-3">
          {data?.resume_url && (
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                className="h-10 px-4 shadow-retro border-2 border-border hover-retro-lift hover:bg-accent gap-2 cursor-pointer font-sans font-bold text-xs uppercase"
              >
                <DynamicIcon
                  name="DownloadSimple"
                  size={16}
                  className="text-foreground"
                />
                <span>Download CV</span>
              </Button>
            </a>
          )}

          <div className="flex items-center gap-2.5">
            {normalizedSocialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 p-0 shadow-retro border-2 border-border cursor-pointer hover-retro-lift hover:bg-accent flex items-center justify-center bg-card text-foreground"
                  title={link.label}
                >
                  <DynamicIcon
                    name={getSocialIconName(link.label)}
                    size={18}
                    className="text-foreground"
                  />
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2 (Kanan): Kartu Terpisah Quick Info Panel */}
      <div className="lg:col-span-5 xl:col-span-4 bg-card border-2 border-border p-5 sm:p-6 shadow-retro-md flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-3.5">
          {/* Lokasi */}
          <div className="bg-background border-2 border-border p-3.5 shadow-retro flex items-center gap-3">
            <div className="bg-primary/20 border-2 border-border p-2 shrink-0">
              <MapPinIcon weight="fill" size={20} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase text-muted-foreground font-semibold">
                Lokasi
              </p>
              <p className="font-serif text-sm font-bold text-foreground truncate">
                {data?.location || "Indonesia"}
              </p>
            </div>
          </div>

          {/* Fokus Utama */}
          <div className="bg-background border-2 border-border p-3.5 shadow-retro flex items-center gap-3">
            <div className="bg-accent border-2 border-border p-2 shrink-0">
              <TerminalIcon
                weight="fill"
                name="TerminalWindow"
                size={20}
                className="text-foreground"
              />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase text-muted-foreground font-semibold">
                Fokus Utama
              </p>
              <p className="font-serif text-sm font-bold text-foreground truncate">
                Frontend & Web Dev
              </p>
            </div>
          </div>

          {/* Status Kerja */}
          <div className="bg-background border-2 border-border p-3.5 shadow-retro flex items-center gap-3">
            <div className="bg-secondary/20 border-2 border-border p-2 shrink-0">
              <PulseIcon weight="fill" size={20} className="text-secondary" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase text-muted-foreground font-semibold">
                Status
              </p>
              <p className="font-serif text-sm font-bold text-foreground truncate">
                {data?.status_message || "Available for Work"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
