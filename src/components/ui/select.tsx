"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

function Select({ ...props }: SelectPrimitive.Root.Props<any>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-10 w-full sm:w-auto min-w-[150px] items-center justify-between gap-2 border-2 border-border bg-background px-3 py-2 text-xs font-bold font-mono shadow-retro hover-retro-lift cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:cursor-not-allowed disabled:opacity-50 select-none data-[state=open]:bg-primary data-[state=open]:text-primary-foreground data-[state=open]:shadow-retro-md",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon data-slot="select-icon">
        <CaretDownIcon size={14} weight="bold" className="shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("line-clamp-1 font-mono text-xs font-bold capitalize", className)}
      {...props}
    />
  );
}

function SelectPortal({ ...props }: SelectPrimitive.Portal.Props) {
  return <SelectPrimitive.Portal data-slot="select-portal" {...props} />;
}

function SelectPositioner({ className, ...props }: SelectPrimitive.Positioner.Props) {
  return (
    <SelectPrimitive.Positioner
      data-slot="select-positioner"
      sideOffset={4}
      className={cn("z-50 min-w-[150px] outline-none", className)}
      {...props}
    />
  );
}

function SelectContent({
  className,
  children,
  ...props
}: SelectPrimitive.Popup.Props) {
  return (
    <SelectPortal>
      <SelectPositioner>
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative max-h-60 w-full overflow-auto border-2 border-border bg-card p-1 shadow-retro-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPositioner>
    </SelectPortal>
  );
}

function SelectItem({
  className,
  children,
  value,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      value={value}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between border-2 border-transparent px-3 py-2 text-xs font-bold font-mono text-foreground outline-none transition-colors hover:border-border hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[selected]:border-border data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="font-mono text-xs font-bold capitalize">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ml-2 flex items-center justify-center">
        <CheckIcon size={14} weight="bold" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};
