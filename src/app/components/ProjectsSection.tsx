"use client";

import { useMemo, useState } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { TagFilter } from "./TagFilter";
import { PROJECTS } from "@/data/projects";

export function ProjectsSection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const openProject = (project: Project) => {
    console.log("Opening project:", project.title);
  };

  return (
    <section
      id="projects"
      className="relative w-full py-30 bg-surface flex items-start justify-start gap-40 px-15"
    >
      <div className="w-xs flex flex-col items-start gap-8 sticky top-30">
        <h1 className="text-7xl font-bold tracking-tight text-foreground">
          Projects
        </h1>
        <TagFilter tags={allTags} selected={selectedTags} onToggle={toggleTag} />
      </div>

      <div className="flex-1 flex flex-col gap-10">
        <div className="grid grid-cols-3 items-start justify-center gap-10">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openProject} />
          ))}
        </div>
      </div>
    </section>
  );
}