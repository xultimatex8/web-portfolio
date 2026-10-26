"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import type { TimelineItemData } from "./Timeline";
import { fadeUp } from "../lib/motion";
import { EASE } from "../lib/animations";

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  isLast?: boolean;
}

export function TimelineItem({ item, index, isLast = false }: TimelineItemProps) {
  const reduce = useReducedMotion();
  const variants = fadeUp(reduce);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const dot = {
    hidden: { scale: reduce ? 1 : 0 },
    visible: {
      scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 14, delay: 0.15 },
    },
  };

  const connector = {
    hidden: { scaleY: reduce ? 1 : 0 },
    visible: { scaleY: 1, transition: { duration: 0.5, delay: 0.35, ease: EASE } },
  };

  const iconPop = {
    hidden: { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4, rotate: reduce ? 0 : -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 220, damping: 14, delay: 0.45 },
    },
  };

  const pill = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : 14 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.5 } },
  };

  return (
    <motion.article
      variants={variants}
      className="relative flex flex-col pl-8 lg:pl-0 lg:pt-10"
    >
      <span className="absolute left-0 top-6 h-4 w-4 lg:top-0">
        {isLast && !reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-accent-primary/50"
            animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.span
          variants={dot}
          className="relative block h-4 w-4 rounded-full border-2 border-accent-primary bg-background"
        />
      </span>

      <motion.span
        aria-hidden="true"
        variants={connector}
        className="absolute left-1.75 top-4 hidden h-6 w-0.5 origin-top rounded-full bg-accent-primary/50 lg:block"
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group/card relative flex h-full flex-1 flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-card p-5 shadow-lg transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-accent-primary/40 hover:shadow-xl sm:p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent-primary) 13%, transparent), transparent 70%)",
          }}
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-5 right-4 select-none text-8xl font-bold leading-none text-foreground/5 sm:text-9xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative flex items-start justify-between gap-3">
          {Icon ? (
            <motion.div variants={iconPop}>
              <div className="rounded-xl border border-white/10 bg-white/3 p-3 text-accent-primary transition-transform duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </div>
            </motion.div>
          ) : (
            <span />
          )}

          <motion.span
            variants={pill}
            className="rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 font-mono text-xs text-accent-primary"
          >
            {item.period}
          </motion.span>
        </div>

        <div className="relative flex flex-col gap-1.5">
          <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg xl:text-xl">
            {item.title}
          </h3>

          <p className="text-xs leading-relaxed text-foreground-secondary md:text-sm xl:text-base">
            {item.subtitle}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-primary transition-all duration-500 group-hover/card:w-full" />
      </div>
    </motion.article>
  );
}