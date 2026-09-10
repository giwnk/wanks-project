import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse bg-muted/70 border-2 border-border/60", className)}
      {...props}
    />
  );
}

export { Skeleton };
