"use client";
import { Separator } from "@/components/ui/separator";
import { useGetTechStack } from "../hooks/useGetTechStack";
import TechStackCard from "./TechStackCard";
import { ArrowUpRightIcon, LightningIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <div className="flex gap-1.5 justify-center items-center">
          <div className="">
            <LightningIcon weight="fill" className="text-secondary" size={20} />
          </div>
          <h2 className="text-2xl text-accent-foreground font-semibold">Core Tech Stack</h2>
        </div>

        <Button variant={"link"} className={"text-accent-foreground cursor-pointer text-sm"}>
            <Link href="#" />
            Lihat Semua Tech Stack
            <ArrowUpRightIcon/>
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((techStack) => {
          return <TechStackCard key={techStack.id} {...techStack} />;
        })}
      </div>
    </section>
  );
}
