"use client";
import { Separator } from "@/components/ui/separator";
import { useGetTechStack } from "../hooks/useGetTechStack";
import TechStackCard from "./TechStackCard";
import { ArrowUpRightIcon, LightningIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import { NAVBAR_ITEMS } from "@/shared/constants/navbar.constant";

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

        <Button variant={"link"} className={"text-accent-foreground cursor-pointer text-xs md:text-sm"}>
            <Link href={"/about-me"}  />
            Lihat Semua Tech Stack
            <ArrowUpRightIcon size={5}/>
        </Button>
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
