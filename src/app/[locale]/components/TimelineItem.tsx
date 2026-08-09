"use client";

import { motion, useReducedMotion } from "motion/react";

import type { TimelineItemData } from "./Timeline";
import { fadeUp } from "../lib/motion";

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = fadeUp(shouldReduceMotion);

  return (
    <motion.article
      variants={variants}
      className="relative pl-8 lg:pl-0 lg:pt-8"
    >
      <span className="absolute left-0 top-0 h-4 w-4 rounded-full border-2 border-accent-primary bg-background lg:top-0" />

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs tracking-[0.2em] text-foreground-secondary">
          {item.period}
        </span>

        <div className="flex items-start gap-4">
          <span className="hidden text-5xl font-light leading-none text-foreground/20 sm:block">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex flex-col gap-1">
            <h3 className="text-base sm:text-lg xl:text-xl font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>

            <p className="text-xs md:text-sm leading-relaxed text-foreground-secondary xl:text-base">
              {item.subtitle}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}