"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { PROJECTS } from "@/app/[locale]/data/projects";
import { Technology } from "@/app/[locale]/types/project";
import { TagFilter } from "../TagFilter";
import { ProjectCard } from "../ProjectCard";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { SectionBackground } from "../SectionBackground";
import { SectionTitle } from "../SectionTitle";

interface FilterToggleProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

/** Filtro tipo "solo los que tienen X", con el mismo estilo que los tags. */
function FilterToggle({ label, count, active, onClick }: FilterToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
          : "border-foreground/10 text-foreground-secondary hover:border-foreground/25 hover:text-foreground"
      }`}
    >
      {label}
      <span className="ml-1.5 tabular-nums opacity-60">{count}</span>
    </button>
  );
}

export function ProjectsSection() {
  const t = useTranslations("Projects");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  const [selectedTags, setSelectedTags] = useState<Technology[]>([]);
  const [onlyDemo, setOnlyDemo] = useState(false);
  const [onlyCode, setOnlyCode] = useState(false);

  const allTags = useMemo(
    () => [...new Set(PROJECTS.flatMap((p) => p.technologies))],
    []
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    PROJECTS.forEach((p) =>
      p.technologies.forEach((tech) => {
        result[tech] = (result[tech] ?? 0) + 1;
      })
    );
    return result;
  }, []);

  const demoCount = useMemo(() => PROJECTS.filter((p) => p.demoUrl).length, []);
  const codeCount = useMemo(() => PROJECTS.filter((p) => p.repoUrl).length, []);

  const filteredProjects = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          selectedTags.every((tag) => p.technologies.includes(tag)) &&
          (!onlyDemo || Boolean(p.demoUrl)) &&
          (!onlyCode || Boolean(p.repoUrl))
      ),
    [selectedTags, onlyDemo, onlyCode]
  );

  const available = useMemo(
    () => new Set<Technology>(filteredProjects.flatMap((p) => p.technologies)),
    [filteredProjects]
  );

  const isFiltering = selectedTags.length > 0 || onlyDemo || onlyCode;

  const toggleTag = (tag: Technology) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => {
    setSelectedTags([]);
    setOnlyDemo(false);
    setOnlyCode(false);
  };

  return (
    <motion.section
      id="projects"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative isolate flex w-full flex-col sm:items-center gap-6 bg-surface px-5 py-10 md:px-15 sm:pb-16 md:pb-17 lg:pt-16 lg:pb-21 scroll-mt-6"
    >
      <SectionBackground />

      <div className="relative w-full sm:w-[85vw] qhd:w-[75vw] flex flex-col gap-6 sm:gap-8">
        <SectionTitle as="h1">{t("title")}</SectionTitle>

        <motion.div variants={fadeUpVariant} className="flex flex-col gap-3">
          <TagFilter
            tags={allTags}
            selected={selectedTags}
            available={available}
            counts={counts}
            onToggle={toggleTag}
          />

          <div className="flex min-h-6 flex-wrap items-center gap-2 text-xs text-foreground-secondary">
            <FilterToggle
              label={t("filters.demo")}
              count={demoCount}
              active={onlyDemo}
              onClick={() => setOnlyDemo((v) => !v)}
            />
            <FilterToggle
              label={t("filters.code")}
              count={codeCount}
              active={onlyCode}
              onClick={() => setOnlyCode((v) => !v)}
            />

            <span aria-live="polite" className="ml-2">
              {isFiltering
                ? t("results", { count: filteredProjects.length, total: PROJECTS.length })
                : t("total", { total: PROJECTS.length })}
            </span>

            {isFiltering && (
              <button
                onClick={clearAll}
                className="ml-auto cursor-pointer font-medium text-accent-primary underline-offset-4 hover:underline"
              >
                {t("clear")}
              </button>
            )}
          </div>
        </motion.div>

        {filteredProjects.length > 0 ? (
          <motion.div
            variants={fadeUpVariant}
            className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout={!shouldReduceMotion}
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 50,
                      scale: shouldReduceMotion ? 1 : 0.94,
                    }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 18,
                      delay: (index % 3) * 0.09,
                    }}
                    className="h-full"
                  >
                    <ProjectCard project={project} highlighted={selectedTags} />
                  </motion.div>
                ))}
              </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUpVariant}
            className="w-full flex flex-col items-center justify-center gap-2 text-center py-12">
              <p className="text-lg font-semibold text-foreground">
                {t("empty.title")}
              </p>
              <p className="text-sm text-foreground-secondary">
                {t("empty.description")}
              </p>
              <button
                onClick={clearAll}
                className="mt-3 cursor-pointer rounded-full border border-accent-primary/40 px-4 py-1.5 text-sm font-medium text-accent-primary transition-colors hover:bg-accent-primary/10"
              >
                {t("clear")}
              </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}