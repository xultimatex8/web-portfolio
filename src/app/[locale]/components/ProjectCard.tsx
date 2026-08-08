import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Project } from "@/app/[locale]/types/project";
import { Badge } from "./Badge";
import {
  STATUS_STYLES,
  CATEGORY_STYLES,
} from "@/app/[locale]/helpers/projectStyles";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("ProjectData");
  const tCommon = useTranslations("Projects");

  const [isLoading, setIsLoading] = useState(false);

  const title = t(`${project.id}.title`);
  const description = t(`${project.id}.description`);

  const status = STATUS_STYLES[project.status];
  const category = CATEGORY_STYLES[project.category];
  

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-card/30 hover:shadow-xl">
      <Link
        href={`/projects/${project.id}`}
        title={title}
        onNavigate={() => setIsLoading(true)}
        aria-disabled={isLoading}
        className="block overflow-hidden"
      >
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover ${isLoading ? "opacity-70" : "opacity-100"}`}
          />

          {isLoading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <LoaderCircle
                aria-hidden="true"
                className="h-6 w-6 animate-spin"
              />
            </div>
          )}

          <div className={`absolute bottom-0 left-0 flex items-center z-20 ${isLoading ? "opacity-70" : "opacity-100"}`}>
            <span className={`px-2.5 py-1.5 text-[0.65rem] font-medium shadow-sm ${status.backgroundColor}`}>
              {status.label}
            </span>

            <span className={`rounded-tr-lg px-2.5 py-1.5 text-[0.65rem] font-medium shadow-sm ${category.backgroundColor}`}>
              {category.label}
            </span>
          </div>
        </div>
      </Link>

      <div className={`flex flex-1 flex-col p-4 ${isLoading ? "opacity-70" : "opacity-100"}`}>
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/projects/${project.id}`}
            className={`min-w-0 text-sm font-semibold tracking-tight text-foreground hover:text-accent lg:text-base ${isLoading ? "cursor-default" : "cursor-pointer"}`}
          >
            {title}
          </Link>

          <div className="flex shrink-0 items-center gap-1.5">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tCommon("viewCode")}
                title={tCommon("viewCode")}
                className="relative top-0.5 text-foreground-secondary hover:text-foreground"
              >
                <i
                  aria-hidden="true"
                  className="devicon-github-original text-[15px]"
                />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tCommon("viewDemo")}
                title={tCommon("viewDemo")}
                className="text-foreground-secondary hover:text-foreground"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <p className="mt-1.5 text-xs leading-relaxed text-foreground-secondary lg:text-sm">
          {description}
        </p>

        <div className="mt-auto pt-4 flex flex-wrap items-center gap-1">
          {project.technologies.map((technology) => (
            <Badge
              key={technology}
              label={technology}
              backgroundColor="bg-accent-secondary text-foreground"
              textSize="text-[0.6rem]"
            />
          ))}
        </div>
      </div>
    </article>
  );
}
