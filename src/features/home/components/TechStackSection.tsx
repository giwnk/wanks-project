"use client";
import { Separator } from "@/components/ui/separator";
import { useGetTechStack } from "../hooks/useGetTechStack";
import TechStackCard from "./TechStackCard";
import { ArrowUpRightIcon, LightningIcon } from "@phosphor-icons/react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import { NAVBAR_ITEMS } from "@/shared/constants/navbar.constant";
import { cn } from "@/lib/utils";

export default function TechStackSection() {
  const { data, isLoading, error } = useGetTechStack();

  if (isLoading) {
    return (
      <div className="my-4 mx-4 sm:mx-10 lg:mx-20 p-4 font-mono text-xs">
        Loading tech stack...
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-4 mx-4 sm:mx-10 lg:mx-20 p-4 font-mono text-xs text-destructive">
        Error loading tech stack
      </div>
    );
  }

  return (
    <section className="my-6 sm:my-8 mx-4 sm:mx-10 lg:mx-20 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <SubHeader iconName="LightningIcon" title="Core Tech Stack"></SubHeader>

        <Link
          href="/about-me"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-accent-foreground cursor-pointer text-sm flex items-center gap-1",
          )}
        >
          <span>Lihat Semua Tech Stack</span>
          <ArrowUpRightIcon />
        </Link>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.map((techStack) => {
          return <TechStackCard key={techStack.id} {...techStack} />;
        })}
      </div>
    </section>
  );
}
