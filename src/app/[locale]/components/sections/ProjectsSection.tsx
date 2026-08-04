"use client";

import { useMemo, useState } from "react";
import { PROJECTS } from "@/[locale]/data/projects";
import { Technology } from "@/[locale]/types/project";
import { TagFilter } from "../TagFilter";
import { ProjectCard } from "../ProjectCard";

export function ProjectsSection() {
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
    <section
      id="projects"
      className="relative w-full py-10 lg:py-20 fhd:py-30 bg-surface flex flex-col lg:flex-row items-start justify-start gap-4 lg:gap-20 px-6 md:px-15"
    >
      <div className="w-full lg:w-47 2xl:w-52 fhd:w-xs flex flex-col items-start gap-4 lg:gap-8 lg:sticky lg:top-30">
        <h1 className="text-3xl md:text-4xl 2xl:text-5xl fhd:text-6xl font-bold tracking-tight text-foreground">
          Projects
        </h1>
        <TagFilter tags={allTags} selected={selectedTags} onToggle={toggleTag} />
      </div>

      <div className="flex-1 flex flex-col gap-10 w-full">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 qhd:grid-cols-4 items-start justify-center gap-8 sm:gap-5 lg:gap-14 xl:gap-10 2xl:gap-15 fhd:gap-13 qhd:gap-15">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-xl 2xl:text-2xl font-semibold text-foreground">
              No projects match these filters
            </p>
            <p className="text-base 2xl:text-lg text-foreground-secondary">
              Try removing some tags to see more results.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}