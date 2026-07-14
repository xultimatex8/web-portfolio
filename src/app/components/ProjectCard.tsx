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
    <div className="relative w-full sm:w-74 md:w-81 lg:w-83 xl:w-md 2xl:w-96 fhd:w-114 qhd:w-124 h-auto sm:h-115 xl:h-128 2xl:h-132 fhd:h-137 p-3 lg:p-2.5 xl:p-3 fhd:p-5 rounded-2xl bg-card text-foreground flex flex-col items-start justify-start gap-4">
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
          className="w-full h-44 lg:h-50 xl:h-60 2xl:h-56 fhd:h-60 rounded-2xl object-cover"
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
              <i className="devicon-github-original text-xl 2xl:text-2xl" />
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
              <ExternalLink className="relative bottom-0.75 w-5 2xl:w-6.5 h-5 2xl:h-6.5" />
            </a>
          )}
        </div>

        <h2 className="text-lg lg:text-xl xl:text-2xl fhd:text-3xl font-bold tracking-tight pr-16">{project.title}</h2>
        <p className="text-sm xl:text-base text-foreground-secondary">{project.description}</p>
      </div>

      <div className="mt-auto flex flex-col items-start justify-start gap-2">
        <div className="flex items-center justify-start gap-2">
          <Badge label={status.label} backgroundColor={status.backgroundColor} textSize="text-[0.575rem] md:text-[0.585rem] lg:text-[0.620rem] xl:text-[0.650rem] 2xl:text-xs" />
          <Badge label={category.label} backgroundColor={category.backgroundColor} textSize="text-[0.575rem] md:text-[0.585rem] lg:text-[0.620rem] xl:text-[0.650rem] 2xl:text-xs" />
        </div>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              label={tech}
              backgroundColor="bg-accent-secondary text-foreground"
              textSize="text-[0.575rem] md:text-[0.585rem] lg:text-[0.620rem] xl:text-[0.650rem] 2xl:text-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
}