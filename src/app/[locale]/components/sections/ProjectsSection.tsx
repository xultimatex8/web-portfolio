"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

import { PROJECTS } from "@/app/[locale]/data/projects";
import { Technology } from "@/app/[locale]/types/project";
import { TagFilter } from "../TagFilter";
import { ProjectCard } from "../ProjectCard";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { SectionBackground } from "../SectionBackground";

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

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return PROJECTS;
    return PROJECTS.filter((p) =>
      selectedTags.every((tag) => p.technologies.includes(tag))
    );
  }, [selectedTags]);

  const toggleTag = (tag: Technology) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <motion.section
      id="projects"
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative isolate flex w-full flex-col gap-6 bg-surface px-5 py-10 md:px-15 lg:py-16"
    >
      <SectionBackground />
      <motion.div variants={fadeUpVariant} className="flex items-center gap-2">
        <span className="w-1 h-4 rounded-sm bg-accent-primary" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
      </motion.div>

        <motion.div variants={fadeUpVariant}>
          <TagFilter tags={allTags} selected={selectedTags} onToggle={toggleTag} />
        </motion.div>

      {filteredProjects.length > 0 ? (
        <motion.div 
          variants={fadeUpVariant}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
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
        </motion.div>
      )}
    </motion.section>
  );
}
