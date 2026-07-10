import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import { Badge } from "./Badge";
import { STATUS_STYLES, CATEGORY_STYLES } from "@/helpers/projectStyles";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = STATUS_STYLES[project.status];
  const category = CATEGORY_STYLES[project.category];

  return (
    <div className="relative w-83 xl:w-117 qhd:w-127 h-115 xl:h-132 p-2.5 xl:p-5 rounded-2xl bg-card text-foreground flex flex-col items-start justify-start gap-4">
      <Link
        href={`/projects/${project.id}`}
        className="w-full cursor-pointer rounded-2xl border-6 border-surface block"
        title={project.title}
      >
        <Image
          src={project.image}
          alt={project.title}
          width={660}
          height={350}
          className="w-full h-50 xl:h-60 rounded-2xl object-cover"
        />
      </Link>

      <div className="relative w-full flex flex-col items-start justify-center gap-2 text-start">
        <div className="absolute top-0 right-0 flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View code"
              className="text-foreground-secondary hover:text-foreground transition-colors"
            >
              <i className="devicon-github-original text-xl xl:text-2xl" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View demo"
              className="text-foreground-secondary hover:text-foreground transition-colors"
            >
              <ExternalLink className="relative bottom-0.75 w-5 xl:w-6.5 h-5 xl:h-6.5" />
            </a>
          )}
        </div>

        <h2 className="text-xl xl:text-3xl font-bold tracking-tight pr-16">{project.title}</h2>
        <p className="text-sm xl:text-base text-foreground-secondary">{project.description}</p>
      </div>

      <div className="mt-auto flex flex-col items-start justify-start gap-2">
        <div className="flex items-center justify-start gap-2">
          <Badge label={status.label} backgroundColor={status.backgroundColor} textSize="text-[0.575rem] xl:text-xs" />
          <Badge label={category.label} backgroundColor={category.backgroundColor} textSize="text-[0.575rem] xl:text-xs" />
        </div>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              label={tech}
              backgroundColor="bg-accent-secondary text-foreground"
              textSize="text-[0.575rem] xl:text-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
}