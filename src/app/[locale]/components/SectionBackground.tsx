import type { CSSProperties } from "react";

type SectionBackgroundProps = {
  gridSize?: number;
  gridOpacity?: number;
  glow?: boolean;
  bottomFade?: boolean;
  className?: string;
};

export function SectionBackground({
  gridSize = 48,
  gridOpacity = 0.045,
  glow = true,
  bottomFade = true,
  className = "",
}: SectionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
    >
      {glow && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_35%,color-mix(in_srgb,var(--accent-primary)_10%,transparent)_0%,transparent_55%)]" />
      )}

      <div
        className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_10%,transparent_75%)]"
        style={
          {
            opacity: gridOpacity,
            backgroundImage: `
              linear-gradient(currentColor 1px, transparent 1px),
              linear-gradient(90deg, currentColor 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          } as CSSProperties
        }
      />

      {bottomFade && (
        <div className="absolute inset-x-0 bottom-0 h-4 bg-linear-to-t from-background to-transparent" />
      )}
    </div>
  );
}
