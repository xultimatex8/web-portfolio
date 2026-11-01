"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, ExternalLink, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ExperienceEntry } from "@/app/[locale]/data/experience";
import { Badge } from "./Badge";

interface ExperienceCardProps {
  entry: ExperienceEntry;
  index: number;
}

export function ExperienceCard({ entry, index }: ExperienceCardProps) {
  const t = useTranslations("Experience");
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const role = t(`items.${entry.id}.role`);
  const description = t(`items.${entry.id}.description`);
  const highlightsKey = `items.${entry.id}.highlights`;
  const highlights = t.has(highlightsKey) ? (t.raw(highlightsKey) as string[]) : [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, x: reduce ? 0 : -36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      className="relative pl-8"
    >
      {/* Punto sobre la línea */}
      <motion.span
        aria-hidden="true"
        initial={{ scale: reduce ? 1 : 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.15 }}
        className="absolute left-0 top-7 h-4 w-4 rounded-full border-2 border-accent-primary bg-background"
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group/card relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-card p-5 shadow-lg transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-accent-primary/40 hover:shadow-xl sm:p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{
            background:
              "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent-primary) 13%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg xl:text-xl">
              {role}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              {entry.companyUrl ? (
                <a
                  href={entry.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-accent-primary hover:underline"
                >
                  {entry.company}
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="font-medium text-accent-primary">{entry.company}</span>
              )}

              {entry.location && (
                <span className="inline-flex items-center gap-1 text-foreground-secondary">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {entry.location}
                </span>
              )}
            </div>
          </div>

          <span className="w-fit shrink-0 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 font-mono text-xs text-accent-primary">
            {entry.period}
          </span>
        </div>

        <p className="relative text-xs leading-relaxed text-foreground-secondary md:text-sm xl:text-base">
          {description}
        </p>

        {highlights.length > 0 && (
          <ul className="relative flex flex-col gap-2">
            {highlights.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: reduce ? 0 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.45 }}
                className="flex items-start gap-2.5 text-xs text-foreground md:text-sm"
              >
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" />
                {item}
              </motion.li>
            ))}
          </ul>
        )}

        {entry.technologies && entry.technologies.length > 0 && (
          <div className="relative flex flex-wrap items-center gap-1.5 pt-1">
            {entry.technologies.map((tech) => (
              <Badge key={tech} label={tech} textSize="text-[0.6rem]" />
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-primary transition-all duration-500 group-hover/card:w-full" />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 right-4 select-none text-8xl font-bold leading-none text-foreground/5"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
}