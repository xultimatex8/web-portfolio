"use client";

import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { TimelineItem } from "./TimelineItem";
import { staggerContainer } from "../lib/motion";
import { EASE } from "../lib/animations";

export interface TimelineItemData {
  period: string;
  title: string;
  subtitle: string;
  icon?: LucideIcon;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export function Timeline({ items }: TimelineProps) {
  const shouldReduceMotion = useReducedMotion();
  const container = staggerContainer(shouldReduceMotion);

  const drawX = {
    hidden: { scaleX: shouldReduceMotion ? 1 : 0 },
    visible: { scaleX: 1, transition: { duration: 1.6, ease: EASE } },
  };
  const drawY = {
    hidden: { scaleY: shouldReduceMotion ? 1 : 0 },
    visible: { scaleY: 1, transition: { duration: 1.6, ease: EASE } },
  };

  return (
    <div className="relative w-full">
      <motion.div
        variants={drawX}
        className="absolute left-0 right-0 top-2 hidden h-px origin-left bg-linear-to-r from-accent-primary/70 to-foreground/10 lg:block"
      />
      <motion.div
        variants={drawY}
        className="absolute bottom-0 left-2 top-0 w-px origin-top bg-linear-to-b from-accent-primary/70 to-foreground/10 lg:hidden"
      />

      <motion.div
        variants={container}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10"
      >
        {items.map((item, index) => (
          <TimelineItem
            key={item.title}
            item={item}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </motion.div>
    </div>
  );
}