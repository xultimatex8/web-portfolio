"use client";

import { motion, useReducedMotion } from "motion/react";
import { Technology } from "@/app/[locale]/types/project";
import { stagger } from "../lib/animations";

interface TagFilterProps {
  tags: Technology[];
  selected: Technology[];
  available: Set<Technology>;
  counts: Record<string, number>;
  onToggle: (tag: Technology) => void;
}

export function TagFilter({ tags, selected, available, counts, onToggle }: TagFilterProps) {
  const reduce = useReducedMotion();

  const sortedTags = [...tags].sort(
    (a, b) => (counts[b] ?? 0) - (counts[a] ?? 0) || a.localeCompare(b)
  );

  const item = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : 16 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={stagger(0.04)}
      role="group"
      className="-mx-5 flex w-auto items-center gap-1.5 overflow-x-auto px-5 pb-1 pt-1 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden mask-[linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%-1.25rem),transparent)] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:mask-none"
    >
      {sortedTags.map((tag) => {
        const isActive = selected.includes(tag);
        const isDisabled = !isActive && !available.has(tag);

        return (
          <motion.button
            key={tag}
            variants={item}
            whileHover={reduce || isDisabled ? undefined : { y: -2 }}
            whileTap={reduce || isDisabled ? undefined : { scale: 0.92 }}
            onClick={() => onToggle(tag)}
            aria-pressed={isActive}
            disabled={isDisabled}
            className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
              isDisabled
                ? "cursor-not-allowed border-foreground/10 text-foreground-secondary opacity-35"
                : "cursor-pointer"
            } ${
              isActive
                ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                : isDisabled
                  ? ""
                  : "border-foreground/10 text-foreground-secondary hover:border-foreground/25 hover:text-foreground"
            }`}
          >
            {tag}
            <span className="ml-1.5 tabular-nums opacity-60">{counts[tag] ?? 0}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}