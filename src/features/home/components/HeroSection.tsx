"use client";

import {
  CircleIcon,
  DownloadSimpleIcon,
  FoldersIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  LinkSimpleIcon,
  MapPinIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useGetProfile } from "../hooks/useGetProfile";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getStorageUrl } from "@/lib/storage";
import HeroLoadingState from "@/components/empty-state-components/HeroLoadingState";

export default function HeroSection() {
  const { data, error, isLoading } = useGetProfile();

  const avatarUrl = getStorageUrl(data?.avatar_url)

  if (isLoading) {
    return <HeroLoadingState />;
  }

  if (error) {
    return (
      <section className="bg-card border-2 border-border my-4 sm:my-8 mx-4 sm:mx-10 lg:mx-20 h-fit p-4 sm:p-6 shadow-retro-md text-destructive font-mono text-xs font-bold">
        Error: {error.message}
      </section>
    );
  }

  const socialLinks = data?.social_links;

  return (
    <section className="bg-card flex flex-col gap-4 border-2 border-border my-4 sm:my-8 mx-4 sm:mx-10 lg:mx-20 h-fit p-5 sm:p-8 lg:p-10 shadow-retro-md">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-3.5">
          <div className="bg-background shadow-retro border-2 border-border w-fit flex gap-1.5 items-center px-2.5 py-1">
            <CircleIcon weight="fill" className="text-secondary" />
            <h4 className="font-mono uppercase font-semibold text-accent-foreground text-xs">
              {data?.status_message || "OPEN FOR FREELANCE & FULL-TIME ROLES"}
            </h4>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl uppercase font-bold max-w-full lg:max-w-3/4">
            {data?.full_name}
          </h1>

          <h2 className="text-lg sm:text-xl font-bold text-primary">
            {data?.tagline}
          </h2>

          <p className="w-full my-3 sm:my-5 font-medium text-accent-foreground">
            {data?.about_me}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link href="/projects">
              <Button className="h-auto px-4 py-2.5 shadow-retro border-2 border-border cursor-pointer hover-retro-lift gap-2">
                <FoldersIcon weight="regular" className="size-5" />
                <span className="font-sans font-semibold uppercase">
                  Lihat Proyek
                </span>
              </Button>
            </Link>

            {data?.resume_url && (
              <a
                href={data.resume_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  className="h-auto px-4 hover:bg-accent py-2.5 shadow-retro border-2 border-border cursor-pointer hover-retro-lift gap-2"
                >
                  <DownloadSimpleIcon weight="regular" className="size-5" />
                  <span className="font-sans font-semibold uppercase">
                    Download CV
                  </span>
                </Button>
              </a>
            )}
          </div>

          <Separator className="my-1 border-b-2 border-border/75 max-w-full" />

          {/* Social Links Buttons & Location */}
          <div className="w-full flex flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2.5">
              {Array.isArray(socialLinks) ? (
                socialLinks.map((link, idx) => {
                  const label = link.label?.toLowerCase() || "";
                  let Icon = LinkSimpleIcon;
                  if (label.includes("github")) Icon = GithubLogoIcon;
                  if (label.includes("linkedin")) Icon = LinkedinLogoIcon;
                  if (label.includes("instagram")) Icon = InstagramLogoIcon;

                  return (
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
                        <Icon className="size-5" />
                      </Button>
                    </a>
                  );
                })
              ) : socialLinks?.url ? (
                <a
                  href={socialLinks.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 p-0 shadow-retro border-2 border-border cursor-pointer hover-retro-lift hover:bg-accent flex items-center justify-center bg-card text-foreground"
                    title={socialLinks.label || "Social Link"}
                  >
                    <GithubLogoIcon className="size-5" />
                  </Button>
                </a>
              ) : (
                <>
                  <a
                    href="https://github.com/giwnk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 p-0 shadow-retro border-2 border-border cursor-pointer hover-retro-lift hover:bg-accent flex items-center justify-center bg-card text-foreground"
                      title="GitHub"
                    >
                      <GithubLogoIcon className="size-5" />
                    </Button>
                  </a>
                  <a
                    href="https://linkedin.com/in/ananda-giwank-abhinaya"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 p-0 shadow-retro border-2 border-border cursor-pointer hover-retro-lift hover:bg-accent flex items-center justify-center bg-card text-foreground"
                      title="LinkedIn"
                    >
                      <LinkedinLogoIcon className="size-5" />
                    </Button>
                  </a>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <MapPinIcon
                weight="fill"
                className="text-primary size-5 sm:size-6"
              />
              <h5 className="font-mono font-semibold text-accent-foreground text-xs">
                {data?.location}
              </h5>
            </div>
          </div>
        </div>

        {/* Avatar Box */}
        <div className="lg:col-span-2 border-2 border-border w-fit shadow-retro p-3 sm:p-4 bg-background self-center justify-self-center mx-auto flex justify-center items-center">
          <div className="relative size-52 sm:size-60 rounded-none border-2 border-border bg-accent/20 p-2 shadow-retro-md">
            <div className="relative size-full bg-card border-2 border-border overflow-hidden">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Giwank Profile Avatar"
                  fill
                  sizes="(max-width: 640px) 208px, 240px"
                  className="object-cover object-center"
                  priority
                />
              ) : (
                <div className="size-full flex items-center justify-center bg-muted">
                  <UserIcon size={48} className="text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-2.5 border-b-2 border-border/75 max-w-full" />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="border-2 flex flex-col justify-center hover-retro-lift cursor-pointer bg-background p-3 items-center border-border shadow-retro">
          <h2 className="text-primary font-sans font-bold text-xl sm:text-2xl">
            2+
          </h2>
          <h3 className="font-mono uppercase text-xs lg:text-sm font-semibold text-center">
            Years Experience
          </h3>
        </div>
        <div className="border-2 flex flex-col justify-center bg-background hover-retro-lift cursor-pointer p-3 items-center border-border shadow-retro">
          <h2 className="text-primary font-sans font-bold text-xl sm:text-2xl">
            9+
          </h2>
          <h3 className="font-mono uppercase text-xs lg:text-sm font-semibold text-center">
            Projects Completed
          </h3>
        </div>
        <div className="border-2 flex flex-col justify-center bg-background hover-retro-lift p-3 cursor-pointer items-center border-border shadow-retro">
          <h2 className="text-primary font-sans font-bold text-xl sm:text-2xl">
            100%
          </h2>
          <h3 className="font-mono uppercase text-xs lg:text-sm font-semibold text-center">
            VISUAL HOLIC
          </h3>
        </div>
        <div className="border-2 flex flex-col justify-center bg-background hover-retro-lift p-3 cursor-pointer items-center border-border shadow-retro">
          <h2 className="text-primary font-sans font-bold text-xl sm:text-2xl">
            99+
          </h2>
          <h3 className="font-mono uppercase text-xs lg:text-sm font-semibold text-center">
            Coffee Fuel
          </h3>
        </div>
      </div>
    </section>
  );
}
