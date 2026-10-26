"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, revealUp } from "../lib/animations";

interface SectionTitleProps {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionTitle({ children, as: Heading = "h2", className = "" }: SectionTitleProps) {
  const reduce = useReducedMotion();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.span
        variants={{
          hidden: { scaleY: reduce ? 1 : 0 },
          visible: { scaleY: 1, transition: { duration: 0.5, ease: EASE } },
        }}
        className="h-4 w-1 origin-bottom rounded-sm bg-accent-primary"
      />

      <Heading className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        <span className="-mb-1 block overflow-hidden pb-1">
          <motion.span variants={revealUp(reduce)} className="block">
            {children}
          </motion.span>
        </span>
      </Heading>
    </div>
  );
}