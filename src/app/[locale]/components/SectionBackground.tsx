"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

type SectionBackgroundProps = {
  gridSize?: number;
  gridOpacity?: number;
  glow?: boolean;
  bottomFade?: boolean;
  fadeColor?: string;
  className?: string;
};

export function SectionBackground({
  gridSize = 48,
  gridOpacity = 0.045,
  glow = true,
  bottomFade = true,
  fadeColor = "var(--background)",
  className = "",
}: SectionBackgroundProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {glow && (
        <>
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_35%,color-mix(in_srgb,var(--accent-primary)_10%,transparent)_0%,transparent_55%)]"
            animate={reduce ? undefined : { x: [0, 60, -30, 0], y: [0, -30, 25, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_75%,color-mix(in_srgb,var(--accent-secondary)_9%,transparent)_0%,transparent_45%)]"
            animate={reduce ? undefined : { x: [0, -50, 30, 0], y: [0, 30, -20, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div
        className="absolute inset-0 overflow-hidden mask-[radial-gradient(ellipse_at_center,black_10%,transparent_75%)]"
        style={{ opacity: gridOpacity }}
      >
        <motion.div
          className="absolute"
          style={
            {
              inset: -gridSize,
              backgroundImage: `
                linear-gradient(currentColor 1px, transparent 1px),
                linear-gradient(90deg, currentColor 1px, transparent 1px)
              `,
              backgroundSize: `${gridSize}px ${gridSize}px`,
            } as CSSProperties
          }
          animate={reduce ? undefined : { x: [0, gridSize], y: [0, gridSize] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {bottomFade && (
        <div
          className="absolute inset-x-0 bottom-0 h-4"
          style={{ background: `linear-gradient(to top, ${fadeColor}, transparent)` }}
        />
      )}
    </div>
  );
}