import { DynamicIcon } from "@/lib/dynamic-icon";
import { CoreTechStack } from "../types/home.type";
import { HandFistIcon, LightningIcon } from "@phosphor-icons/react";

export default function TechStackCard(data: CoreTechStack) {
  return (
    <div className="bg-card border-2 border-border shadow-retro p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2.5">
        <div className="flex gap-2 items-center">
          <div className="w-fit flex justify-center h-fit items-center bg-accent border-2 border-border p-1">
            <DynamicIcon
              name={data.icon_name}
              size={20}
              className="text-black"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base">{data.name}</h3>
            <h5 className="text-xs font-mono"> {data.type} </h5>
          </div>
        </div>
        <div className="bg-secondary p-1 border-2 border-border shadow-retro">
          <LightningIcon weight="fill" size={16} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{data.description}</p>
    </div>
  );
}
