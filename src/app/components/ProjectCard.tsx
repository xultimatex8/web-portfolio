import Image from "next/image";
import Link from "next/link";
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
    <div className="relative w-163 h-170 p-5 rounded-2xl bg-card text-foreground flex flex-col items-start justify-start gap-4">
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
          className="w-full h-80 rounded-2xl object-cover"
        />
      </Link>

      <div className="flex flex-col items-start justify-center gap-2 text-start">
        <h2 className="text-3xl font-bold tracking-tight">{project.title}</h2>
        <p className="text-xl text-foreground-secondary">{project.description}</p>
      </div>

      <div className="mt-auto flex flex-col items-start justify-start gap-2">
        <div className="flex items-center justify-start gap-2">
          <Badge label={status.label} backgroundColor={status.backgroundColor} />
          <Badge label={category.label} backgroundColor={category.backgroundColor} />
        </div>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              label={tech}
              backgroundColor="bg-accent-secondary text-foreground"
            />
          ))}
        </div>
      </div>
    </div>
  );
}