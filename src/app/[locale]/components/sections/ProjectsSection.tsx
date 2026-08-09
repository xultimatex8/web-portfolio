"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { PROJECTS } from "@/app/[locale]/data/projects";
import { Technology } from "@/app/[locale]/types/project";
import { TagFilter } from "../TagFilter";
import { ProjectCard } from "../ProjectCard";
import { motion, useReducedMotion } from "motion/react";
import { SectionBackground } from "../SectionBackground";

export function ProjectsSection() {
  const t = useTranslations("Projects");
  const shouldReduceMotion = useReducedMotion();

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

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.8, 1, 0.6, 1] as const,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      id="projects"
      className="relative isolate w-full py-10 lg:py-16 bg-surface flex flex-col gap-6 px-5 md:px-15"
    >
      <SectionBackground />
      
      <motion.div variants={fadeUp} className="flex items-center gap-2">
        <span className="w-1 h-4 rounded-sm bg-accent-primary" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
      </motion.div>

        <motion.div variants={fadeUp}>
          <TagFilter tags={allTags} selected={selectedTags} onToggle={toggleTag} />
        </motion.div>

      {filteredProjects.length > 0 ? (
        <motion.div 
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </motion.div>
      ) : (
        <motion.div 
          variants={fadeUp}
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