import { DynamicIcon } from "@/lib/DynamicIcon";
import { CoreTechStack } from "../types/about-me.type";
import { StarIcon } from "@phosphor-icons/react";

export default function TechStackCard(data: CoreTechStack) {
  return (
    <div className="bg-card hover-retro-lift border-2 border-border shadow-retro p-4 flex flex-col gap-2 relative">
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
            <h3 className="font-bold text-sm">{data.name}</h3>
            <h5 className="text-xs font-mono"> {data.type} </h5>
          </div>
        </div>

        {data.is_core && (
          <div className="flex items-center gap-1 bg-primary text-primary-foreground border-2 border-border p-1.5 text-[10px] font-mono font-bold uppercase shadow-retro">
            <StarIcon weight="fill" size={12} />
          </div>
        )}
      </div>
      <p className="font-medium text-sm text-accent-foreground">
        {data.description}
      </p>
    </div>
  );
}
