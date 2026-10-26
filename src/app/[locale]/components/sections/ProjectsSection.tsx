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

export function ProjectsSection() {
  const t = useTranslations("Projects");
  const shouldReduceMotion = useReducedMotion();

  const container = staggerContainer(shouldReduceMotion);
  const fadeUpVariant = fadeUp(shouldReduceMotion);

  const [selectedTags, setSelectedTags] = useState<Technology[]>([]);

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

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return PROJECTS;
    return PROJECTS.filter((p) =>
      selectedTags.every((tag) => p.technologies.includes(tag))
    );
  }, [selectedTags]);

  const available = useMemo(
    () => new Set<Technology>(filteredProjects.flatMap((p) => p.technologies)),
    [filteredProjects]
  );

  const isFiltering = selectedTags.length > 0;

  const toggleTag = (tag: Technology) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

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

          <div
            aria-live="polite"
            className="flex min-h-5 items-center justify-between gap-4 text-xs text-foreground-secondary"
          >
            <span>
              {isFiltering
                ? t("results", { count: filteredProjects.length, total: PROJECTS.length })
                : t("total", { total: PROJECTS.length })}
            </span>

            {isFiltering && (
              <button
                onClick={clearTags}
                className="cursor-pointer font-medium text-accent-primary underline-offset-4 hover:underline"
              >
                {t("clear")}
              </button>
            )}
          </div>
        </motion.div>

        {filteredProjects.length > 0 ? (
          <motion.div
            variants={fadeUpVariant}
            className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 sm:gap-y-10">
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
                    <ProjectCard project={project} />
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
                onClick={clearTags}
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