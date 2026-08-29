"use client";
import { DynamicIcon } from "@/lib/dynamic-icon";
import { Separator } from "./ui/separator";

export interface HeaderType {
  title: string;
  subtitle: string;
  iconName: string;
}

export default function Header(dataHeader: HeaderType) {
  return (
    <header className="gap-2 flex flex-col">
      <div className="flex items-center gap-3">
        <div className="w-fit h-fit flex justify-center items-center p-1 shadow-retro border-border border-2 bg-primary">
          <DynamicIcon
            weight="fill"
            size={32}
            name={dataHeader.iconName}
            className="text-primary-foreground"
          />
        </div>
        <h1 className="font-bold uppercase text-3xl">{dataHeader.title}</h1>
      </div>
      <h3 className="text-base font-serif text-accent-foreground">
        {dataHeader.subtitle}
      </h3>
      <Separator />
    </header>
  );
}
