import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/data/projects";

export function ProjectsSection() {
  const openProject = (project: Project) => {
    console.log(project.title);
  };

  return (
    <section
      id="projects"
      className="relative w-full py-30 bg-surface flex items-start justify-start gap-40 px-15"
    >
      <h1 className="text-7xl font-bold tracking-tight text-foreground sticky top-30">
        Projects
      </h1>

      <div className="flex-1 flex flex-col gap-10">
        <div className="grid grid-cols-3 items-start justify-center gap-10">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openProject} />
          ))}
        </div>
      </div>
    </section>
  );
}