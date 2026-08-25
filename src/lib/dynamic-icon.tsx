import * as PhosphorIcons from "@phosphor-icons/react";
import * as SimpleIcons from "simple-icons";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
  useBrandColor?: boolean;
}

export function DynamicIcon({
  name,
  className = "text-primary",
  size = 24,
  useBrandColor = false,
}: DynamicIconProps) {
  if (!name) {
    return <PhosphorIcons.Code size={size} className={className} />;
  }

  // 1. Cek Phosphor Icons
  const PossiblePhosphorIcon =
    PhosphorIcons[name as keyof typeof PhosphorIcons];

  if (PossiblePhosphorIcon) {
    const PhosphorIcon = PossiblePhosphorIcon as React.ComponentType<{
      size?: number;
      className?: string;
    }>;
    return <PhosphorIcon size={size} className={className} />;
  }

  // 2. Cek Simple Icons
  const simpleKey = name.startsWith("si")
    ? name
    : `si${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  const simpleIconsRecord = SimpleIcons as unknown as Record<
    string,
    { path: string; hex: string; title: string }
  >;

  const simpleIcon =
    simpleIconsRecord[simpleKey] || simpleIconsRecord[name];

  if (simpleIcon && simpleIcon.path) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={`fill-current shrink-0 ${className}`}
        style={useBrandColor ? { color: `#${simpleIcon.hex}` } : undefined}
      >
        <title>{simpleIcon.title}</title>
        <path d={simpleIcon.path} />
      </svg>
    );
  }

  // Fallback default icon
  return <PhosphorIcons.Code size={size} className={className} />;
}
