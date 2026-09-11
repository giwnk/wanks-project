import { DynamicIcon } from "@/lib/DynamicIcon";

export interface HeaderProp {
  title: string;
  iconName: string;
}

export default function SubHeader(dataProps: HeaderProp) {
  return (
    <div className="flex items-center gap-1.5">
      <DynamicIcon
        name={dataProps.iconName}
        weight="fill"
        className="text-secondary size-5"
      />
      <h2 className="text-lg md:text-xl lg:text-2xl text-accent-foreground font-semibold font-sans">
        {dataProps.title}
      </h2>
    </div>
  );
}
